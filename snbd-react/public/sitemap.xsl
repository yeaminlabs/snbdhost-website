<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | SNBD HOST</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1f2937;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            padding: 35px;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
          }
          .header-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .logo-text {
            font-size: 22px;
            font-weight: 900;
            color: #cc0000;
            text-decoration: none;
            letter-spacing: -0.5px;
          }
          h1 {
            color: #111827;
            font-size: 22px;
            margin: 0;
            font-weight: 800;
          }
          p {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
            margin-top: 0;
            margin-bottom: 20px;
          }
          p a {
            color: #cc0000;
            text-decoration: none;
            font-weight: 600;
          }
          p a:hover {
            text-decoration: underline;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: #4b5563;
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 20px;
            padding: 6px 12px;
            background: #f3f4f6;
            border-radius: 8px;
            transition: all 0.2s;
          }
          .back-link:hover {
            background: #e5e7eb;
            color: #111827;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background-color: #f9fafb;
            color: #374151;
            font-weight: 700;
            text-align: left;
            padding: 14px 16px;
            font-size: 13px;
            border-bottom: 2px solid #e5e7eb;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td {
            padding: 14px 16px;
            font-size: 13.5px;
            border-bottom: 1px solid #f3f4f6;
            word-break: break-all;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #fafafa;
          }
          .url-link {
            color: #cc0000;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.15s;
          }
          .url-link:hover {
            color: #990000;
            text-decoration: underline;
          }
          .highlight {
            color: #6b7280;
            font-family: monospace;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 6px;
            background: #f3f4f6;
            color: #4b5563;
          }
          .badge-priority {
            background: #fef2f2;
            color: #cc0000;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-flex">
            <h1>XML Sitemap</h1>
            <a href="/" class="logo-text">SNBD HOST</a>
          </div>
          
          <p>
            This XML Sitemap is dynamically generated to help search engines like Google and Bing crawl and index SNBD HOST content.
            Read more about XML sitemaps at <a href="https://sitemaps.org" target="_blank" rel="noopener noreferrer">sitemaps.org</a>.
          </p>

          <!-- Back link if we are inside a sub-sitemap -->
          <xsl:if test="sitemap:urlset">
            <a href="/sitemap.xml" class="back-link">← Return to Sitemap Index</a>
          </xsl:if>
          
          <!-- Sitemap Index view -->
          <xsl:if test="sitemap:sitemapindex">
            <p>This is a sitemap index referencing <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong> sub-sitemaps.</p>
            <table>
              <thead>
                <tr>
                  <th width="70%">Sitemap URL</th>
                  <th width="30%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="highlight"><xsl:value-of select="sitemap:lastmod"/></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          
          <!-- Urlset view -->
          <xsl:if test="sitemap:urlset">
            <p>This sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs.</p>
            <table>
              <thead>
                <tr>
                  <th width="55%">URL</th>
                  <th width="15%">Priority</th>
                  <th width="15%">Change Freq</th>
                  <th width="15%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge badge-priority"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                    <td>
                      <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span class="highlight"><xsl:value-of select="sitemap:lastmod"/></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
