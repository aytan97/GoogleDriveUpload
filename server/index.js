// const express = require('express')
// const bodyParser = require('body-parser')
// const { google } = require('googleapis')
// const multer = require('multer')
// const cors = require('cors')
// const stream = require('stream')
// require('dotenv').config()
// // Initialize Express app
// const authenticate = require('./auth')
// const app = express()
// app.use(express.json()) // to parse JSON request body
// app.use(cors())
// app.use(bodyParser.json())

// app.post('/login', authenticate, (req, res) => {
//   if (req.user) {
//     return res.status(200).json({ success: true, message: 'Login successful.' })
//   } else {
//     return res
//       .status(401)
//       .json({ success: false, message: 'Invalid username or password.' })
//   }
// })

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// // Function to convert buffer to stream
// const bufferToStream = (buffer) => {
//   const readableStream = new stream.PassThrough()
//   readableStream.end(buffer)
//   return readableStream
// }

// app.post('/upload', authenticate, upload.array('files'), async (req, res) => {
//   try {
//     // Google Drive authentication setup
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         type: process.env.GOOGLE_TYPE,
//         project_id: process.env.GOOGLE_PROJECT_ID,
//         private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
//         private_key: process.env.GOOGLE_PRIVATE_KEY,
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//         token_uri: 'https://oauth2.googleapis.com/token',
//         auth_provider_x509_cert_url:
//           'https://www.googleapis.com/oauth2/v1/certs',
//         client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
//         universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
//       },
//       scopes: ['https://www.googleapis.com/auth/drive'],
//     })

//     const drive = google.drive({ version: 'v3', auth })

//     const uploadedFiles = []

//     // Upload each file to Google Drive
//     for (let i = 0; i < req.files.length; i++) {
//       const file = req.files[i]
//       const fileStream = bufferToStream(file.buffer)

//       const response = await drive.files.create({
//         requestBody: {
//           name: file.originalname,
//           mimeType: file.mimetype,
//           parents: [`${process.env.PARENTS}`], // Replace with your folder ID
//         },
//         media: {
//           body: fileStream,
//         },
//       })

//       uploadedFiles.push({
//         id: response.data.id,
//         name: file.originalname,
//         message: `File "${file.originalname}" uploaded successfully.`,
//       })
//     }

//     res.json({
//       message: 'All files uploaded successfully',
//       files: uploadedFiles,
//     })

//     console.error(`${uploadedFiles.length} files uploaded successfully`)
//   } catch (error) {
//     console.error('Error uploading files:', error)
//     res
//       .status(500)
//       .json({ message: 'File upload failed', error: error.message })
//   }
// })

// app.get('/favicon.ico', (req, res) => res.status(204)) // Sends no content to prevent 404

// // Start the server
// app.listen(5175, () => {
//   console.log('App is running on port 5175')
// })

const express = require('express')
const bodyParser = require('body-parser')
const { google } = require('googleapis')
const multer = require('multer')
const cors = require('cors')
const stream = require('stream')
require('dotenv').config()

// Initialize Express app
const app = express()
app.use(express.json()) // to parse JSON request body
app.use(cors())
app.use(bodyParser.json())

const storage = multer.memoryStorage()

const upload = multer(
  { storage: storage },
  {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100 MB size limit, adjust as needed
    },
  }
)

// Function to convert buffer to stream
const bufferToStream = (buffer) => {
  const readableStream = new stream.PassThrough()
  readableStream.end(buffer)
  return readableStream
}

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    // Google Drive authentication setup
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    const drive = google.drive({ version: 'v3', auth })

    const uploadedFiles = []

    // Upload each file to Google Drive
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i]
      const fileStream = bufferToStream(file.buffer)

      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: [`${process.env.PARENTS}`], // Replace with your folder ID
        },
        media: {
          body: fileStream,
        },
      })

      uploadedFiles.push({
        id: response.data.id,
        name: file.originalname,
        message: `File "${file.originalname}" uploaded successfully.`,
      })
    }

    res.json({
      message: 'All files uploaded successfully',
      files: uploadedFiles,
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    res
      .status(500)
      .json({ message: 'File upload failed', error: error.message })
  }
})

// Start the server
app.listen(5176, () => {
  console.log('App is running on port 5175')
})
