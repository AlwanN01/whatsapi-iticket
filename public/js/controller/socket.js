const msg = document.querySelector('#msg')
const qrcode = document.querySelector('#qr')
const notifMsg = document.querySelector('#notif')
const audio = new Audio('../sound/notif.wav')
const formInput = document.querySelector('.form-input')

export const init = () => {
  msg.innerHTML = 'Client Connected...'
}
export const message = data => {
  msg.innerHTML = data
}
export const qr = data => {
  qrcode.style.display = 'block'
  qrcode.src = data
}
export const ready = data => {
  if (data) {
    formInput.style.display = 'flex'
    qrcode.style.display = 'none'
  }
}
export const notif = data => {
  new Notification('ITICKET Notifiation', {
    icon: 'http://localhost:3000/image/Cap.png',
    body: data
  })
  const title = data.split('*')[1]
  const body = data.split('*')[2]
  notifMsg.animate(
    [
      { opacity: 0, scale: '0%' },
      { opacity: 1, scale: '100%' }
    ],
    {
      duration: 1000,
      fill: 'none'
    }
  )
  audio.play()
  notifMsg.innerHTML = /*html*/ `<span style="font-weight:bold;">${title}</span> ${body}`
}
