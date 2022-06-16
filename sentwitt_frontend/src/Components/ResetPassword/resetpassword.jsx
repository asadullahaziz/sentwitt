import React, { useState } from 'react'
import styles from './resetpassword.css'
import img1 from '../../images/sentwintt.png'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'
import { isEmail } from 'validator';
import axios from 'axios';

export default function Resetpassword() {
    let [error, setError] = useState("");
    let navigate = useNavigate();
    
    async function resetPassword(e) {
        e.preventDefault();
        const email = document.getElementById("RPEmail").value;
        const code = document.getElementById("RPCode").value;
        const password = document.getElementById("RPPassword").value;
        const repeatPassword = document.getElementById("RPRepeatPassword").value;
        try {
            if(!isEmail(email)){
                throw new Error("Invalid Email");
            }
            if(!code){
                throw new Error("Enter OTP code. we have sent to your Email");
            }
            if (password.length < 8 || password !== repeatPassword) {
                throw new Error("Password must match and must be greater than 8");
            }
            
            let response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "resetPassword", {email, code, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200) {
                navigate("/");
            }
            else {
                throw new Error("Invalid code entered");
            }
        } catch (e) {
            setError(e.message);
        }
    }
    
    return (
        <div className='email-container'>

            <div className='text-center analysis-history'>
                <h1 className='text-color history-font-size'><span className='font-color'>Reset </span> Password</h1>
            </div>

            <div className="card  email-box">
                <div className='span_Register'>
                    <img className='image_Register' src={img1} alt="Logo" />
                    <h2 className=' font-color '>Sentwitt</h2>

                </div>
                <div className='text-center'><h3 className='text-color'>Enter <span className='font-color'>Code</span> which we have sent to the email you entered</h3></div>
                <form>
                    <div className="input-group codegroup">
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                        </div>
                        <input id="RPEmail" type="email" name='email' className='form-control form-control-code' placeholder="Example@gmail.com" required />
                    </div>
                    <div className='codegroup input-group'>
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                        </div>
                        <input id="RPCode" type="number" name='password' className='form-control form-control-code' placeholder="Enter code" maxLength={5} />
                    </div>
                    <div className="input-group codegroup">
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                        </div>
                        <input id="RPPassword" type="password" name='email' className='form-control form-control-code' placeholder="Enter New Password" required />
                    </div>
                    <div className='codegroup input-group'>
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                        </div>
                        <input id="RPRepeatPassword" type="password" name='password' className='form-control form-control-code' placeholder="Enter Confirm Password" required/>
                    </div>
                    {error && <div className='errors'>{error}</div>}
                    <button type="submit" className="btn reset-btn" onClick={resetPassword}>
                        <p className='download-text'>Reset</p>
                    </button>
                </form>

            </div>
        </div>
    )
}
