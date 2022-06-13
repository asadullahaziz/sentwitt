import React from 'react'
import styles from '../Code/code.css'
import img1 from '../../images/sentwintt.png'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'

export default function resetpassword() {
  return (
    <div className='email-container'>

    <div className='text-center analysis-history'>
        <h1 className='text-color history-font-size'><span className='font-color'>Reset </span> Password</h1>
    </div>

    <div className="card  emailbox">
        <div className='span_Register'>
            <img className='image_Register' src={img1} alt="Logo" />
            <h2 className=' font-color '>Sentwitt</h2>

        </div>
        <div className='text-center'><h3 className='text-color'>Forgot your <span className='font-color'>password?</span> Let's get you a new one</h3></div>
        <form>
            <div className="input-group codegroup">
                <div className="input-group-prepend">
                    <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                </div>
                <input type="password" name='email' className='form-control form-control-code' placeholder="Enter New Password" required />
            </div>
            <div className='codegroup input-group'>
                <div className="input-group-prepend">
                    <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                </div>
                <input type="password" name='password' className='form-control form-control-code'  placeholder="Enter Confirm Password" maxLength={5} />
            </div>
            <span><Link to="/">
                <button type="submit" className="btn reset-btn">
                    <p className='download-text'>Reset</p>
                </button></Link></span>
        </form>

    </div>
</div>
  )
}
