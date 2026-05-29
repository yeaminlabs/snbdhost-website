const { GoogleGenerativeAI } = require('@google/generative-ai');
const dbHelper = require('./db');

async function getGeminiConfig() {
  const apiKeySetting = await dbHelper.get("SELECT value FROM kb_settings WHERE key = 'gemini_api_key'");
  const modelSetting = await dbHelper.get("SELECT value FROM kb_settings WHERE key = 'gemini_model'");
  const promptSetting = await dbHelper.get("SELECT value FROM kb_settings WHERE key = 'system_prompt'");

  const apiKey = apiKeySetting ? apiKeySetting.value : process.env.GEMINI_API_KEY;
  const modelName = modelSetting ? modelSetting.value : 'gemini-1.5-flash';
  const customPrompt = promptSetting ? promptSetting.value : '';

  return { apiKey, modelName, customPrompt };
}

async function generateArticlesFromSources(sourceIds) {
  const { apiKey, modelName, customPrompt } = await getGeminiConfig();

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add it in settings.');
  }

  // Load selected sources from DB
  const placeholders = sourceIds.map(() => '?').join(',');
  const sources = await dbHelper.all(
    `SELECT * FROM kb_sources WHERE id IN (${placeholders})`,
    sourceIds
  );

  if (sources.length === 0) {
    throw new Error('No valid sources selected.');
  }

  // Build prompt context
  let contextText = '';
  for (const source of sources) {
    contextText += `=== SOURCE: ${source.name} (Type: ${source.type}) ===\n`;
    contextText += `${source.content}\n\n`;
  }

  const defaultSystemPrompt = `You are an expert technical support engineer and problem solver for SNBD HOST, a premium web hosting, VPS, and cloud services provider in Bangladesh.
Your task is to write comprehensive, high-quality, and practical step-by-step Knowledge Base tutorials and guides (FAQs, how-tos, and troubleshooting workflows) based on the provided SOURCE context.

Guidelines:
1. Act as a technical problem solver. Write practical tutorials on how customers can perform key operations (e.g. cPanel mail management, MySQL database creation, File Manager uploads, DNS zone edits, nameserver pointing, SSH connections, billing payments, and workflow automation).
2. Leverage the product details in the SOURCE context to customize your tutorials for SNBD HOST services (e.g., mention that shared hosting includes cPanel, LSCache, and Let's Encrypt SSL; mention that local payments include bKash/Nagad; match package features and specifications).
3. Provide clear, step-by-step numbered instructions. Explain *how* and *why* to perform each step so that even non-technical users can follow.
4. Use Markdown formatting inside the 'content' field:
   - Use '###' for sub-headings.
   - Use bold text for buttons, fields, and options (e.g., "Click on **MySQL Databases** under the **Databases** section").
   - Use code blocks for command line instructions or file configurations.
   - Do NOT include the article title as a heading at the top of the content (e.g., no H1/H2 with the title).
5. Categorize articles precisely (e.g., 'Hosting', 'VPS Server', 'Domain', 'n8n Automation', 'Billing', 'General').`;

  const systemInstruction = customPrompt ? `${defaultSystemPrompt}\n\nAdditional Instructions:\n${customPrompt}` : defaultSystemPrompt;

  const userPrompt = `Based on the following source context, please generate a list of 3 to 6 detailed Knowledge Base articles (FAQs or how-to guides).
Make sure to extract all relevant details from the sources.

Source Context:
${contextText}`;

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: systemInstruction
  });

  const responseSchema = {
    type: "array",
    description: "A list of generated knowledge base articles.",
    items: {
      type: "object",
      properties: {
        title: { 
          type: "string", 
          description: "The specific question or guide title. E.g. 'How do I connect to my VPS via SSH?'" 
        },
        category: { 
          type: "string", 
          description: "Category name. Should match one of the main product categories (e.g. Hosting, VPS, Domain, Billing, Support)" 
        },
        summary: { 
          type: "string", 
          description: "A 1-2 sentence quick summary of the answer." 
        },
        content: { 
          type: "string", 
          description: "The full detailed answer or step-by-step guide written in Markdown." 
        }
      },
      required: ["title", "category", "summary", "content"]
    }
  };

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: userPrompt }] }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2 // Lower temp for factual accuracy based on context
    }
  });

  const text = result.response.text();
  try {
    const articles = JSON.parse(text);
    return articles;
  } catch (err) {
    console.error('[Gemini] Failed to parse generated content as JSON:', text);
    throw new Error('Gemini response was not valid JSON: ' + err.message);
  }
}

module.exports = { generateArticlesFromSources, getGeminiConfig };
