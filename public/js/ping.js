const socket = io({ path: '/ping.io' })

const listPing = document.querySelector('#list-ping')

let listData = ''
socket.on('ping', data => {
  listData = ''
  data.forEach(item => {
    listData += /*html*/ `
    <li>
      <span class="name">${item.name} : </span>
      <span class="host">${item.host} | </span>
      <span class="status"> ${item.active ? 'Active' : 'Not Active'}</span>
    </li>
    `
  })
  listPing.innerHTML = listData
})
