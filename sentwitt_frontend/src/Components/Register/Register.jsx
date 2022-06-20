import React, { useState } from 'react'
import axios from 'axios';
import styles from "../Register/Register.css";
import img1 from '../../images/sentwintt.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'


const initialValues = {
    name: '',
    email: '',
    password: '',
    Repeat_password: '',
    code: ''
}

const validationSchema = yup.object({
    name: yup.string().required('Required!').min(2, 'Too Short!').max(20, 'Too Long!'),
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup.string().required('No password provided!').min(8, 'Password is too short (8 chars minimum)!').matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),
    Repeat_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required!'),
    code: yup.string().required('Required!').min(4, 'invalid code!').max(4, 'invalid code!')
})



export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onFailure={() => console.log("validation failed")}
        >
            {formik => {

                const SignupButtonClicked = (event) => {
                    event.preventDefault();
                    axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "user", {
                        name: formik.values.name,
                        email: formik.values.email,
                        password: formik.values.password,
                        code: formik.values.code
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        if (res.status === 201) {
                            localStorage.setItem('auth_token', res.data.token);
                            navigate('/HomePage');
                        } else {
                            throw new Error("Invalid code entered");
                        }
                    }).catch((e) => {
                        console.log(e);
                        if(e.response.data.includes("duplicate")) setError("Email already registered!")
                        else setError(e.response.data);
                    })
                }
                return (

                    <div className="container-fluid">

                        <div className=' col-sm-4 col-xs-12' >
                            <div className='card register-container'>
                                <div className='span_Register'>
                                    <img className='image_Register' src={img1} alt="Logo" />
                                    <h2 className=' font-color '>Sentwitt</h2>
                                </div>
                                <h2 className='font-color'>Sign up</h2>
                                {error && <div className='errors'>{error}</div>}
                                <Form className="register-form" id="register-form">

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id='input-name'><i className="zmdi zmdi-account zmdi-hc-2x p-1 "></i></div>
                                        </div>
                                        <Field type="text" name='name' className='form-control form-control-Register' placeholder="Enter Your Name" />
                                    </div>
                                    <div className="errors"><ErrorMessage name='name' /></div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                                        </div>
                                        <Field type="email" name='email' className='form-control form-control-Register' placeholder="Example@gmail.com" />
                                    </div>
                                    <div className="errors"><ErrorMessage name='email' /></div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id='input-code'><i className="zmdi zmdi-account zmdi-hc-2x p-1 "></i></div>
                                        </div>
                                        <Field type="number" name='code' className='form-control form-control-Register' placeholder="Enter code which we Emailed you" />
                                    </div>
                                    <div className="errors"><ErrorMessage name='code' /></div>

                                    <div className='form-group input-group'>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                                        </div>
                                        <Field type={passwordShown ? "text" : "password"} name='password' className='form-control form-control-Register' placeholder="Password" id="id_password" />
                                        <i class={`zmdi ${passwordShown ? "zmdi-eye-off" : "zmdi-eye"}`} onClick={togglePassword}></i>
                                    </div>
                                    <div className="errors"><ErrorMessage name='password' /></div>

                                    <div className='form-group input-group '>
                                        <div class="input-group-prepend">
                                            <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                                        </div>
                                        <Field type={passwordShown ? "text" : "password"} name='Repeat_password' className='form-control form-control-Register' placeholder="Repeat Password" required />
                                        <i class={`zmdi ${passwordShown ? "zmdi-eye-off" : "zmdi-eye"}`} onClick={togglePassword}></i>
                                    </div>
                                    <div className="errors"><ErrorMessage name='Repeat_password' /></div>

                                    <button onClick={SignupButtonClicked} type='submit' className='form-control  form-control-Register btn-style' disabled={!formik.isValid}> sign up </button>
                                    <div className='sep'>
                                        <span className='or'>OR</span>
                                    </div>

                                    <div class="signin">
                                        <p className="form-group text-center signin-link">
                                            Already have an account?
                                            <Link to="/" className='font-color'>&nbsp;Signin</Link></p>
                                    </div>
                                </Form>

                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}