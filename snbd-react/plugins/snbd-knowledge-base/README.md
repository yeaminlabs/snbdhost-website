# SNBD HOST Knowledge Base Plugin (Gemini AI Powered)

This is a self-contained, zip-packable Knowledge Base plugin for the `snbd-react` web application. It crawls the website pages and blog database, uses Gemini AI models to generate customer support articles and FAQs, and provides a beautiful, searchable support interface for customers.

---

## Features

1. **AI Generation**: Generate articles using Gemini (`gemini-1.5-flash` or `gemini-2.5-flash`) based on the content of your pages (`Hosting.jsx`, `VPSServer.jsx`, etc.) and your blog posts.
2. **Double Operation Modes**:
   - **Integrated Mode**: Loaded dynamically by the main server, sharing its node process.
   - **Standalone Mode**: Runs on a separate port (`3002`) to completely offload storage and CPU load.
3. **Draft Preview & Edit**: Admin can review, modify, categories, and publish AI-generated articles.
4. **Instant Search**: Search widget with live suggestions for the public support page.

---

## Installation & Setup

### Option 1: Integrated Mode (Default)

1. Unzip the plugin archive into `plugins/snbd-knowledge-base/` in your project root.
2. Open terminal in the plugin directory and run npm install:
   ```bash
   cd plugins/snbd-knowledge-base
   npm install
   ```
3. Restart your main server. The application will detect the plugin and load it automatically!
4. Navigate to `/admin/plugins/knowledge-base` in your browser.

### Option 2: Standalone Mode (Offloaded Load)

1. Unzip the plugin archive into `plugins/snbd-knowledge-base/`.
2. Install dependencies:
   ```bash
   cd plugins/snbd-knowledge-base
   npm install
   ```
3. Copy or link your `.env` settings to include `JWT_SECRET`.
4. Start the standalone server:
   ```bash
   npm start
   ```
   *The standalone server runs on port `3002`.*
5. In your main server environment, if you want to offload all requests, configure:
   ```env
   KB_PLUGIN_STANDALONE=true
   KB_PLUGIN_URL=http://localhost:3002
   ```
6. The main server will proxy all `/api/plugins/snbd-knowledge-base` requests directly to your standalone plugin process!

---

## API Configuration

To use the AI generation, you must provide a Gemini API Key. You can get an API Key from the Google AI Studio:
- Configure it directly in the Admin Panel settings under **Knowledge Base -> Settings**.
- Alternatively, define it in your `.env` file:
  ```env
  GEMINI_API_KEY=your_gemini_api_key_here
  ```
