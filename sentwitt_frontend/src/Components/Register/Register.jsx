import React, { useState } from 'react'
import axios from 'axios';
import GoogleLogin from 'react-google-login'
import styles from "../Register/Register.css";
import img1 from '../../images/sentwintt.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'


const initialValues = {
    name: '',
    email: '',
    password: '',
    Repeat_password: ''
}

const onSubmit = values => {
    // console.log('form data', values)
}


const validationSchema = yup.object({
    name: yup.string().required('Required!').min(2, 'Too Short!').max(20, 'Too Long!'),
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup.string().required('No password provided!').min(8, 'Password is too short (8 chars minimum)!').matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),
    Repeat_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required!')
})



export default function Register() {
    const navigate = useNavigate();
    const [invalidUsernameOrPassword, setInvalidUsernameOrPassword] = useState(false);

    const [modalIsOpen, setModelIsOpen] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };


    const [isTermsAccepted, setIsTermAccepted] = useState(false);

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    )

    const handleFailure = (result) => {
        alert(result);
    };

    const handleLogin = async (googleData) => {
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
    };

    const handleLogout = (googleData) => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    }

    return (


        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            onFailure={() => console.log("validation failed")}
        >
            {formik => {

                // console.log(formik);
                const SignupButtonClicked = (event) => {
                    event.preventDefault();

                    console.log(formik.values);
                    axios.post("http://localhost:4000/user", {
                        name: formik.values.name,
                        email: formik.values.email,
                        password: formik.values.password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        console.log(res);
                        if (res.status === 201) {
                            localStorage.setItem('auth_token', res.data.token);
                            navigate('/HomePage');
                        } else {
                            setInvalidUsernameOrPassword(true);
                        }
                    }).catch((error) => {
                        console.log(error);
                        if (error.response.status === 500) {
                            setInvalidUsernameOrPassword(true);
                        }
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
                                {invalidUsernameOrPassword && <div className='errors'>Please provide all required fields correctly</div>}
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


                                    <div className="text-center p-1 mt-4 ">
                                        <input type="checkbox" onClick={() => setIsTermAccepted(!isTermsAccepted)} />
                                        <label htmlFor="checkbox" className='form-group p-3' > I read and agree to <a href="#"
                                            className='font-color' onClick={() => setModelIsOpen(true)} >Terms & Conditions</a> </label>
                                        <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)} className="ServiceModal"
                                            style={{ overlay: { backgroundColor: 'transparent' } }}>
                                            <div className='modal-container'>
                                                <div className='term-service'><h2>Terms of Service</h2></div>
                                                <div>
                                                    <button className='btn' onClick={() => setModelIsOpen(false)}>Close</button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>

                                    <button onClick={SignupButtonClicked} type='submit' className='form-control  form-control-Register btn-style' disabled={!formik.isValid || !isTermsAccepted}> sign up </button>
                                    <div className='sep'>
                                        <span className='or'>OR</span>
                                    </div>
                                    <div>
                                        {
                                            loginData ? (
                                                <div>
                                                    <h3>You logged in as {loginData.email}</h3>
                                                    <button onClick={handleLogout}>Logout</button>
                                                </div>
                                            ) : (
                                                <GoogleLogin className='mystyle' clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                    buttonText="Sign up with Google" onSuccess={handleLogin} onFailure={handleFailure}
                                                    cookiePolicy={'single_host_origin'}>

                                                </GoogleLogin>
                                            )}

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