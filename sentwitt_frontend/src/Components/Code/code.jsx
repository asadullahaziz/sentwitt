import React from 'react'
import styles from '../Code/code.css'
import img1 from '../../images/sentwintt.png'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'

export default function code() {
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
                <form>
                    <div className="input-group codegroup">
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                        </div>
                        <input type="email" name='email' className='form-control form-control-code' placeholder="Example@gmail.com" required />
                    </div>
                    <div className='codegroup input-group'>
                        <div className="input-group-prepend">
                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                        </div>
                        <input type="number" name='password' className='form-control form-control-code'  placeholder="Enter code" maxLength={5} />
                    </div>
                    <span><Link to="/ResetPasswordPage">
                        <button type="submit" className="btn reset-btn">
                            <p className='download-text'>Submit</p>
                        </button></Link></span>
                </form>

            </div>
        </div>
    )
}
