import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../assets/style.css'

const LoginPage = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    axios.defaults.withCredentials = true
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    useEffect(() => {
        axios
            .get('/api/user/isauthenticated/')
            .then(res => {
                if(res.data.user)
                    history.push('/')
            })
    }, [])

    const login = (e) => {
        e.preventDefault()
        axios
            .post('/api/user/login/', {
                email: email,
                password: password,
            })
            .then(res => {
                history.push('/')
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data)
                }
            })
    }

    return (
        <div className='d-flex'>
            <div className='main col-12'>
                <h3>Log In</h3>
                {error && <div className='alert alert-danger'>{error}</div>}
                <div role='form'>
                    <div className='form-group'>
                        <label htmlFor='inputUsernameEmail'>Email</label>
                        <input
                            type='text'
                            className='form-control'
                            id='inputUsernameEmail'
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='inputPassword'>Password</label>
                        <input
                            type='password'
                            className='form-control mb-2'
                            id='inputPassword'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a className='pull-right' href='reset-password'>
                            Forgot password?
            </a>
                    </div>
                    <button
                        className='btn btn btn-primary btn-block mb-2'
                        onClick={(e) => login(e)}
                    >
                        Log In
          </button>
                    <span className='pull-right mt-2'>
                        <h6>
                            <small>
                                Don't have an account? <a href='/signup'>Signup</a>
                            </small>
                        </h6>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
