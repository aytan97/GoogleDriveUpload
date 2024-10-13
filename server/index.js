const express = require('express')
const bodyParser = require('body-parser')
const { google } = require('googleapis')
const multer = require('multer')
const cors = require('cors')
const stream = require('stream')
require('dotenv').config()
// Initialize Express app
const authenticate = require('./auth')
const app = express()
app.use(express.json()) // to parse JSON request body
app.use(cors())
app.use(bodyParser.json())

app.post('/login', authenticate, (req, res) => {
  if (req.user) {
    return res.status(200).json({ success: true, message: 'Login successful.' })
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password.' })
  }
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Function to convert buffer to stream
const bufferToStream = (buffer) => {
  const readableStream = new stream.PassThrough()
  readableStream.end(buffer)
  return readableStream
}

app.post('/upload', authenticate, upload.array('files'), async (req, res) => {
  try {
    // Google Drive authentication setup
    const auth = new google.auth.GoogleAuth({
      keyFile: 'key.json',
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

    console.error(`${uploadedFiles.length} files uploaded successfully`)
  } catch (error) {
    console.error('Error uploading files:', error)
    res
      .status(500)
      .json({ message: 'File upload failed', error: error.message })
  }
})

// Start the server
app.listen(5175, () => {
  console.log('App is running on port 5175')
})
