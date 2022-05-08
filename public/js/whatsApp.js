let socket = io()
const msg = document.querySelector('#msg')
const qr = document.querySelector('#qr')
const notif = document.querySelector('#notif')
const audio = new Audio('../sound/notif.wav')
new Notification('ITICKET Notifiation', {
  icon: 'http://localhost:3000/image/Cap.png',
  body: "Hi`, I'm ITICKET"
})
// if (resp !== undefined) {
//   resp
//     .then(_ => {
//       // autoplay starts!
//     })
//     .catch(error => {
//       //show error
//     })
// }
socket.on('init', () => {
  msg.innerHTML = 'Client Connected...'
})
socket.on('message', data => {
  msg.innerHTML = data
})

socket.on('qr', data => {
  qr.style.display = 'block'
  qr.src = data
  //display style
})

socket.on('ready', () => {
  qr.style.display = 'none'
  console.log('ready')
})
socket.on('notif', data => {
  let notifBody = data
  new Notification('ITICKET Notifiation', {
    icon: 'http://localhost:3000/image/Cap.png',
    body: notifBody
  })

  const title = data.split('*')[1]
  const body = data.split('*')[2]
  notif.animate(
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
  notif.innerHTML = /*html*/ `<span style="font-weight:bold;">${title}</span> ${body}`
})
// socket.on('disconnect', () => {
//   socket.close()
// })
//socket emmit click event
// document.querySelector('#logout').addEventListener('click', () => {
//   socket.emit('logout')
// })
