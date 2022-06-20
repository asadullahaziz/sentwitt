import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Login/Login.css";
import img1 from '../../images/sentwintt.png';
import img2 from '../../images/loginImage.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup.string().required('No password provided!')
})



export default function Login() {
    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState(false);
    const [invalidUsernameOrPassword, setInvalidUsernameOrPassword] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('auth_token')){
            navigate("/HomePage");
        }
    });

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
                const loginButtonClicked = (event) => {
                    event.preventDefault();
                    
                    axios.post(process.env.REACT_APP_BACKEND_ADDRESS + "login", {
                        email: formik.values.email,
                        password: formik.values.password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        if (res.status === 201) {
                            localStorage.setItem('auth_token', res.data.token);
                            navigate('/HomePage');
                        } else {
                            setInvalidUsernameOrPassword(true);
                        }
                    }).catch((error) => {
                        console.log(error);
                        if (error.response.status === 400) {
                            setInvalidUsernameOrPassword(true);
                        }
                    })
                }

                return (
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-md-6 col-sm-6 col-lg-6 ">
                                <img className="image_Register_login" src={img2} alt="Login Image" />

                            </div>

                            <div className='login-container col-md-6 col-sm-6 col-lg-6'>


                                <div className="card  register-container_login ">
                                    <div className='span_Register'>
                                        <img className='image_Register' src={img1} alt="Logo" />
                                        <h2 className=' font-color '>Sentwitt</h2>

                                    </div>
                                    <div className='text-center'><h3 className='text-color'>Sentiment <span className='font-color'>Analysis</span>  on Twitter</h3></div>

                                    <h2 className='font-color'>Login</h2>
                                    {invalidUsernameOrPassword && <div className='errors'>Invalid username or password</div>}
                                    <Form className="register-form" id="register-form">

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text" id='input-name'><i className="zmdi zmdi-email zmdi-hc-2x "></i></div>
                                            </div>
                                            <Field type="email" name='email' className='form-control form-control-login' placeholder="Example@gmail.com" />

                                        </div>
                                        <div className="errors"><ErrorMessage name='email' /></div>

                                        <div className='form-group input-group'>
                                            <div className="input-group-prepend">
                                                <div className="input-group-text" id='input-name'><i class="zmdi zmdi-key zmdi-hc-2x"></i></div>
                                            </div>
                                            <Field type={passwordShown ? "text" : "password"} name='password' className='form-control form-control-login' placeholder="Password" id="id_password" />
                                            <i class={`zmdi ${passwordShown ? "zmdi-eye-off" : "zmdi-eye"}`} onClick={togglePassword}></i>

                                        </div>
                                        <div className="errors"><ErrorMessage name='password' /></div>

                                        <div className='forgot'>
                                            <Link to="VarifyEmailPage/ResetPasswordPage">&nbsp;Forgot Password?</Link>
                                        </div>
                                        <button onClick={loginButtonClicked} type='submit' className='form-control form-control-login btn-style' disabled={!formik.isValid}> Login </button>
                                        <div className='sep'>
                                            <span className='or'>OR</span>
                                        </div>
                                        <div class=" signin">

                                            <p className="form-group text-center signin-link">
                                                Don't have an account?

                                                <Link to="VarifyEmailPage/RegisterPage" className='font-color'>&nbsp;Register</Link></p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            }
        </Formik>

    )
}
