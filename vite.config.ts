import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const webhookUrl = env.DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL

  return {
    plugins: [
      react(),
      {
        name: 'local-api-telemetry',
        configureServer(server) {
          server.middlewares.use('/api/telemetry', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let raw = ''
            req.on('data', (chunk) => {
              raw += chunk
            })
            req.on('end', async () => {
              if (!webhookUrl) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ warning: 'No local DISCORD_WEBHOOK_URL configured' }))
                return
              }

              try {
                const response = await fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: raw,
                })
                res.statusCode = response.status
                res.setHeader('Content-Type', 'application/json')
                const text = await response.text()
                res.end(text || JSON.stringify({ ok: true }))
              } catch (e: unknown) {
                const message = e instanceof Error ? e.message : 'Unknown error'
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: message }))
              }
            })
          })
        },
      },
    ],
  }
})
