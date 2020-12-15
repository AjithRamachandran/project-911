import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Button, Modal, Form } from 'react-bootstrap'

const ProfileModal = (props) => {

  const [profile, setProfile] = useState({})
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')
  const [secContact, setSecContact] = useState('')
  const [error, setError] = useState('')
  const [dob, setDob] = useState(null)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    axios
      .get('/api/profile/')
      .then(res => {
        setProfile(res.data)
        setName(profile.name)
        setGender(profile.gender)
        setBloodGroup(profile.blood_group)
        setDob(profile.dob)
        setLocation(profile.district)
        setContact(profile.contact_number)
        setSecContact(profile.secondary_contact)
      })
  }

  const editProfile = (e) => {
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

    let data = new Object();
    if (name !== undefined && name !== profile.name) {
      data.name = name
      console.log(data)
    }
    if (gender !== undefined && gender !== profile.gender) {
      data.gender = gender
    }
    if (bloodGroup !== undefined && bloodGroup !== profile.blood_group) {
      data.blood_group = bloodGroup
    }
    if (location !== undefined && location !== profile.district) {
      data.district = location
    }
    if (dob !== undefined && dob !== profile.dob) {
      data.dob = dob
    }
    if (contact !== undefined && contact !== profile.contact_number) {
      data.contact_number = contact
    }
    if (secContact !== undefined && secContact !== profile.secondary_contact) {
      data.secondary_contact = secContact
    }

    if (profileError === 0) {
      axios
        .patch('/api/profile/edit/', data)
        .then(getProfile())
        .catch((err) => {
          if (err.response) {
            setError('something went wrong please try again.')
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
      {error && <div className='alert alert-danger'>{error}</div>}
          <Form>
            <Form.Group controlId="ProfileEditForm.NameInput">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={profile.name}
                onChange={(e) => setName(e.target.value)}
                autoFocus />
            </Form.Group>
            <Form.Group controlId="ProfileEditForm.GenderSelect">
              <Form.Label>Gender</Form.Label>
              <Form.Control defaultValue={profile.gender} as="select" onChange={(e) => setGender(e.target.value)}>
                <option>Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="ProfileEditForm.BloodGroupSelect">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control as="select" defaultValue={profile.blood_group} onChange={(e) => setBloodGroup(e.target.value)}>
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
            <Form.Group controlId="ProfileEditForm.LocationSelect">
              <Form.Label>Location</Form.Label>
              <Form.Control as="select" defaultValue={profile.district} onChange={(e) => setLocation(e.target.value)}>
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
            <Form.Group controlId="ProfileEditForm.DobSelect">
              <Form.Label>DOB</Form.Label>
              <Form.Control 
                type="date"
                placeholder="Date of Birth"
                defaultValue={profile.dob}
                onChange={(e) => setDob(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="ProfileEditForm.ContactInput">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile.contact_number}
                onChange={(e) => setContact(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="ProfileEditForm.SecContactInput">
              <Form.Label>Secondary Contact</Form.Label>
              <Form.Control
                type="text"
                defaultValue={profile.secondary_contact}
                onChange={(e) => setSecContact(e.target.value)} />
            </Form.Group>
            <Button
              className='btn btn-primary btn-block mb-2'
              type='submit'
              onClick={(e) => editProfile(e)} >
              Save
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
