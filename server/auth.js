const users = [
  { username: process.env.USER_NAME, password: process.env.PASS }, // Example user
]

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password must be provided' })
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  )

  if (user) {
    req.user = user
    return next()
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

module.exports = authenticate
