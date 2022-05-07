let socket = io()
const msg = document.querySelector('#msg')
const qr = document.querySelector('#qr')

socket.on('message', data => {
  msg.innerHTML = data
})

socket.on('qr', data => {
  qr.src = data
})

socket.on('ready', () => {
  console.log('ready')
  qr.style.display = 'none'
})
//socket emmit click event
// document.querySelector('#logout').addEventListener('click', () => {
//   socket.emit('logout')
// })
