import React, { useState } from 'react';
import styles from './textAnalysis.css';
import Sidebar from '../Sidebar/Sidebar';
import { GoSearch } from 'react-icons/go';
import axios from 'axios';

export default function TextAnalysis() {
    const [result, setResult] = useState();

    async function sentiment() {
        try {
            const text = document.getElementById("analysisText").value;
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
                    <h1 className='text-color history-font-size'><span className='font-color'>Sentiment</span> Analysis</h1>
                </div>
                <div className='text-center'><h2 className='text-color'>Input <span className='font-color' >Text</span> To Perform Sentiment Analysis</h2></div>
                <div className='form-outline search-con'>
                    <input id="analysisText" type="search" name='query' className="form-control querySearch" placeholder="Ex: You are using Sentwitt" aria-label="Search" />
                    <button onClick={sentiment} type="button" className="btn search-query-button">
                        Show Result
                    </button>
                </div>
                <div className='textSentiment'>{result == 0 ? <span className='negative'>Negative 🔴</span> : result == 1 ? <span className='netural'>Netural 🟡</span> : result == 2 ? <span className='positive'>Positive 🟢</span> : <span style={{color: "white"}}>Write text above</span> }</div>
            </div>
        </div>
    )
}
