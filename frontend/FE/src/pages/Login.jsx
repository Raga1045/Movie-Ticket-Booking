function Login(){
    return(

       <div className="page">
         <div className='main'>

             <div className="signUp" > Sign Up</div>

            <div className="input">
                <input className="username" placeholder="Enter username" type="text"></input>
            </div>

            <div className='input'>
                <input className="email" placeholder="Enter email" type="email"></input>
            </div>

            <div className='input'>
                <input className="password" placeholder="Enter password" type="password"></input>
            </div>
            
            <div className="btn">
                <button className="getStarted">get started</button>  
           </div>

        </div>
       </div>

    );
};

export default Login;