import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from "../User/User.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

const initialValues = {
  password: '',
  Repeat_password: ''
}

const validationSchema = yup.object({
  password: yup.string().min(8, 'Password is too short (8 chars minimum)!').matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),
  Repeat_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match')
})

export default function User() {

  return( 
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={onSubmit}
            onFailure={() => console.log("validation failed")}
        >
        {formik => {

        console.log(formik);
        return (
          <div className='user_main-container'>
            <Sidebar />
            <div className='user'>
              <div className='text-center analysis-history'>
                <h1 className='text-color history-font-size'><span className='font-color'>Profile</span>  Setting</h1>
              </div>
              <div class="container user-container rounded  mt-5 mb-5">
                <div className="row">
                  <div className="col-md-5 border-right font-weight-bold mt-2">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                      <span className="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span>
                      <span className="text-black-50">03324568745</span><span> </span></div>
      
                  </div>
                  <div className="col-md-7 ">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
      
                      </div>
                      <div className="row mt-2 edit-profile">
                        <div className="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Enter Your Name" /></div>
                        <div className="col-md-12 mt-2"><label class="labels">Email ID</label><input type="email" class="form-control" placeholder="emailaddress@gmail.com" /></div>
                        <div className="col-md-12 mt-2"><label class="labels">Mobile Number</label><input type="number" class="form-control" placeholder="Enter Phone Number" /></div>
                        
                          
                            <Form className='formvalue'>
                              <div className="col-md-12 mt-2"><label class="labels">New Password</label><Field type="Password" name='password' className="form-control" placeholder="Enter New Password" /></div>
                              <div className="error-msg"><ErrorMessage name='password' /></div>
                              <div className="col-md-12 mt-2"><label class="labels">Confirm New Password</label><Field type="password" name='Repeat_password' className="form-control" placeholder="Confirm New Password" /></div>
                              <div className="error-msg"><ErrorMessage name='Repeat_password' /></div>
                            </Form>
                          
                          
                      </div>
      
      
      
                      <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
      
        )

        }}

        </Formik>
  )

 
}
