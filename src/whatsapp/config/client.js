import WA from 'whatsapp-web.js'
const { Client, LocalAuth } = WA
const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process' // <- this one doesn't work in windows
    ]
  },
  authStrategy: new LocalAuth()
})
export default client
