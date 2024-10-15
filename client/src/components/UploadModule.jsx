// import { InboxOutlined } from '@ant-design/icons'
// import { message, Upload, Button } from 'antd'
// import axios from 'axios'
// import '../components/UploadModule'
// import bridegroom from '../assets/bridegroom.png'

// const { Dragger } = Upload

// const UploadModule = (...props) => {
//   const [credentials] = props

//   const uploadprops = {
//     name: 'files',
//     multiple: true,
//     action: `${import.meta.env.VITE_API_URL}/upload`,
//     headers: {
//       Authorization: `Basic ${btoa(
//         `${credentials.username}:${credentials.password}`
//       )}`, // Send Basic Auth credentials
//     },
//     onChange(info) {
//       const { status } = info.file

//       if (status === 'uploading') {
//         // Add file to loading state
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`)
//         // handleUpload(info);
//       }
//     },
//     onDrop(e) {
//       console.log('Dropped files', e.dataTransfer.files)
//     },
//     customReuest({
//       action,
//       info,
//       headers,
//       onProgress,
//       file,
//       onSuccess,
//       onError,
//     }) {
//       const formData = new FormData()
//       if (info) {
//         Object.keys(info).forEach((key) => {
//           formData.append(key, info[key])
//         })
//       }

//       axios
//         .post(action, formData, {
//           headers,
//           onUploadProgress: ({ total, loaded }) => {
//             onProgress(
//               {
//                 percent: Number(Math.round((loaded / total) * 100).toFixed(2)),
//               },
//               file
//             )
//           },
//         })
//         .then(({ data: response }) => {
//           onSuccess(response, file)
//         })
//         .catch(onError)
//     },
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('username')
//     localStorage.removeItem('password')
//     credentials.setIsAuthenticated(false)
//     message.info('You have been logged out')
//   }

//   return (
//     <div>
//       <div>
//         <div>
//           <img src={bridegroom} alt='bride' width='45%' />
//         </div>
//         <div className='handwriting'>
//           <p>
//             Savor every giggle and twirl, and do not forget to snap a pic and
//             upload!{' '}
//           </p>
//           <p> Each photo turns a sweet moment into a cherished memory... </p>
//         </div>
//         <Dragger {...uploadprops}>
//           <p className='ant-upload-drag-icon'>
//             <InboxOutlined />
//           </p>
//           <p className='ant-upload-text'>
//             Click or drag file to this area to upload
//           </p>
//           <p className='ant-upload-hint'>
//             Uploaded files are like little keepsakes—once they are here, they
//             are here to stay! 🤍 <br />
//             Enjoy your treasures! 🤞
//           </p>
//         </Dragger>
//         {/* <div style={{ textAlign: 'right', marginTop: '20px' }}>
//                     <Button onClick={handleLogout} danger>Log Out</Button>
//                 </div> */}
//       </div>
//     </div>
//   )
// }

// export default UploadModule

// // import { useState } from 'react';
// // import { InboxOutlined } from '@ant-design/icons';
// // import { message, Upload, Input, Button } from 'antd';
// // import axios from 'axios';
// // import '../components/UploadModule'
// // import welcomeimage from '../assets/welcomeimage(1).png'
// // import backimage from '../assets/backimage.png'
// // import bridegroom from '../assets/bridegroom.png'

// // // import { uploadFilesToDrive } from '../utils/api'; // Import the API function

// // const { Dragger } = Upload;

// // const UploadModule = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [isAuthenticated, setIsAuthenticated] = useState(false);

// //     const handleLogin = async () => {
// //         if (username && password) {
// //             try {
// //                 const token = btoa(`${username}:${password}`);
// //                 // Make a request to your login API to validate credentials
// //                 const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {}, {
// //                     headers: {
// //                         Authorization: `Basic ${token}` // Include the Authorization header
// //                     }
// //                 });
// //                 if (response.data.success) { // Assuming your API returns an object with a success property
// //                     setIsAuthenticated(true);
// //                     message.success('Logged in successfully');
// //                 } else {
// //                     message.error('Invalid username or password');
// //                 }
// //             } catch (error) {
// //                 message.error('Error during login. Please try again.');
// //                 console.error(error);
// //             }
// //         } else {
// //             message.error('Please enter both username and password');
// //         }
// //     };

// //     const props = {
// //         name: 'files',
// //         multiple: true,
// //         action: `${import.meta.env.VITE_API_URL}/upload`,
// //         headers: {
// //             Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Send Basic Auth credentials
// //         },
// //         onChange(info) {
// //             const { status } = info.file;

// //             if (status === "uploading") {
// //                 // Add file to loading state
// //             }
// //             if (info.file.status === 'done') {

// //                 message.success(`${info.file.name} file uploaded successfully.`);
// //                 // handleUpload(info);
// //             }
// //         },
// //         onDrop(e) {
// //             console.log('Dropped files', e.dataTransfer.files);
// //         },
// //         customReuest({ action, info, headers, onProgress, file, onSuccess, onError }) {
// //             const formData = new FormData();
// //             if (info) {
// //                 Object.keys(info).forEach(key => {
// //                     formData.append(key, info[key]);
// //                 });
// //             }

// //             axios.post(action, formData, {
// //                 headers,
// //                 onUploadProgress: ({ total, loaded }) => {
// //                     onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
// //                 },
// //             })
// //                 .then(({ data: response }) => {
// //                     onSuccess(response, file);
// //                     console.log(response)
// //                 })
// //                 .catch(onError);
// //         }
// //     };

// //     return (
// //         <div>

// //             {!isAuthenticated ? (
// //                 <div style={{
// //                     backgroundImage: `url(${backimage}`, backgroundSize: 'cover', // Adjust as needed
// //                     backgroundRepeat: 'no-repeat'
// //                 }}>
// //                     <div style={{ padding: '20px' }}>
// //                         <div><img src={welcomeimage} alt="" width='72%' /></div>
// //                         <Input
// //                             placeholder="Username"
// //                             value={username}
// //                             onChange={(e) => setUsername(e.target.value)}
// //                             style={{ marginBottom: '10px' }}
// //                         />
// //                         <Input.Password
// //                             placeholder="Password"
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             style={{ marginBottom: '10px' }}
// //                         />
// //                         <Button type="primary" onClick={handleLogin}>
// //                             Log in
// //                         </Button>
// //                     </div>
// //                 </div>
// //             ) : (
// //                 <div>
// //                     <div >
// //                         <img src={bridegroom} alt="bride" width='45%' />
// //                     </div>
// //                     <div className='handwriting'><p >Savor every giggle and twirl, and do not forget to snap a pic and upload! </p>
// //                         <p > Each photo turns a sweet moment into a cherished memory... </p>
// //                     </div>
// //                     <Dragger {...props}>
// //                         <p className="ant-upload-drag-icon">
// //                             <InboxOutlined />
// //                         </p>
// //                         <p className="ant-upload-text">Click or drag file to this area to upload</p>
// //                         <p className="ant-upload-hint">
// //                             Uploaded files are like little keepsakes—once they are here, they are here to stay! 🤍 <br />
// //                             Enjoy your treasures! 🤞
// //                         </p>
// //                     </Dragger>

// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default UploadModule;

import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import axios from 'axios'
import bridegroom from '../assets/bridegroom.png'

const { Dragger } = Upload

const UploadModule = () => {
  const uploadprops = {
    name: 'files',
    multiple: true,
    action: `${import.meta.env.VITE_API_URL}/upload`, // Pointing to the upload API
    onChange(info) {
      const { status } = info.file

      if (status === 'uploading') {
        // You can add some loading indicator if needed
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    customRequest({ action, file, onProgress, onSuccess, onError }) {
      const formData = new FormData()
      formData.append('files', file) // Append the file to formData

      axios
        .post(action, formData, {
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round((loaded / total) * 100) }, file)
          },
        })
        .then((response) => onSuccess(response.data, file))
        .catch(onError)
    },
  }

  return (
    <div>
      <div>
        <div>
          <img src={bridegroom} alt='bride' width='45%' />
        </div>
        <div className='handwriting'>
          <p>
            Savor every giggle and twirl, and do not forget to snap a pic and
            upload!
          </p>
          <p>Each photo turns a sweet moment into a cherished memory...</p>
        </div>
        <Dragger {...uploadprops}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Uploaded files are like little keepsakes—once they are here, they
            are here to stay! 🤍
            <br />
            Enjoy your treasures! 🤞
          </p>
        </Dragger>
      </div>
    </div>
  )
}

export default UploadModule
