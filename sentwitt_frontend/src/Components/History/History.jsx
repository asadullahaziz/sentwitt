import React from 'react'
import styles from "../History/history.css";
import Sidebar from '../Sidebar/Sidebar.jsx';
import { BiFilter } from 'react-icons/bi'
import { GoSearch } from 'react-icons/go'
import { BsPlusCircle } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { Table } from '@mui/material';

export default function History(props) {


  const record = [
    {
      sr: 1,
      Query: "T20 CRICKET WORLD CUP",
      Limit: 100,
      Date: "19/12/2021",
      Time: "12:30 PM"
    },
    {
      sr: 2,
      Query: "CRICKET WORLD CUP",
      Limit: 250,
      Date: "17/12/2021",
      Time: "12:45 AM"
    },
    {
      sr: 3,
      Query: "WORLD CUP",
      Limit: 1000,
      Date: "11/12/2021",
      Time: "11:30 PM"
    },
    {
      sr: 4,
      Query: "DAVID WARNER",
      Limit: 100000,
      Date: "21/12/2021",
      Time: "10:30 AM"
    },
  ];

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
            <div class="form-outline bar-style">
              <input type="search" id="form1" class="form-control History-bar" placeholder='Search' />
            </div>
            <button type="button" class="btn history-btn">
              <GoSearch />
            </button>
            <Link to="/HomePage">
              <button type="button" class="btn add-sentiment">
                <BsPlusCircle size={20} className="add-icon" /> <p className='button-text'>New Sentiment Analysis</p>
              </button></Link>
          </div>
          <div className='table-container'>
            <Table className='table table-record' size="sm">
              <thead>
                <tr className='table-bar'>
                  <td># SR NO</td>
                  <td>QUERY</td>
                  <td>LIMIT</td>
                  <td>DATE</td>
                  <td>TIME</td>
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
                    <td><Link to="/HomePage"> <button type="button" class="btn view-detail">VIew Detail</button></Link></td>
                    <td><button type='button' className='btn delete-button'><RiDeleteBin6Fill className='delete-icon' /></button></td>
                    <td><button type='button' className='btn refresh-button'><HiOutlineRefresh className='refresh-icon' /></button></td>
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
