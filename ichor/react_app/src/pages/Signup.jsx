import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Button, Form } from 'react-bootstrap'

const SignupPage = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [secContact, setSecContact] = useState('')
    const [dob, setDob] = useState(new Date().toISOString())

    const [error, setError] = useState('')
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        axios
            .get('/api/user/isauthenticated/')
            .then(res => {
                if (res.data.user)
                    history.push('/')
            })
    }, [])

    const createUser = (e) => {
        e.preventDefault()
        if (password === confPassword) {
            axios
                .post('/api/user/signup/', {
                    email: email,
                    password: password,
                })
                .then(res => {
                    axios
                        .post('/api/user/login/', {
                            email: email,
                            password: password,
                        })
                        .then(res => {
                            setPhase(1)
                        })
                })
                .catch((err) => {
                    if (err.response) {
                        setError('something went wrong please try again')
                        console.log(err.response)
                    }
                })
        }
        else {
            setError("Passwords doesn't match")
        }
    }

    const createProfile = (e) => {
        e.preventDefault()
        let profileError = 0
        let errorText = ''
        if (gender == 'Select') {
            errorText = 'Please select a gender.'
            profileError = 1
        }
        if (bloodGroup == 'Select') {
            errorText = 'Please select a blood group.'
            profileError = 1
        }
        if (location == 'Select') {
            errorText = 'Please select a location.'
            profileError = 1
        }
        if (profileError === 0) {
            axios
                .patch('/api/profile/edit/', {
                    name: name,
                    gender: gender,
                    blood_group: bloodGroup,
                    district: location,
                    dob: dob,
                    contact_number: contact,
                    secondary_contact: secContact
                })
                .then(history.push('/'))
                .catch((err) => {
                    if (err.response) {
                        setError('something went wrong please try again!')
                        console.log(err.response)
                    }
                })
        }
        else {
            setError(errorText)
        }
    }

    return (
        <div className='d-flex'>
            <div className='main col-12'>
                <h3>Signup</h3>
                {error && <div className='alert alert-danger'>{error}</div>}
                {phase === 0 &&
                    <React.Fragment>
                        <Form>
                            <Form.Group controlId="SignupForm.EmailInput">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus />
                            </Form.Group>
                            <Form.Group controlId="SignupForm.PasswordInput">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="SignupForm.ConfPasswordInput">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setConfPassword(e.target.value)} />
                            </Form.Group>
                            <button
                                className='btn btn btn-primary btn-block mb-2'
                                onClick={(e) => createUser(e)}
                            >
                                Next
                            </button>
                        </Form>
                        <span className='pull-right mt-2'>
                            <h6>
                                <small>
                                    Already have an account? <a href='/login'>Login</a>
                                </small>
                            </h6>
                        </span>
                    </React.Fragment>
                }
                {phase === 1 &&
                    <Form>
                        <Form.Group controlId="SignupForm.NameInput">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                autoFocus />
                        </Form.Group>
                        <Form.Group controlId="SignupForm.GenderSelect">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" onChange={(e) => setGender(e.target.value)}>
                                <option>Select</option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>Others</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="SignupForm.BloodGroupSelect">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control as="select" onChange={(e) => setBloodGroup(e.target.value)}>
                                <option>Select</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Signup.LocationSelect">
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="select" onChange={(e) => setLocation(e.target.value)}>
                                <option>Select</option>
                                <option>TVM</option>
                                <option>KLM</option>
                                <option>PTM</option>
                                <option>ALP</option>
                                <option>KTM</option>
                                <option>IDK</option>
                                <option>EKM</option>
                                <option>TSR</option>
                                <option>MLP</option>
                                <option>WYD</option>
                                <option>KZD</option>
                                <option>KNR</option>
                                <option>KSD</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="SignupForm.DobSelect">
                            <Form.Label>DOB</Form.Label>
                            <Form.Control type="date"
                                placeholder="Date of Birth"
                                onChange={(e) => setDob(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="SignupForm.ContactInput">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setContact(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="SignupForm.SecContactInput">
                            <Form.Label>Secondary Contact</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSecContact(e.target.value)} />
                        </Form.Group>
                        <Button
                            className='btn btn-primary btn-block mb-2'
                            type='submit'
                            onClick={(e) => createProfile(e)} >
                            Sign Up
                        </Button>
                    </Form>
                }
            </div>
        </div>
    )
}

export default SignupPage
