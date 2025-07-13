import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AdminIcon from './assets/Admin.png';

function Login(){
    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();

    const handleLogin=()=>{
        if(user==="staff@clinic.com"&&password==="12345"){
            setUser('');
            setPassword('');
            navigate('/appointments')
            console.log("Login")
        }else{
            alert("Invalid credentials")
        }
    }

    return(
        <>
        <div className="screen-bg"></div>
        <div className="blur-overlay"></div>
        <div className="gradient-bg d-flex flex-column justify-content-center align-items-center vh-100">
            <form className="form-gradient text-center"style={{width:"340px"}}>
                <img src={AdminIcon} className="mb-3" style={{width:"75px",height:"75px"}}/>
                <div className="input-group mb-3 rounded-pill">
                    <span className="input-group-text">
                    <i className="bi bi-person"></i>
                    </span>
                    <input className="form-control" 
                    type="email" 
                    placeholder="staff@clinic.com" 
                    style={{maxWidth:"300px"}}
                    value={user}
                    onChange={(e)=>setUser(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                    <i className="bi bi-key"></i>
                    </span>
                    <input className="form-control" 
                    type="password" 
                    placeholder="12345"
                    style={{maxWidth:"300px"}}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="login-button" type="button" style={{width:"100%",maxWidth:"300px"}} onClick={handleLogin}>Login</button>
            </form>
        </div>

        </>
    )
}
export default Login