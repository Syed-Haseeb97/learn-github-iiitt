import type { IncomingMessage, ServerResponse } from 'http';

interface ExtendedRequest extends IncomingMessage {
  body?: unknown;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: unknown) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    // If webhook is not configured, don't crash client
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ warning: 'DISCORD_WEBHOOK_URL not configured on server' }));
    return;
  }

  try {
    let rawBody = '';
    if (typeof req.body === 'object' && req.body !== null) {
      rawBody = JSON.stringify(req.body);
    } else if (typeof req.body === 'string') {
      rawBody = req.body;
    } else {
      // Buffer chunks if body parser didn't run
      for await (const chunk of req) {
        rawBody += chunk;
      }
    }

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawBody,
    });

    if (!discordResponse.ok) {
      const errText = await discordResponse.text();
      res.writeHead(discordResponse.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: errText }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: message }));
  }
}
