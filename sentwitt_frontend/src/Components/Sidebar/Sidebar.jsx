import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styles from "../Sidebar/Sidebar.css";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
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


const routes = [
  {
    path: "/UserPage",
    name: "User",
    icon: <FaUserCircle size="30px" />,
  },

  {
    path: "/HomePage",
    name: "Home",
    icon: <FaPlus size="30px" />,
  },

  {
    path: "/HistoryPage",
    name: "History",
    icon: <FaRegListAlt size="30px" />,
  },

  {
    path: "/SearchPage",
    name: "Query",
    icon: <FaPencilAlt size="30px" />,
  },

  {
    path: "/UploadimgPage",
    name: "Image",
    icon: <FaRegFileImage size="30px" />,
  },

  {
    path: "/",
    name: "Power Off",
    icon: <FaPowerOff size="30px" />,
  },

];


export default function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
          {/* <div className='span_Register'><img className='image_sidebar' src={img1} alt="Logo" /></div>
          <div className='top_section'>
            {isOpen && <motion.div className='span_Register'><img className='image_sidebar' src={img1} alt="Logo" />
              <motion.h1 initial="hidden"
                variants={showAnimation}
                animate="show"
                exit="hidden"
                className='logo'>Sentwitt</motion.h1></motion.div>
            } */}
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
          </section>
      </motion.div>
    </React.Fragment>
  )
};
