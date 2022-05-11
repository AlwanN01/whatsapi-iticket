const listNumber = document.querySelector('.form-input').querySelector('.list')
const form = document.querySelector('.form-input')
let timeout
export const searchKontak = e => {
  //text length

  if (e.target.value.length > 2) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(async () => {
      const res = await fetch(`/kontak/${e.target.value}`)
      const { rows } = await res.json()
      let listData = ''
      if (rows) {
        rows.forEach((data, i) => {
          listData += /*html*/ `
        <ul tabindex="${i + 2}">
          <li>${data.nohp}</li>
          <li>${data.nama}</li>
        </ul>
        `
        })
      }
      listNumber.innerHTML = listData
      listNumber.style.display = 'block'
    }, 300)
  }
}
