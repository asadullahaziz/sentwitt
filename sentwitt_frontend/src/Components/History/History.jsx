import React, { useEffect, useState } from 'react'
import styles from "../History/history.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BiFilter } from 'react-icons/bi'
import { GoSearch } from 'react-icons/go'
import { BsPlusCircle } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BrowserRouter as Router, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Table } from '@mui/material';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";




export default function History(props) {

  const [allAnalysis, setAllAnalysis] = useState([]);
  const [allFilteredAnalysis, setAllFilteredAnalysis] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function fetchAllUserAnalysis() {
    try {
      let response = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + "analysis", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });

      setAllAnalysis(response.data);
      setAllFilteredAnalysis(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllUserAnalysis();
  }, []);

  async function deleteAnalysis(e) {
    const analysisId = e.target.getAttribute("data-analysis-id");
    let allAnalysisCopy = allAnalysis;
    let allFilteredAnalysisCopy = allFilteredAnalysis;
    try {
      let response = await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + `analysis/${analysisId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      if (response) {
        let newAllAnalysis = allAnalysisCopy.filter(analysis => analysis._id !== analysisId);
        setAllAnalysis(newAllAnalysis);
        let newAllFilteredAnalysis = allFilteredAnalysisCopy.filter(analysis => analysis._id !== analysisId);
        setAllFilteredAnalysis(newAllFilteredAnalysis);
      }
    } catch (env) {
      console.log(e);
    }
  }

  async function updateAnalysis(e) {
    const analysisId = e.target.getAttribute("data-analysis-id");
    try {
      setLoading(true);
      let response = await axios.patch(process.env.REACT_APP_BACKEND_ADDRESS + `analysis/${analysisId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      if (response) {
        setLoading(false);
        navigate("/ResultPage/" + analysisId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function filter(e) {
    let search = e.target.value;
    let newAllAnalysis = allAnalysis;

    let newAllFilteredAnalysis = newAllAnalysis.filter((analysis) => {
      return analysis.query.toLowerCase().includes(search.toLowerCase())
    });
    setAllFilteredAnalysis(newAllFilteredAnalysis);
  }

  function printDate(d) {
    const date = new Date(d);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
  function printTime(t) {
    const date = new Date(t);
    return date.getHours() + ":" + date.getMinutes();
  }

  const homeContainerClass = loading ? 'conatiner_homepage is_loading' : "conatiner_homepage";

  return (
    <React.Fragment>
      <div className='loader-container'>
        <BeatLoader loading={loading} color="#F9994C" size={30} />
      </div>
      <div className={homeContainerClass + ' history_main-container'}>
        <Sidebar />
        <div className='history'>
          <div className='text-center analysis-history'>
            <h1 className='text-color history-font-size'><span className='font-color'>Analysis</span>  History</h1>
          </div>

          <div className='history-container'>
            <div className='input-group'>
              <BiFilter className='history-filter-icon' size={40} />
              <div className="form-outline bar-style">
                <input type="search" id="form1" className="form-control History-bar" placeholder='Search' onChange={filter} />
              </div>
              <button type="button" className="btn history-btn">
                <GoSearch />
              </button>
              <Link to="/HomePage">
                <button type="button" className="btn add-sentiment">
                  <BsPlusCircle size={20} className="add-icon" /> <p className='button-text'>New Sentiment Analysis</p>
                </button></Link>
            </div>
            <div className='table-container'>


              <Table className='table table-record ' size="sm" >
                <thead>
                  <tr className='table-bar '>
                    <td># SR NO</td>
                    <td>QUERY</td>
                    <td>LIMIT</td>
                    <td>DATE</td>
                    <td>TIME</td>
                  </tr>
                </thead>
                <tbody className='record-container'>
                  {allFilteredAnalysis.map((analysis, i) =>
                    <tr key={analysis._id}>
                      <td>{i + 1}</td>
                      <td>{analysis.queryType + analysis.query}</td>
                      <td>{analysis.limit}</td>
                      <td>{printDate(analysis.updatedAt)}</td>
                      <td>{printTime(analysis.updatedAt)}</td>
                      <td><Link to={`/ResultPage/${analysis._id}`}> <button type="button" className="btn view-detail">View Detail</button></Link></td>
                      <td><button data-analysis-id={analysis._id} type='button' className='btn delete-button' onClick={deleteAnalysis}><RiDeleteBin6Fill className='delete-icon' /></button></td>
                      <td><button data-analysis-id={analysis._id} type='button' className='btn refresh-button' onClick={updateAnalysis}><HiOutlineRefresh className='refresh-icon' /></button></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
