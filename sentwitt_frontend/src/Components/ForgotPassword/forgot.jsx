import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import styles from '../ForgotPassword/forgot.css';
import img1 from '../../images/sentwintt.png'
import axios from 'axios';
import { isEmail } from 'validator';

export default function Forgot() {
    const navigate = useNavigate();
    let [error, setError] = useState("");
    async function forgotPassword(e) {
        e.preventDefault();
        let email = document.getElementById("forgotPasswordEmail").value;

        try {
            if (!isEmail(email)) {
                throw new Error("Invalid Email entered");
            }
            let response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "forgotPassword", { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (response.status === 200) {
                navigate('/ResetPasswordPage');
            }
            else {
                throw new Error("Invalid Email entered");
            }
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className='email-container'>

            <div className='text-center analysis-history'>
                <h1 className='text-color history-font-size'><span className='font-color'>Forgot </span> Password?</h1>
            </div>

            <div className="card  emailbox">
                <div className='span_Register'>
                    <img className='image_Register' src={img1} alt="Logo" />
                    <h2 className=' font-color '>Sentwitt</h2>
                </div>
                <div className='text-center'><h3 className='text-color'>Enter your <span className='font-color'>Email</span> address here</h3></div>
                <div className="input-group emailgroup">
                    <div className="input-group-prepend">
                        <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                    </div>
                    <input id="forgotPasswordEmail" type="email" name='email' className='form-control form-control-email' placeholder="Example@gmail.com" required />
                </div>
                {error && <div className='errors'>{error}</div>}
                <button type="submit" className="btn next-btn" onClick={forgotPassword}>
                    <p className='download-text'>Next</p>
                </button>
            </div>
        </div>
    )
}
