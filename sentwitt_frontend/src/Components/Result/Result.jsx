import React, { useEffect, useState } from 'react'
import styles from "../Result/Result.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom'
import { HiOutlineDownload } from 'react-icons/hi'
import { Table } from '@mui/material';
import axios from 'axios';


export default function Result(props) {

    const { id } = useParams();
    const [analysis, setAnalysis] = useState({
        analysis: {},
        tweets: []
    });

    async function fetchTweets() {
        try {
            const response = await axios.get("http://localhost:4000/analysis/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                }
            });
            console.log(response.data);
            setAnalysis(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    function printDate(d) {
        const date = new Date(d);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    return (
        <div className='result_main-container'>
            <Sidebar />
            <div className='result'>
                <div className='text-center analysis-history'>
                    <h1 className='text-color history-font-size'><span className='font-color'>Analysis</span> Result Page</h1>
                </div>

                <div className='result-container'>
                    <div className='input-group'>
                        <div className='result-display'>
                            <label className='search-query'> Search Query: </label>
                            <span className='search-query-display'>{analysis.analysis.queryType + analysis.analysis.query}</span>
                            <label className='limit'>Limit</label>
                            <span className='search-query-display'>{analysis.analysis.limit}</span>
                        </div>
                        <br></br>
                    </div>
                    <div className='date-display'>
                        <label className='tweet-range'>Start/End Date: </label>
                        <span className='date-range-display'>{analysis.analysis.startDate}</span>
                        <label className='dash'>-</label>
                        <span className='date-range-display'>{analysis.analysis.endDate}</span>
                    </div>
                    <div className='Time-display'>
                        <label className='tweet-range'>Date/Time: </label>
                        <span className='Time-date-display'> 13 MAY 2020, 11:40pm</span>
                        <span><Link to="/">
                            <button type="button" className="btn downlaod">
                                <HiOutlineDownload size={20} className="download-icon" /> <p className='download-text'>Download Result</p>
                            </button></Link></span>
                    </div>
                    <div className='table-container'>
                        <Table className='table table-result-record' size="sm">
                            <thead>
                                <tr className='table-result-bar'>
                                    <td style={{ width: 130 }}># SR NO</td>
                                    <td>TWEET</td>
                                    <td style={{ width: 150 }}>USERNAME</td>
                                    <td style={{ width: 150 }}>DATE</td>
                                    <td style={{ width: 150 }}>RESULT</td>
                                </tr>
                            </thead>
                            <tbody className='record-container'>
                                {analysis.tweets.map((tweet, i) =>
                                    <tr key={tweet._id}>
                                        <td>{i + 1}</td>
                                        <td>{tweet.tweetContent}</td>
                                        <td>{tweet.tweetUserName}</td>
                                        <td>{printDate(tweet.tweetDate)}</td>
                                        <td><div>{tweet.sentiment == 0 ? <span className='negative'>Negative</span> : tweet.sentiment == 1 ? <span className='netural'>Netural</span> : <span className='positive'>Positive</span> }</div></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
