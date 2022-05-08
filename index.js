import http from 'http'
import app from './src/app'
import whatsapp from '#root/whatsapp'
import puppeteer from 'puppeteer'
const port = process.env.PORT || 3000

const server = http.createServer(app)
whatsapp(server)
// ;(async () => {
//   const browser = await puppeteer.launch({
//     headless: true,
//     ignoreDefaultArgs: ['--mute-audio'],
//     //allow notification args
//     args: ['--autoplay-policy=no-user-gesture-required'],
//     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
//   })

//   const page = await browser.newPage()
//   await page.goto('http://localhost:3000/whats-api.html')
//   const context = browser.defaultBrowserContext()
//   context.overridePermissions('http://localhost:3000', ['notifications', 'background-sync'])

//   try {
//     await context.overridePermissions('http://localhost:3000/whats-api.html', ['push'])
//   } catch (e) {
//     // workaround because 'push' throws unknown permisson type but works anyways
//   }
// })()

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
