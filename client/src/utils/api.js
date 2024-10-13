// api.js
const API_URL = import.meta.env.VITE_API_URL // Backend API URL
export const uploadFilesToDrive = async (files, username, password) => {
  try {
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Send Basic Auth credentials
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        message: 'Files uploaded successfully',
        files: data.files,
      }
    } else {
      return {
        success: false,
        message: 'File upload failed. Please try again later.',
      }
    }
  } catch (error) {
    console.error('Error uploading files:', error)
    return { success: false, message: 'Error occurred during upload' }
  }
}
