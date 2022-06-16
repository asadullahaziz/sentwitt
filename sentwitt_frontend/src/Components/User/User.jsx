import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from "../User/User.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import axios from 'axios';

export default function User() {

  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNo: ""
  });

  async function fetchUser() {
    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + "user", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
        phoneNo: response.data.phoneNo ? response.data.phoneNo : ""
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateUser(e) {
    e.preventDefault();
    let userObj = {};
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNo = document.getElementById("phoneNo").value;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;

    try {
      if (name) {
        userObj.name = name;
      }
      else {
        throw new Error("User Name must be provided");
      }
      if (email) {
        userObj.email = email;
      }
      else {
        throw new Error("User Name must be provided");
      }
      if (phoneNo) {
        userObj.phoneNo = phoneNo;
      }
      if (password) {
        if (password.length < 8 || password !== repeatPassword) {
          throw new Error("Password must match and must be greater than 8");
        }
        userObj.password = password;
      }

      const response = await axios.patch(process.env.REACT_APP_BACKEND_ADDRESS + "user", userObj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        }
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
        phoneNo: response.data.phoneNo ? response.data.phoneNo : ""
      });
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='user_main-container'>
      <Sidebar />
      <div className='user'>
        <div className='text-center analysis-history'>
          <h1 className='text-color history-font-size'><span className='font-color'>Profile</span>  Setting</h1>
        </div>
        <div className="container user-container rounded  mt-5 mb-5">
          <div className="row">
            <div className="col-md-5 border-right font-weight-bold mt-2">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
              </div>

            </div>
            <div className="col-md-7 ">
              <form className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">

                </div>
                <div className="row mt-2 edit-profile">
                  <div className="col-md-12">
                    <label className="labels">Name</label>
                    <input id="name" type="text" name='name' className="form-control" placeholder="Enter Your Name" defaultValue={user.name} />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Email ID</label>
                    <input id="email" type="email" className="form-control" placeholder="emailaddress@gmail.com" defaultValue={user.email} />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Mobile Number</label>
                    <input id="phoneNo" type="number" name='phoneNo' className="form-control" placeholder="Enter Phone Number" defaultValue={user.phoneNo} />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">New Password</label>
                    <input id="password" type="Password" name='password' className="form-control" placeholder="Enter New Password" />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Confirm New Password</label>
                    <input id="repeatPassword" type="password" name='repeatPassword' className="form-control" placeholder="Confirm New Password" />
                  </div>
                </div>
                {error && <div className='errors'>{error}</div>}
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" type="submit" onClick={updateUser}>Save Profile</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
