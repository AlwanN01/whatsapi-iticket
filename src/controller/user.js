import { User } from '#model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}
export const register = async (req, res) => {
  try {
    const { name, role, password, confPassword } = req.body
    if (password !== confPassword) return res.status(400).json({ message: 'password tidak sama' })
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, role, password: hash })
    res.status(201).json({ message: 'user created' })
  } catch (error) {
    res.json({ error })
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.name)
    if (!user) return res.status(400).json({ message: 'user tidak ditemukan' })
    const { name, role } = user
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return res.status(400).json({ message: 'password salah' })
    const accessToken = jwt.sign({ name, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 })
    const expiresIn = (new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0) - new Date().getTime()).toString()
    const refreshToken = jwt.sign({ name, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn })
    await user.update({ refreshToken }, { where: { name } })
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: expiresIn, sameSite: 'strict' })
    res.status(200).json({ accessToken })
  } catch (error) {
    console.log(error)
  }
}

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await User.findByPk(req.body.name)
    if (!user) return res.sendStatus(204)
    await user.update({ refreshToken: null }, { where: { name: req.body.name } })
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'logout success' })
  } catch (error) {
    console.log(error)
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401) // unauthorized
    const user = await User.findOne({ where: { refreshToken } })
    if (!user) return res.sendStatus(403) // forbidden
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403) // forbidden
      const accessToken = jwt.sign({ name: user.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 })
      res.json({ accessToken })
    })
  } catch (error) {
    console.log(error)
  }
}
