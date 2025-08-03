import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function SignUp(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup',{
                method : 'POST',
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify({ name: username, email, password })
            });
            const data = await res.json();
            console.log(data);
            navigate('/');
        }
        catch(err){
            console.error(err);
        }
    };

const handleGoogleSignup = async (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Decoded Google User:", decoded);

        const res = await fetch('http://localhost:5000/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: decoded.name,
                email: decoded.email,
                googleId: decoded.sub,
            }),
        });

        const data = await res.json();
        console.log(data);
        navigate('/');
    }
    catch(err){
        console.error('Google signup error:',err);
    }

};

    return(

       <div className="page">
         <div className='main'>

             <div className="signUp" > Sign Up</div>

            <div className="input">
                <input className="username" placeholder="Enter username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='input'>
                <input className="email" placeholder="Enter email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className='input'>
                <input className="password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div style={{ marginTop: '20px' }}>
          <GoogleLogin onSuccess={handleGoogleSignup} onError={() => console.log('Login Failed')} width='310' />
        </div>

            <div className="btn">
                <button className="getStarted" onClick={handleSignUp}>get started</button>  
           </div>
            <p style={{color : '#eeeeee'}}>Already have an account? <a style = {{color: '#00adb5'}}href="/login">Log In</a></p>
            
        </div>
       </div>

    );
};

export default SignUp;