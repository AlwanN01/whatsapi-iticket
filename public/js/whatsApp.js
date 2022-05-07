let socket = io()
const msg = document.querySelector('#msg')
const qr = document.querySelector('#qr')

socket.on('message', data => {
  msg.innerHTML = data
})

socket.on('qr', data => {
  console.log(data)
  qr.src = data
})
