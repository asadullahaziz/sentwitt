import React, { useEffect, useState } from 'react'
import styles from "../History/history.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BiFilter } from 'react-icons/bi'
import { GoSearch } from 'react-icons/go'
import { BsPlusCircle } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { Table } from '@mui/material';
import axios from 'axios';




export default function History(props) {

  //   $(document).ready( function () {
  //     $('#table_id').DataTable();
  // } );

  const [allAnalysis, setAllAnalysis] = useState([]);

  async function fetchAllUserAnalysis() {
    try {
      let response = await axios.get("http://localhost:4000/analysis", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });

      setAllAnalysis(response.data);

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
    try {
      let response = await axios.delete(`http://localhost:4000/analysis/${analysisId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      if (response) {
        let newAllAnalysis = allAnalysisCopy.filter(analysis => analysis._id != analysisId);
        setAllAnalysis(newAllAnalysis);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageClick = async (data) => {
    console.log(data.selected);

    // let currentPage = data.selected + 1;

    // const commentsFormServer = await fetchComments(currentPage);

    // setItems(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (

    <div className='history_main-container'>
      <Sidebar />
      <div className='history'>
        <div className='text-center analysis-history'>
          <h1 className='text-color history-font-size'><span className='font-color'>Analysis</span>  History</h1>
        </div>

        <div className='history-container'>
          <div className='input-group'>
            <BiFilter className='history-filter-icon' size={40} />
            <div className="form-outline bar-style">
              <input type="search" id="form1" className="form-control History-bar" placeholder='Search' />
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
                {allAnalysis.map((analysis, i) =>
                  <tr key={analysis._id}>
                    <td>{i + 1}</td>
                    <td>{analysis.query}</td>
                    <td>{analysis.limit}</td>
                    <td>{"Date"} </td>
                    <td>{"Time"}</td>
                    <td><Link to={`/ResultPage/${analysis._id}`}> <button type="button" className="btn view-detail">View Detail</button></Link></td>
                    <td><button data-analysis-id={analysis._id} type='button' className='btn delete-button' onClick={deleteAnalysis}><RiDeleteBin6Fill className='delete-icon' /></button></td>
                    <td><button data-analysis-id={analysis._id} type='button' className='btn refresh-button'><HiOutlineRefresh className='refresh-icon' /></button></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* <ReactPaginate 
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={25}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          /> */}
        </div>
      </div>
    </div>
  )
}
