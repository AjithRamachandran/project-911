import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Button, Modal, Form } from 'react-bootstrap'

const ProfileModal = (props) => {

  const [profile, setProfile] = useState({})

  useEffect(() => {
    axios
      .get('/api/profile/')
      .then(res => {
        console.log(res.data);
        // setProfile(res.data)
      })
  }, [])

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group controlId="SignupForm.NameInput">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={profile.name}
                onChange={(e) => setName(e.target.value)}
                autoFocus />
            </Form.Group>
            <Form.Group controlId="SignupForm.GenderSelect">
              <Form.Label>Gender</Form.Label>
              <Form.Control value={profile.gender} as="select" onChange={(e) => setGender(e.target.value)}>
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
              Submit
                        </Button>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
