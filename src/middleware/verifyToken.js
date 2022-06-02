import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] //Bearer token
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // unauthorized
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ err })
    req.name = decoded.name
    req.role = decoded.role
    next()
  })
}
