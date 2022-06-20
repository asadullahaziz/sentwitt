import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from "../Home/Home.css";
import img1 from '../../images/sentwintt.png'
import { FaHashtag } from 'react-icons/fa'
import { FiFilter } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  query: '',
  limit: ''
}

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [queryForm, setQueryForm] = useState({
    searchQuery: "",
    limit: null
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [showFiled, setshowFiled] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(true);

  const onQueryEnter = (e) => {
    setButtonDisable(true);
    setQueryForm({
      searchQuery: e.target.value.replace(/\s/g, ''),
      limit: queryForm.limit
    });
    if (e.target.value !== "" && Number(queryForm.limit) >= 1 && Number(queryForm.limit) <= 3600) {
      setButtonDisable(false);
    }
  }

  const onLimitChanged = (e) => {
    setButtonDisable(true);
    setQueryForm({
      searchQuery: queryForm.searchQuery,
      limit: e.target.value
    });

    if (queryForm.searchQuery !== "" && Number(e.target.value) >= 1 && Number(e.target.value) <= 3600) {
      setButtonDisable(false);
    }
  }

  const QueryButtonClicked = (event) => {
    setLoading(true);
    event.preventDefault();

    let querytype;
    if (showFiled == 1) {
      querytype = "#";
    }
    else if (showFiled == 2) {
      querytype = "@";
    }
    else if (showFiled == 3) {
      querytype = " ";
    }

    axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "analysis", {
      queryType: querytype,
      query: queryForm.searchQuery,
      limit: queryForm.limit
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('auth_token')
      }
    }).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        navigate('/ResultPage/' + res.data.analysis._id);
      }
      else {
        throw new Error("Faced errors while performing analysis");
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const searchBarKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  }

  const homeContainerClass = loading ? 'conatiner_homepage is_loading' : "conatiner_homepage";

  return (
    <React.Fragment>
      <div className='loader-container'>
        <BeatLoader loading={loading} color="#F9994C" size={30} />
      </div>
      <div className={homeContainerClass} >
        <Sidebar />
        <div className="home">
          <div className='span_Register mt-4'>
            <img className='image_Register ' src={img1} alt="Logo" />
            <h1 className=' font-color'>Sentwitt</h1>
          </div>
          <div className='text-center'>
            <h2 className='text-color'>Perform <span className='font-color'>Sentiment Analysis</span>  on Twitter</h2>
          </div>


          <div className='container-box'>
            {showFiled == "1" &&

              <div className='search-container'>
                <div className='box'>
                  <button className="btn hash_ttnn hash-style" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
                  {/* Search Bar*/}
                  <input type="search" name='query' id="form1" disabled={loading} className="form-control search-bar" maxLength={30} placeholder="Ex: CricketWorldCup" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
                  <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)}>
                    <FiFilter className='filter-icon' />
                  </button>

                  <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                    style={{ overlay: { backgroundColor: 'transparent' } }}>
                    <div className='modal-container'>
                      <label className='text-label'>
                        To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date) => setStartDate(date)} />
                        From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date) => setendDate(date)} />
                      </label>

                      <div>
                        <button type="submit" className='Save-btn' onClick={() => setModelIsOpen(false)}>Save</button>
                        <button className='close-btn' onClick={() => setModelIsOpen(false)}>Close</button>
                      </div>
                    </div>
                  </Modal>
                </div>

                <div>
                  <button className="btn " onClick={() => { setshowFiled(2) }}><i className="fa fa-at a_ttn"></i></button>
                </div>
                <div>
                  <button className="btn a_ttnn" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
                  {/* Limit and Submit */}
                  <h5 className='text-limit'>Limit :
                    <input name="limit" type="number" min="0" max="3600" className='limitistyle' onChange={onLimitChanged} placeholder='1-3600' />
                    <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable || loading} > Submit </button>
                  </h5>
                </div>
              </div>}

            {showFiled == "2" && <div className='search-container'>
              <div className='box'><button className="btn at-bttn at-style" onClick={() => { setshowFiled(2) }}><i className="fa fa-at a_ttn"></i></button>
                <input type="search" id="form1" className="form-control search-bar" name='query' maxLength={30} disabled={loading} placeholder="Ex: iamamirliaquatHussain" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
                <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)} disabled={loading} >
                  <FiFilter className='filter-icon' />
                </button>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                  style={{ overlay: { backgroundColor: 'transparent' } }}>
                  <div className='modal-container'>
                    <label className='text-label'>
                      To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date) => setStartDate(date)} />
                      From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date) => setendDate(date)} />
                    </label>

                    <div>
                      <button className='Save-btn' onClick={() => setModelIsOpen(false)}>Save</button>
                      <button className='close-btn' onClick={() => setModelIsOpen(false)}>Close</button>
                    </div>
                  </div>
                </Modal>
              </div>
              <div>
                <button className="btn hash_ttnn" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
              </div>
              <div>
                <button className="btn a_ttnn" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
                {/* Limit and Submit */}
                <h5 className='text-limit'>Limit :
                  <input type="number" min="0" max="3600" className='limitistyle' name="Limit" placeholder='1-3600' onChange={onLimitChanged} />
                  <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable || loading}> Submit </button>
                </h5>
              </div>
            </div>}

            {showFiled == "3" && <div className='search-container'>
              <div className='box'>
                <button className="btn a_ttnn search_style" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
                <input type="search" id="form1" className="form-control search-bar" name='query' disabled={loading} maxLength={30} placeholder="Ex: Sentwitt" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
                <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)}>
                  <FiFilter className='filter-icon' />
                </button>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                  style={{ overlay: { backgroundColor: 'transparent' } }}>
                  <div className='modal-container'>
                    <label className='text-label'>
                      To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date) => setStartDate(date)} />
                      From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date) => setendDate(date)} />
                    </label>

                    <div>
                      <button className='Save-btn' onClick={() => setModelIsOpen(false)}>Save</button>
                      <button className='close-btn' onClick={() => setModelIsOpen(false)}>Close</button>
                    </div>
                  </div>
                </Modal>
              </div>
              <div>
                <button className="btn" onClick={() => { setshowFiled(2) }}><i className="fa fa-at a_ttn"></i></button>
              </div>
              <div>
                <button className="btn hash_ttnn" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
                {/* Limit and Submit */}
                <h5 className='text-limit'> Limit :
                  <input type="number " min="0" max="3600" className='limitistyle' name="Limit" placeholder='1-3600' onChange={onLimitChanged} />
                  <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable || loading}> Submit </button>
                </h5>
              </div>
            </div>}
          </div>
        </div>

      </div ></React.Fragment>

  )
}
