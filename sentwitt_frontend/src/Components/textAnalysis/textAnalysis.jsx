import React from 'react';
import styles from './textAnalysis.css';
import Sidebar from '../Sidebar/Sidebar';
import { GoSearch } from 'react-icons/go';

export default function search() {
    return (
        <div className='user_main-container'>
            <Sidebar />
            <div className='user'>
                <div className='text-center analysis-history'>
                    <h1 className='text-color history-font-size'><span className='font-color'>Search</span>  Query</h1>
                </div>
                <div className='text-center'><h2 className='text-color'>Input <span className='font-color' >Text</span> To Perform Sentiment Analysis</h2></div>
                <div className='form-outline search-con'>
                    <input type="search" name='query' className="form-control querySearch" placeholder="Ex: You are using Sentwitt" aria-label="Search" />
                    <button type="button" className="btn search-query-button">
                        Show Result
                    </button>
                </div>
            </div>
        </div>
    )
}
