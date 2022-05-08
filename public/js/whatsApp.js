import * as sokContr from './controller/socket.js'
const socket = io()
/** @type {HTMLElement} */
const formInput = document.querySelector('.form-input')
const number = document.querySelector('#number')
socket.on('init', sokContr.init)
socket.on('message', sokContr.message)
socket.on('qr', sokContr.qr)
socket.on('ready', sokContr.ready)
socket.on('notif', sokContr.notif)

formInput.addEventListener('submit', e => {
  e.currentTarget.submit()
  e.preventDefault()
})
let timeout
number.addEventListener('input', e => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    console.log(e.target.value)
  }, 500)
})
// socket.on('disconnect', () => {
//   socket.close()
// })
//socket emmit click event
// document.querySelector('#logout').addEventListener('click', () => {
//   socket.emit('logout')
// })
