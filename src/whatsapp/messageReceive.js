const messageReceive = async message => {
  const { formatFromWANo } = await import('./helper/formatter')
  if (message.body === '!no') {
    message.reply(`my number is ${formatFromWANo(message.to)}`)
  }
}

export default messageReceive
