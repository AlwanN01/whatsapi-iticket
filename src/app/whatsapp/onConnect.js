export const onConnect = (sockets, getData, setData) => {
  // setData({ ...getData(), msg: 'refresh' })
  const data = getData()
  sockets.emit('message', data.msg)
  sockets.emit('qr', data.barcode)
  sockets.emit('ready', data.ready)
}
