import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OAuth Mock Endpoints
  app.get("/api/auth/url", (req, res) => {
    const { platform } = req.query;
    
    // In a real app, this would use the platform's specific OAuth URL and your Client ID
    // e.g. https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=...
    
    // For now, we return a mock authorization URL that points back to our own app to simulate the callback
    const mockAuthUrl = `/api/auth/mock-authorize?platform=${platform}`;
    
    res.json({ url: mockAuthUrl });
  });

  app.get("/api/auth/mock-authorize", (req, res) => {
    const { platform } = req.query;
    // Simulate the user clicking "Approve" on the social network's authorization page
    res.send(`
      <html>
        <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f8fafc;">
          <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); text-align: center;">
            <h2>Authorize ${platform}</h2>
            <p>This simulates the ${platform} login screen.</p>
            <button onclick="window.location.href='/api/auth/callback?platform=${platform}&code=mock_auth_code_123'" style="background: #4f46e5; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; cursor: pointer; margin-top: 1rem;">
              Approve Access
            </button>
          </div>
        </body>
      </html>
    `);
  });

  app.get("/api/auth/callback", (req, res) => {
    const { platform, code } = req.query;
    
    // In a real app, you would exchange the 'code' for an access token here using the Client Secret
    // and save it to your database.
    
    // Send success message to parent window and close popup
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', platform: '${platform}' }, '*');
              window.close();
            } else {
              window.location.href = '/tools/social-media-ai';
            }
          </script>
          <p>Authentication successful for ${platform}. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
