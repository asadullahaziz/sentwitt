import React, { useEffect, useState } from 'react'
import styles from "../Result/Result.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom'
import { HiOutlineDownload } from 'react-icons/hi'
import { Table } from '@mui/material';
import axios from 'axios';
import fileDownload from 'js-file-download';
import DoughnutChart from "../DoughnutChart/DoughnutChart.component";


export default function Result(props) {

    const { id } = useParams();
    const [analysis, setAnalysis] = useState({
        analysis: {},
        tweets: []
    });
    const [graphData, setGraphData] = useState({
        positive: 0,
        negative: 0,
        neutral: 0
    });

    async function fetchTweets() {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + "analysis/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                }
            });
            setAnalysis(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, []);
    
    useEffect(() => {
        generateGraph();
    }, [analysis]);

    function printDate(d) {
        const date = new Date(d);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    async function downloadResult(e) {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + "download/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                }
            });
            fileDownload(response.data, "analysis_result.csv");
        } catch (e) {
            console.log(e);
        }
    }
    
    function generateGraph() {
        let negative = 0;
        let positive = 0;
        let neutral = 0;
        let tweets = analysis.tweets;
        tweets.forEach(tweet => {
            if(tweet.sentiment === 0) negative++;
            else if(tweet.sentiment === 1) neutral++;
            else if(tweet.sentiment === 2) positive++;
        });
        let total = negative + positive + neutral;
        negative = (negative / total) * 100;
        positive = (positive / total) * 100;
        neutral = (neutral / total) * 100;
        setGraphData({ positive, negative, neutral });
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

                        <button type="button" className="btn downlaod" onClick={downloadResult}>
                            <HiOutlineDownload size={20} className="download-icon" /> <p className='download-text'>Download Result</p>
                        </button>
                    </div>
                    {/* Implement charts here */}
                    <div className='graphs charts'>
                        <div style={{width: "33%"}}>
                            <DoughnutChart type={"Negative"} primary={graphData.negative} other={100 - graphData.negative} color={"#c91414"} />
                        </div>
                        <div style={{width: "33%"}}>
                            <DoughnutChart type={"Neutral"} primary={graphData.neutral} other={100 - graphData.neutral} color={"#c9bd14"} />
                        </div>
                        <div style={{width: "33%"}}>
                            <DoughnutChart type={"Positive"} primary={graphData.positive} other={100 - graphData.positive} color={"#3EA346"} />
                        </div>
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
                                        <td><div>{tweet.sentiment == 0 ? <span className='negative'>Negative</span> : tweet.sentiment == 1 ? <span className='netural'>Netural</span> : <span className='positive'>Positive</span>}</div></td>
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
