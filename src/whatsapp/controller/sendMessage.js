import { client } from '#wa/config/client'
import { replace, formatFromRegNo } from '#wa/helper'
import { validationResult } from 'express-validator'
const checkRegisteredNumber = async number => {
  const isRegistered = await client.isRegisteredUser(number)
  return isRegistered
}

export const sendMessage = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg)
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: false, errors: errors.mapped() })
  }
  const number = formatFromRegNo(req.body.number)
  const message = req.body.message
  console.log(number, message)
  const isRegistered = await checkRegisteredNumber(number)
  if (!isRegistered) {
    return res.status(422).json({ status: false, errors: { number: 'Number not registered' } })
  }

  client
    .sendMessage(number, replace(message))
    .then(response => {
      res.json({ status: true, response })
    })
    .catch(err => {
      res.json({ status: false, response: 'Failed to send message' })
    })
}
