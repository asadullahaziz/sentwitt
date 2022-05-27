import { React, useState, useEffect } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'
// import { DateRangePicker } from 'react-date-range';
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  query: '',
  limit: ''
}

export default function Home() {
  const navigate = useNavigate();
  const [invalidUsernameOrPassword, setInvalidUsernameOrPassword] = useState(false);

  const [queryForm, setQueryForm] = useState({
    searchQuery: "",
    limit: null
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [showFiled, setshowFiled] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(true);

  const pattern = /[a-zA-Z0-9]/;

  const onQueryEnter = (e) => {
    setButtonDisable(true);
    // console.log(e.target.value);
    // if (e.which == 32) return;
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
    event.preventDefault();

    let querytype;
    if (showFiled == 1) {
      querytype = "#"
    }
    else if (showFiled == 2) {
      querytype = "@"
    }
    else if (showFiled == 3) {
      querytype = ""
    }

    axios.post("http://localhost:4000/analysis", {
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
        console.log(res.body);
        // localStorage.setItem('auth_token', res.data.token);
        navigate('/ResultPage/'+res.data.analysis._id);
      } else {
        // setInvalidUsernameOrPassword(true);
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        // setInvalidUsernameOrPassword(true);
      }
    })
  }

  const searchBarKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  }

  return (

    <div className='conatiner_homepage'>
      <Sidebar />

      <div className="home">
        <div className='span_Register mt-4'>
          <img className='image_Register ' src={img1} alt="Logo" />
          <h1 className=' font-color'>Sentwitt</h1>
        </div>
        <div className='text-center'>
          <h2 className='text-color'>Perform <span className='font-color'>Sentiment Analysis</span>  on Twitter</h2>
        </div>
        {/* {invalidUsernameOrPassword && <div>Please provide all required fields correctly</div>} */}

        <div className='container-box'>
          {showFiled == "1" &&

            <div>
              <div className='box'>
                <button className="btn hash_ttnn hash-style" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
                {/* Search Bar*/}
                <input type="search" name='query' id="form1" className="form-control search-bar" maxLength={30} placeholder="Ex: CricketWorldCup" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
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
                  <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable} > Submit </button>
                </h5>
              </div>
            </div>}

          {showFiled == "2" && <div>
            <div className='box'><button className="btn at-bttn at-style" onClick={() => { setshowFiled(2) }}><i className="fa fa-at a_ttn"></i></button>
              <input type="search" id="form1" className="form-control search-bar" name='query' maxLength={30} placeholder="Ex: iamamirliaquatHussain" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
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
              <button className="btn hash_ttnn" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
            </div>
            <div>
              <button className="btn a_ttnn" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
              {/* Limit and Submit */}
              <h5 className='text-limit'>Limit :
                <input type="number" min="0" max="3600" className='limitistyle' name="Limit" placeholder='1-3600' onChange={onLimitChanged} />
                <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable}> Submit </button>
              </h5>
            </div>
          </div>}

          {showFiled == "3" && <div>
            <div className='box'>
              <button className="btn a_ttnn search_style" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
              <input type="search" id="form1" className="form-control search-bar" name='query' maxLength={30} placeholder="Ex: Sentwitt" onChange={onQueryEnter} onKeyDown={searchBarKeyDown} aria-label="Search" />
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
                <button onClick={QueryButtonClicked} type='submit' className='submit-tweet' disabled={buttonDisable}> Submit </button>
              </h5>
            </div>
          </div>}
        </div>
      </div>
    </div >
  )
}
