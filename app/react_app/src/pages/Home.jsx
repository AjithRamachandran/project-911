import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Nav, Navbar, Row, Col, Tab, Button, Card, Form, Dropdown } from 'react-bootstrap'

import ProfileModal from '../components/profileModal.jsx'

const homePage = ({ history }) => {

    const [user, setUser] = useState(0)
    const [modalShow, setModalShow] = useState(false);
    const [bb, setBb] = useState([])
    const [profiles, setProfiles] = useState([])
    const [bloodGroup, setBloodGroup] = useState('')
    const [name, setName] = useState('')
    const [profileDistrict, setProfileDistrict] = useState('')
    const [bbDistrict, setBbDistrict] = useState('')

    useEffect(() => {
        axios
            .get('/api/user/isauthenticated/')
            .then(res => {
                if (res.data.user)
                    setUser(1)
            })

        axios
            .get('/api/bb/')
            .then(res => setBb(res.data))

        axios
            .get('/api/profile/all/')
            .then(res => setProfiles(res.data))
    }, [])

    const logout = (e) => {
        e.preventDefault()
        axios
            .post('/api/user/logout/')
    }

    const filterProfileResult = (e) => {
        e.preventDefault()
        console.log(bloodGroup);
        console.log(profileDistrict);
        axios
            .get('/api/profile/all/', {
                params: {
                    bg: bloodGroup,
                    district: profileDistrict
                }
            })
            .then(res => { console.log(res.data); setProfiles(res.data) })
    }

    const filterBbResult = (e) => {
        e.preventDefault()
        axios
            .get('/api/bb/', {
                params: {
                    name: name,
                    district: bbDistrict
                }
            })
            .then(res => { console.log(res.data); setBb(res.data) })
    }

    return (
        <div className='bg-secondary'>
            <Navbar bg="dark" className="justify-content-between" variant="dark">
                <Navbar.Brand>Ichor</Navbar.Brand>
                {user === 1 &&
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Profile
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Button variant="link" onClick={() => setModalShow(true)}>
                                    Edit profile
                        </Button>
                                <ProfileModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)} />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button variant="link" onClick={(e) => logout(e)}>Logout</Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
                {user === 0 &&
                    <div>
                        <Button variant="primary" className='mx-2' onClick={() => history.push('login/')}>Login</Button>
                        <Button variant="primary" onClick={() => history.push('signup/')}>Signup</Button>
                    </div>
                }
            </Navbar>
            <Tab.Container id="left-tabs-example" defaultActiveKey="home">
                <Row className="pt-2">
                    <Col className='text-dark position-sticky min-vh-100 text-center font-weight-bold border-right' sm={2}>
                        <Nav className="flex-column">
                            <Nav.Item className="">
                                <Nav.Link eventKey="home" className="border-bottom py-2 text-white">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="">
                                <Nav.Link eventKey="bb" className="border-bottom py-2 text-white">Blood Banks</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="home">
                                <Form>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="Home.BloodGroupSelect">
                                                <Form.Control as="select" onChange={(e) => setBloodGroup(e.target.value)}>
                                                    <option>Blood Group</option>
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
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="Home.BloodGroupSelect">
                                                <Form.Control as="select" onChange={(e) => setProfileDistrict(e.target.value)}>
                                                    <option>District</option>
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
                                        </Col>
                                        <Col>
                                            <Button
                                                className='btn btn-primary btn-block mb-2'
                                                type='submit'
                                                onClick={(e) => filterProfileResult(e)} >
                                                Filter
                                </Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                <Row>
                                    {profiles.map(profile => {
                                        return (
                                            <Col sm={4} key={profile.name}>
                                                <Card className='m-4 bg-warning text-dark'>
                                                    <Card.Body>
                                                        <Card.Title as="h5">
                                                            {profile.name}
                                                        </Card.Title>
                                                        <Card.Text>
                                                            <p>{profile.blood_group}</p>
                                                            <p>{profile.gender}</p>
                                                            <p className="font-weight-bold">{profile.contact_number}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })}

                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="bb">
                                <Form>
                                    <Form.Row>
                                        <Col sm={3}>
                                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                                Name
                                                </Form.Label>
                                            <Form.Control
                                                className="mb-2"
                                                id="inlineFormInput"
                                                placeholder="Search"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Button type="submit" className="btn btn-primary btn-block" onClick={(e) => filterBbResult(e)}>
                                                Search
                                            </Button>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group controlId="bloodGroup.BloodGroupSelect">
                                                <Form.Control as="select" onChange={(e) => setBbDistrict(e.target.value)}>
                                                    <option>District</option>
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
                                        </Col>
                                        <Col sm={3}>
                                            <Button
                                                className='btn btn-primary btn-block'
                                                type='submit'
                                                onClick={(e) => filterBbResult(e)} >
                                                Filter
                                            </Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                <Row>
                                    {bb.map(bbItem => {
                                        return (
                                            <Col sm={4} key={bbItem.name}>
                                                <Card className='m-4'>
                                                    <Card.Body>
                                                        <Card.Title as="h5">
                                                            {bbItem.name}
                                                        </Card.Title>
                                                        <Card.Text>
                                                            <p>{bbItem.address}</p>
                                                            <p>{bbItem.street}</p>
                                                            <p>{bbItem.district}</p>
                                                            <p className="font-weight-bold">{bbItem.landline}</p>
                                                            <p className="font-weight-bold">{bbItem.secondary_contact}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div >
    )
}

export default homePage
