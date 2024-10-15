// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import welcomeimage from '../assets/welcomeimage(1).png';
// import backimage from '../assets/backimage.png';
// import UploadModule from './UploadModule';
// import { message, Input, Button } from 'antd';

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Check if the token exists in localStorage
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsAuthenticated(true);
//             setUsername(localStorage.getItem('username'));
//             setPassword(localStorage.getItem('password'));
//         }
//     }, []);

//     // console.log(import.meta.env.VITE_API_URL)

//     const handleLogin = async () => {
//         if (username && password) {
//             try {
//                 const token = btoa(`${username}:${password}`);
//                 const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {}, {
//                     headers: {
//                         Authorization: `Basic ${token}`
//                     }
//                 });
//                 if (response.data.success) {
//                     localStorage.setItem('token', token);
//                     localStorage.setItem('username', username);
//                     localStorage.setItem('password', password);
//                     setIsAuthenticated(true);
//                     message.success('Logged in successfully');
//                 } else {
//                     message.error('Invalid username or password');
//                 }
//             } catch (error) {
//                 message.error('Error during login. Please try again.');
//                 console.error(error);
//             }
//         } else {
//             message.error('Please enter both username and password');
//         }
//     };

//     return (
//         <div>
//             {!isAuthenticated ? (
//                 <div style={{ backgroundImage: `url(${backimage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
//                     <div style={{ padding: '20px' }}>
//                         <div><img src={welcomeimage} alt="" width='72%' /></div>
//                         <Input
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             style={{ marginBottom: '10px' }}
//                         />
//                         <Input.Password
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             style={{ marginBottom: '10px' }}
//                         />
//                         <Button type="primary" onClick={handleLogin}>
//                             Log in
//                         </Button>
//                     </div>
//                 </div>
//             ) : (
//                 <UploadModule username={username} password={password} setIsAuthenticated={setIsAuthenticated} />
//             )}
//         </div>
//     );
// };

// export default LoginPage;

import { Button } from 'antd'
import UploadModule from './UploadModule'
import backimage from '../assets/backimage.png'
import welcomeimage from '../assets/welcomeimage(1).png'

const LoginPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backimage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ padding: '20px' }}>
        <div>
          <img src={welcomeimage} alt='' width='72%' />
        </div>
        <UploadModule />
      </div>
    </div>
  )
}

export default LoginPage
