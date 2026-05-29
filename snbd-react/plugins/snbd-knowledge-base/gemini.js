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

  const defaultSystemPrompt = `You are a professional technical support engineer and documentation writer for SNBD HOST, a premium web hosting and server provider in Bangladesh.
Your task is to write detailed, high-quality, and helpful Knowledge Base (FAQ/Guide) articles based ONLY on the provided SOURCE context.

Guidelines:
1. Extract pricing details, plan features, packages, server specifications, and support channels exactly as listed in the sources.
2. Price values should be formatted in BDT (৳) where applicable.
3. Write articles in a clear, concise, and friendly manner.
4. Each article must focus on answering a single, specific customer question or guiding them through a specific process.
5. The 'content' field must be written in well-formatted Markdown (use headings, lists, bold text, and code blocks for instructions).
6. Categorize articles appropriately (e.g., 'Hosting', 'VPS Server', 'Domain', 'n8n Automation', 'Billing', 'General').`;

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
