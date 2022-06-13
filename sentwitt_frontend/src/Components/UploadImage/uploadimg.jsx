import React from 'react'
import styles from '../UploadImage/uploadimg.css';
import Sidebar from '../Sidebar/Sidebar';
import img1 from '../../images/sentwintt.png'

export default function uploadimg() {
    return (
        <div className='user_main-container'>
            <Sidebar />
            <div className='user'>
                <div className='text-center analysis-history'>
                    <h1 className='text-color history-font-size'><span className='font-color'>Upload</span>  Image</h1>
                </div>
                <div className="card  emailbox">
                <div className='span_Register'>
                    <img className='image_Register' src={img1} alt="Logo" />
                    <h2 className=' font-color '>Sentwitt</h2>
                </div>
                <div className='text-center'><h3 className='text-color'>Uplaod an <span className='font-color'>Image</span> to perform sentiment analysis</h3></div>
                <div className="input-group emailgroup">
                    <div className="input-group-prepend">
                        <div className="input-group-text" id='input-name'></div>
                    </div>
                    <input type="File" className='form-control form-control-email'/>
                </div>
                <span>
                    <button type="submit" className="btn next-btn">
                    <p className='download-text'>Show Result</p>
                    </button></span>
            </div>
            </div>
        </div>
    )
}
