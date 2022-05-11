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
export const ready = ready => {
  if (ready) {
    formInput.style.display = 'flex'
    qrcode.style.display = 'none'
  } else formInput.style.display = 'none'
}
export const notif = data => {
  new Notification('ITICKET Notifiation', {
    icon: '/image/Cap.png',
    body: data,
  })
  const title = data.split('*')[1]
  const body = data.split('*')[2]
  notifMsg.animate(
    [
      { opacity: 0, scale: '0%' },
      { opacity: 1, scale: '100%' },
    ],
    {
      duration: 1000,
      fill: 'none',
    }
  )
  audio.play()
  notifMsg.innerHTML = /*html*/ `<span style="font-weight:bold;">${title}</span> ${body}`
}

export const disconnected = () => {
  msg.innerHTML = 'Client Disconnected!'
  qrcode.style.display = 'none'
  formInput.style.display = 'none'
}
