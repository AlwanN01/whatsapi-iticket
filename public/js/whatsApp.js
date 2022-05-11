import * as sokContr from './controller/socket.js'
import { searchKontak } from './controller/search.js'
const socket = io()
/** @type {HTMLElement} */
const listNumber = document.querySelector('.form-input').querySelector('.list')
const number = document.querySelector('#number')
socket.on('init', sokContr.init)
socket.on('message', sokContr.message)
socket.on('qr', sokContr.qr)
socket.on('ready', sokContr.ready)
socket.on('notif', sokContr.notif)
socket.on('disconnected', sokContr.disconnected)
number.addEventListener('input', searchKontak)
;['click', 'keyup'].forEach(event =>
  listNumber.addEventListener(event, e => {
    if (e.target.tagName === 'LI') {
      number.value = e.target.parentNode.firstElementChild.innerText
      listNumber.style.display = 'none'
    } else {
      number.value = e.target.firstElementChild.innerText
      listNumber.style.display = 'none'
    }
  })
)
// socket.on('disconnect', () => {
//   socket.close()
// })
//socket emmit click event
// document.querySelector('#logout').addEventListener('click', () => {
//   socket.emit('logout')
// })
