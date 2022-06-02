import WA from 'whatsapp-web.js'
const { Client, LocalAuth, NoAuth } = WA
const option = {
  puppeteer: {
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--no-sandbox', // only for testing, not for production
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote'
      // '--single-process' // <- this one doesn't work in windows
    ]
  },
  authStrategy: new NoAuth()
}
export const client = new Client(option)
// export const client2 = new Client(option)
