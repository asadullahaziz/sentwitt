import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom'
import styles from '../ForgotPassword/forgot.css';
import img1 from '../../images/sentwintt.png'

export default function forgot() {
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
                <div className='text-center'><h3 className='text-color'>You can <span className='font-color'>reset</span> your password here.</h3></div>
                <div className="input-group emailgroup">
                    <div className="input-group-prepend">
                        <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                    </div>
                    <input type="email" name='email' className='form-control form-control-email' placeholder="Example@gmail.com" required/>
                </div>
                <span><Link to="/CodePage">
                    <button type="submit" className="btn next-btn">
                    <p className='download-text'>Next</p>
                    </button></Link></span>
            </div>
        </div>
    )
}
