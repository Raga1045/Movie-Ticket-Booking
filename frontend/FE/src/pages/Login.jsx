import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';





function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify({email, password})
            });

            const data = await res.json();
            console.log(data);

            if(res.ok){
                localStorage.setItem('token', data.token);
                alert('Login succesfull!');

                navigate('/');
            }else {
                alert(data.message || 'Login failed');
            }
        }
        catch(err){
            console.error(err);
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Google user:', decoded);

        const res = await fetch('http://localhost:5000/api/auth/google',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({  //JSON.stringify() is a JavaScript method that converts a JavaScript object or value into a JSON string.
                name: decoded.name,
                email: decoded.email,
                googleId: decoded.sub
            }),
        });

        const data = await res.json();

        if(res.ok){
            localStorage.setItem('token', data.token);
            alert('Google login successful!');
            navigate('/');
        }
        else {
            alert(data.message || 'Google login failed');
        }
    }
    catch(err){
        console.error('Google login error',err);
    }
}


    return (
        <div className="page">
            <div className='main'>

                <div className="signUp"> Login </div>

                <div className="input">
                    <input className="email" placeholder="Enter email" type="email" value ={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='input'>
                    <input className="password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div style={{marginTop: '15px', marginBottom: '0px'}}>
                     <GoogleLogin onSuccess={handleGoogleSuccess}  onError={() => console.log('Login Failed')} width="310"/>
                </div>

                <div className="btn" >
                    <button className="getStarted" style={{width : '180px'}}  onClick={handleLogin}>Log In</button>  
                </div>
               
                <p style={{color : '#eeeeee'}}>Don't have an account? <a style={{color:'#00adb5'}}href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
}

export default Login;
