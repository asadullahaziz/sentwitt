import React, { useState } from 'react'
import styles from '../UploadImage/uploadimg.css';
import Sidebar from '../Sidebar/Sidebar';
import img1 from '../../images/sentwintt.png'
import Tesseract from 'tesseract.js';
import axios from 'axios';

export default function UploadImg() {
    const [img, setImg] = useState();
    const [result, setResult] = useState();

    async function ocr() {
        try {
            let result = await Tesseract.recognize(img, 'eng', {
                logger: (m) => {
                    console.log(m);
                    // if (m.status === 'recognizing text') {

                    // }
                }
            });

            const text = result.data.text;
            let response = await axios.post("http://127.0.0.1:8000/sentimentAnalysis", { text: text }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) setResult(response.data.sentiment);
            else throw new Error("Something Went Wrong :(");
        } catch (e) {
            console.log(e);
        }
    }
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
                        <input type="File" className='form-control form-control-email' onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))} />
                    </div>
                    <span>
                        <button type="submit" className="btn next-btn" onClick={ocr}>
                            <p className='download-text'>Show Result</p>
                        </button></span>
                <div className='imageSentiment'>{result == 0 ? <span className='negative'>Negative 🔴</span> : result == 1 ? <span className='netural'>Netural 🟡</span> : result == 2 ? <span className='positive'>Positive 🟢</span> : <span style={{ color: "white" }}>Result</span>}</div>
                </div>
            </div>
        </div>
    )
}
