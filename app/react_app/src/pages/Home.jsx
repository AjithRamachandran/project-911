import React from 'react'

import axios from 'axios'

const HomePage = () => {

    const logout = (e) => {
        e.preventDefault()
        axios
            .post('/api/user/logout/')
    }

    return (
        <div>
            <h1>Home Component</h1>
            <button className="btn btn-danger btn-block mb-2" onClick={(e) => logout(e)}>Logout</button>
        </div>
    )
}

export default HomePage
