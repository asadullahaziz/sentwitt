import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styles from "../Sidebar/Sidebar.css";
import { BrowserRouter as Router, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaRegListAlt } from 'react-icons/fa'
import { FaPowerOff } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegFileImage } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import img1 from '../../images/sentwintt.png'
import axios from 'axios';


const routes = [
  {
    path: "/UserPage",
    name: "Profile",
    icon: <FaUserCircle size="30px" />,
  },

  {
    path: "/HomePage",
    name: "Analysis",
    icon: <FaPlus size="30px" />,
  },

  {
    path: "/HistoryPage",
    name: "History",
    icon: <FaRegListAlt size="30px" />,
  },

  {
    path: "/TextAnalysisPage",
    name: "Text",
    icon: <FaPencilAlt size="30px" />,
  },

  {
    path: "/UploadImgPage",
    name: "Image",
    icon: <FaRegFileImage size="30px" />,
  },

  // {
  //   path: "/",
  //   name: "Log Out",
  //   icon: <FaPowerOff size="30px" />,
  // }

];


export default function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: 'auto',
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  async function logout() {
    try {
      let response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "logout", {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      if (response.status === 200) {
        localStorage.removeItem("auth_token");
        navigate("/");
      }
      else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <motion.div animate={{
        width: isOpen ? "200px" : "75px", transition: {
          duration: 0.5,
          type1: "spring",
          damping: 11,
        }
      }} className="sidebar">

        <div className='top_section'>
          {isOpen && (<motion.h1 initial="hidden"
            variants={showAnimation}
            animate="show"
            exit="hidden"
            className='logo'>Sentwitt</motion.h1>)}
          <div className='bars'>
            <FaBars onClick={toggle} size="30px" />
          </div>
        </div>
        <section className='routes'>
          {
            routes.map((route) => (
              <NavLink activeClassName="active"
                to={route.path}
                key={route.name}
                className='link'>
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (<motion.div variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className='link_text' >{route.name}</motion.div>)}
                </AnimatePresence>
              </NavLink>
            ))
          }
          <NavLink activeClassName="active" onClick={logout}
              to="/"
              key="Log Out"
              className='link'>
              <div className="icon"><FaPowerOff size="30px" /></div>
              <AnimatePresence>
                {isOpen && (<motion.div variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className='link_text' >Log Out</motion.div>)}
              </AnimatePresence>
            </NavLink>
          {/* <button className='active' onClick={logout}>
            <div className="icon"><FaPowerOff size="30px" /></div>
            <AnimatePresence>
              {isOpen && (<motion.div variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className='link_text' >Log Out</motion.div>)}
            </AnimatePresence>
          </button> */}
        </section>
      </motion.div>
    </React.Fragment>
  )
};
