import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const upload = multer();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Supabase for backend use (ensure you have these set in Render)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Welcome Email Endpoint
  app.post("/api/consultations/welcome", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    try {
      const resendKey = process.env.RESEND_API_KEY;
      
      if (resendKey) {
        const resend = new Resend(resendKey);
        
        const { data, error } = await resend.emails.send({
          from: process.env.EMAIL_FROM_ADDRESS || 'info@mail.onedigispot.com',
          reply_to: 'info@onedigispot.com',
          to: email,
          subject: "Thanks for reaching out to Onedigispot!",
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
              <p>Hi there,</p>
              <p>Thanks for requesting a consultation with Onedigispot! We're excited to learn more about your project.</p>
              <p>If you haven't already, please pick a time that works for you on our calendar so we can chat:</p>
              <p><a href="https://calendly.com/onedigispot" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Book your consultation</a></p>
              <p>Best,<br>The Onedigispot Team</p>
            </div>
          `,
        });

        if (error) {
          console.error("Resend API Error:", error);
          throw new Error(error.message);
        }

        console.log(`Welcome email sent to ${email}. ID: ${data?.id}`);
      } else {
        console.log("Resend API key not configured. Skipping welcome email.");
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending welcome email:", error);
      res.status(500).json({ error: "Failed to send welcome email" });
    }
  });

  // Funnel Opt-in Endpoint
  app.post("/api/funnels/optin", async (req, res) => {
    const { email, name, slug, funnelData } = req.body;
    
    if (!email || !funnelData) {
      return res.status(400).json({ error: "Missing email or funnel data" });
    }

    try {
      let dbDetails = null;
      // Save the lead to Supabase
      if (supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey && supabaseKey !== 'placeholder') {
        const { error: dbError } = await supabase.from('leads').insert({ 
          funnel_slug: slug, 
          email: email,
          name: name,
          created_at: new Date().toISOString()
        });
        
        if (dbError) {
          console.error("Supabase Error saving lead:", JSON.stringify(dbError, null, 2));
          dbDetails = dbError;
        } else {
          console.log(`Lead saved to Supabase: ${email} for funnel ${slug}`);
        }
      } else {
        console.warn("Supabase credentials not fully configured. Skipping DB insert.");
        dbDetails = { message: "Supabase credentials not configured on the server." };
      }

      // Send the first email in the sequence using Resend
      const resendKey = process.env.RESEND_API_KEY;
      
      if (resendKey && funnelData.emails && funnelData.emails.length > 0) {
        const resend = new Resend(resendKey);
        const firstEmail = funnelData.emails[0];
        
        const { data, error } = await resend.emails.send({
          from: process.env.EMAIL_FROM_ADDRESS || 'info@mail.onedigispot.com', // Use a subdomain like mail.onedigispot.com to avoid MX conflicts
          to: email,
          subject: firstEmail.subject,
          text: firstEmail.body,
          html: `<div style="font-family: sans-serif; white-space: pre-wrap;">${firstEmail.body}</div>`,
        });

        if (error) {
          console.error("Resend API Error:", error);
          throw new Error(error.message);
        }

        console.log(`Email sent to ${email} for funnel ${slug}. ID: ${data?.id}`);
      } else {
        console.log("Resend API key not configured or no emails in sequence. Skipping email send.");
      }

      res.json({ success: true, dbError: dbDetails });
    } catch (error) {
      console.error("Error processing opt-in:", error);
      res.status(500).json({ error: "Failed to process opt-in" });
    }
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
              window.location.href = '/social-media-ai-manager';
            }
          </script>
          <p>Authentication successful for ${platform}. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // --- REAL TIKTOK INTEGRATION ---

  app.get("/api/auth/tiktok/url", (req, res) => {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    // We dynamically generate the redirect URI based on where the app is currently running
    const redirectUri = encodeURIComponent(`https://${req.get('host')}/api/auth/tiktok/callback`);
    
    if (!clientKey) {
      return res.status(400).json({ error: "TikTok Client Key is missing in environment variables." });
    }

    // CSRF token to prevent attacks
    const csrfState = Math.random().toString(36).substring(7);
    
    const url = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientKey}&response_type=code&scope=user.info.basic,video.publish&redirect_uri=${redirectUri}&state=${csrfState}`;
    res.json({ url });
  });

  app.get("/api/auth/tiktok/callback", async (req, res) => {
    const { code, state, error } = req.query;
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const redirectUri = `https://${req.get('host')}/api/auth/tiktok/callback`;

    if (error) {
       return res.send(`<h2>Auth Error from TikTok: ${error}</h2>`);
    }

    try {
      // Exchange code for Access Token
      const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_key: clientKey || "",
          client_secret: clientSecret || "",
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: redirectUri
        })
      });

      const data = await tokenRes.json();
      
      if (data.error) {
        return res.send(`<p>Failed to exchange token: ${JSON.stringify(data)}</p>`);
      }

      const accessToken = data.access_token;
      
      // Send token back to the frontend window
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                // Pass the real token to the frontend (in production, save to DB instead!)
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', platform: 'TikTok', token: '${accessToken}' }, '*');
                window.close();
              } else {
                window.location.href = '/app/social-media-ai-post-master';
              }
            </script>
            <p>TikTok Authentication successful! This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (err: any) {
      res.send(`<p>Server error during TikTok Auth: ${err.message}</p>`);
    }
  });

  app.post("/api/social/tiktok/post", upload.single('video'), async (req, res) => {
    const { token, text } = req.body;
    const videoBuffer = req.file?.buffer;
    
    if (!token || !videoBuffer) {
      return res.status(400).json({ error: "Missing token or video file" });
    }

    const size = videoBuffer.length;

    try {
      // 1. Initialize the Direct Post with TikTok
      const initRes = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          post_info: {
             title: text || "Posted via AI Manager",
             privacy_level: "PUBLIC",
             disable_duet: false,
             disable_comment: false,
             disable_stitch: false
          },
          source_info: {
             source: "FILE_UPLOAD",
             video_size: size,
             chunk_size: size,
             total_chunk_count: 1
          }
        })
      });

      const initData = await initRes.json();

      if (initData.error && initData.error.code !== 'ok') {
         return res.status(400).json({ error: "Failed to init upload with TikTok", details: initData });
      }

      const uploadUrl = initData.data?.upload_url;

      if (!uploadUrl) {
         return res.status(400).json({ error: "TikTok didn't return an upload URL", details: initData });
      }

      // 2. HTTP PUT the video bytes directly to TikTok's provided server URL
      const putRes = await fetch(uploadUrl, {
         method: "PUT",
         headers: {
            "Content-Range": `bytes 0-${size - 1}/${size}`,
            "Content-Length": size.toString(),
            "Content-Type": "video/mp4"
         },
         body: videoBuffer
      });

      if (!putRes.ok) {
         throw new Error("Failed to upload binary file to TikTok.");
      }

      res.json({ success: true, message: "Video successfully submitted to TikTok processing queue!" });
    } catch (err: any) {
      console.error("TikTok Posting Error:", err);
      res.status(500).json({ error: err.message || "Unknown error occurred" });
    }
  });

  // TikTok Webhook Endpoint
  app.post("/api/webhooks/tiktok", (req, res) => {
    // TikTok sends event notifications here
    console.log("TikTok Webhook Received:", req.body);
    res.status(200).send("ok");
  });

  // --- PAYMENTS INTEGRATION ---

  // PayPal Create Order
  app.post("/api/payments/paypal/create-order", async (req, res) => {
    try {
      const { amount, currency = "USD", description = "Digital Service" } = req.body;
      
      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "PayPal credentials not configured on the server." });
      }

      const paypalBaseUrl = process.env.PAYPAL_ENVIRONMENT === 'live' ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

      // 1. Get Access Token
      const tokenResponse = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // 2. Create Order
      const orderResponse = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              description,
              amount: {
                currency_code: currency,
                value: amount.toString(),
              },
            },
          ],
          application_context: {
             return_url: `https://${req.get('host')}/payment-success?status=successful`,
             cancel_url: `https://${req.get('host')}/payment-success?status=cancelled`
          }
        }),
      });

      const orderData = await orderResponse.json();
      
      let approveLink = "";
      if (orderData.links) {
         const linkStr = orderData.links.find((l: any) => l.rel === "approve");
         if (linkStr) approveLink = linkStr.href;
      }
      
      res.json({ id: orderData.id, link: approveLink });
    } catch (error: any) {
      console.error("PayPal Order Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // PayPal Capture Order
  app.post("/api/payments/paypal/capture-order", async (req, res) => {
    try {
      const { orderID } = req.body;
      
      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      const paypalBaseUrl = process.env.PAYPAL_ENVIRONMENT === 'live' ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

      const tokenResponse = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const captureResponse = await fetch(`${paypalBaseUrl}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const captureData = await captureResponse.json();
      res.json(captureData);
    } catch (error: any) {
      console.error("PayPal Capture Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Paystack Initialize Payment
  app.post("/api/payments/paystack/init", async (req, res) => {
    try {
      const { amount, currency = "KES", email, name, description = "Digital Service" } = req.body;
      
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      
      if (!secretKey) {
         return res.status(500).json({ error: "Paystack secret key not configured." });
      }

      // We dynamically generate the redirect URI based on where the app is currently running
      const callbackUrl = `https://${req.get('host')}/payment-success?status=successful`;

      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Paystack expects amount in Kobo/Cents
          currency,
          email,
          callback_url: callbackUrl,
          metadata: {
            custom_fields: [
              {
                display_name: "Customer Name",
                variable_name: "customer_name",
                value: name || "Customer"
              },
              {
                display_name: "Description",
                variable_name: "description",
                value: description
              }
            ]
          }
        })
      });

      const data = await response.json();
      
      if (data.status === true || data.status === "success") {
        res.json({ link: data.data.authorization_url });
      } else {
        res.status(400).json({ error: data.message });
      }
    } catch (error: any) {
      console.error("Paystack Error:", error);
      res.status(500).json({ error: error.message });
    }
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

  // Keep-alive mechanism to prevent Render sleep (Option 1)
  // This will ping the server every 10 minutes.
  setInterval(() => {
    const url = process.env.RENDER_EXTERNAL_URL 
      ? `${process.env.RENDER_EXTERNAL_URL}/api/health` 
      : `http://localhost:${PORT}/api/health`;
      
    fetch(url)
      .then(() => console.log(`[Keep-Alive] Pinged ${url} successfully`))
      .catch((err) => console.error(`[Keep-Alive] Failed to ping ${url}:`, err.message));
  }, 10 * 60 * 1000);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
