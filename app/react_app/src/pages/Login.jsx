import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../assets/style.css'

import { Button, Form } from 'react-bootstrap'

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
                if (res.data.user)
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
                    setError('something went wrong please try again.')
                }
            })
    }

    return (
        <div className='d-flex'>
            <div className='main col-12'>
                <h3>Log In</h3>
                {error && <div className='alert alert-danger'>{error}</div>}
                <Form>
                    <Form.Group controlId="SignupForm.EmailInput">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus />
                    </Form.Group>
                    <Form.Group controlId="SignupForm.PasswordInput">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <a className='pull-right' href='reset-password'>
                            Forgot password?
                        </a>
                    </Form.Group>
                    <Button
                        className='btn btn btn-primary btn-block mb-2'
                        onClick={(e) => login(e)} >
                        Log In
                    </Button>
                    <span className='pull-right mt-2'>
                        <h6>
                            <small>
                                Don't have an account? <a href='/signup'>Signup</a>
                            </small>
                        </h6>
                    </span>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
