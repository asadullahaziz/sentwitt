import { React, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from "../Home/Home.css";
import img1 from '../../images/sentwintt.png'
import { FaHashtag } from 'react-icons/fa'
import { FiFilter } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'

// import { DateRangePicker } from 'react-date-range';
import "react-datepicker/dist/react-datepicker.css";
export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  

  

  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [showFiled, setshowFiled] = useState(1);

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

        <div className='container-box'>
          {showFiled == "1" &&

            <div>
              <div className='box'>
                <button className="btn hash_ttnn hash-style" onClick={() => { setshowFiled(1) }}><FaHashtag className='a_ttn' /></button>
                <input type="search" id="form1" className="form-control search-bar" placeholder="Ex: Cricket World Cup" aria-label="Search" />
                <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)}>
                  <FiFilter className='filter-icon' />
                </button>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                  style={{ overlay: { backgroundColor: 'transparent' } }}>
                  <div className='modal-container'>
                  <label className='text-label'>
                    To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
                    From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date:Date) => setendDate(date)}/> 
                  </label>
                  
                    <div>
                      <button className='Save-btn' onClick={() => setModelIsOpen(false)}>Save</button>
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
                <h5 className='text-limit'>Limit :
                  <input type="number" min="0" className='limitistyle' name="Limit" placeholder='100' />
                  <button type='submit' className='submit-tweet'> Submit </button>
                </h5>
              </div>
            </div>}

          {showFiled == "2" && <div>
            <div className='box'><button className="btn at-bttn at-style" onClick={() => { setshowFiled(2) }}><i className="fa fa-at a_ttn"></i></button>
              <input type="search" id="form1" className="form-control search-bar" placeholder="Ex: iamamirliaquatHussain" aria-label="Search" />
              <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)}>
                  <FiFilter className='filter-icon' />
                </button>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                  style={{ overlay: { backgroundColor: 'transparent' } }}>
                  <div className='modal-container'>
                  <label className='text-label'>
                    To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
                    From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date:Date) => setendDate(date)}/> 
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
              <h5 className='text-limit'>Limit :
                <input type="number" min="0" className='limitistyle' name="Limit" placeholder='100' />
                <button type='submit' className='submit-tweet'> Submit </button>
              </h5>
            </div>
          </div>}

          {showFiled == "3" && <div>
            <div className='box'>
              <button className="btn a_ttnn search_style" onClick={() => { setshowFiled(3) }}><GoSearch /></button>
              <input type="search" id="form1" className="form-control search-bar" placeholder="Ex: You are using Sentwitt" aria-label="Search" />
              <button type='button' className='btn filter-button' onClick={() => setModelIsOpen(true)}>
                  <FiFilter className='filter-icon' />
                </button>

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="HomeModal"
                  style={{ overlay: { backgroundColor: 'transparent' } }}>
                  <div className='modal-container'>
                  <label className='text-label'>
                    To: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
                    From: <DatePicker calendarClassName='calendar-style' className='datepicker' Format='DD/MM/YYYY' selected={endDate} onChange={(date:Date) => setendDate(date)}/> 
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
              <h5 className='text-limit'> Limit :
                <input type="number " min="0" className='limitistyle' name="Limit" placeholder='100' />
                <button type='submit' className='submit-tweet'> Submit </button>
              </h5>
            </div>
          </div>}
        </div>
      </div>
    </div >
  )
}
