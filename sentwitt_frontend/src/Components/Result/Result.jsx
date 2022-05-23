import React from 'react'
import styles from "../Result/Result.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { HiOutlineDownload } from 'react-icons/hi'
import { Table } from '@mui/material';

export default function Result(props) {
    const record = [
        {
            sr: 1,
            Query: "T20 CRICKET WORLD CUP afwegfasdgfeg we gwegwe erwgw egw egw erg wegwe gweg weg esbetbh tenetnme rh me ryme trh gm ery hm ethmrthmrgt hmrgtmrthm g hm rt yhmrt ym rty m",
            Limit: "@Waleed",
            Date: "19/12/2021",
            Time: "Netural"
        },
        {
            sr: 2,
            Query: "CRICKET WORLD CUP wrgwrg ewrg er ge rg er ge rgh er ghe her h er hg erh er h erh er h er her h er h er her h er h",
            Limit: "@Ali Rehman",
            Date: "17/12/2021",
            Time: "Postive"
        },
        {
            sr: 3,
            Query: "WORLD CUP er herh erh er her h df h edt nje gn et gn de rg tn dernmtr ynm ty m tr ym",
            Limit: "@Salman TRariq",
            Date: "11/12/2021",
            Time: "Negative"
        },
        {
            sr: 4,
            Query: "DAVID WARNER rtnhrt njh er tnjer mntje trnmer gnmet hym t nty nme fgh dmr y je rty jwr gt njery nj er n j",
            Limit: "@ASadullah",
            Date: "21/12/2021",
            Time: "Negative"
        },
    ];
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
                            <span className='search-query-display'> #ImranKhan</span>
                            <label className='limit'>Limit</label>
                            <span className='search-query-display'> 1000</span>
                        </div>
                        <br></br>
                    </div>
                    <div className='date-display'>
                        <label className='tweet-range'>Start/End Date: </label>
                        <span className='date-range-display'> 13 MAY 2020</span>
                        <label className='dash'>-</label>
                        <span className='date-range-display'>23 MAY 2021</span>
                    </div>
                    <div className='Time-display'>
                        <label className='tweet-range'>Date/Time: </label>
                        <span className='Time-date-display'> 13 MAY 2020, 11:40pm</span>
                        <span><Link to="/">
                            <button type="button" class="btn downlaod">
                                <HiOutlineDownload size={20} className="download-icon" /> <p className='download-text'>Download Result</p>
                            </button></Link></span>
                    </div>
                    <div className='table-container'>
                        <Table className='table table-result-record' size="sm">
                            <thead>
                                <tr className='table-result-bar'>
                                    <td style={{ width: 100 }}># SR NO</td>
                                    <td>TWEET</td>
                                    <td style={{ width: 150 }}>USERNAME</td>
                                    <td style={{ width: 150 }}>DATE</td>
                                    <td style={{ width: 150 }}>RESULT</td>
                                </tr>
                            </thead>
                            <tbody className='record-container'>
                                {record.map((r) =>
                                    <tr>
                                        <td>{r.sr}</td>
                                        <td>{r.Query}</td>
                                        <td>{r.Limit}</td>
                                        <td>{r.Date} </td>
                                        <td>{r.Time}</td>
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
