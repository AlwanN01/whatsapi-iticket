import http from 'http'
import app from './src/app'
import whatsapp from '#root/whatsapp'
import puppeteer from 'puppeteer'
const port = process.env.PORT || 3000

const server = http.createServer(app)
whatsapp(server)
;(async () => {
  const browser = await puppeteer.launch({ headless: false, product: 'firefox' })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/whats-api.html')
})()

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
