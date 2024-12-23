import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../assets/style/style.css"
const Loader = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            navigate("/Login")
        }, 6000)
    })
    if (loading) {
        return (
            <div className='body' >
                <div className="loader">
                    <div className="logo">
                        <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734938938/amend_lntakp.png" alt="" />
                        <h1>Attendipen</h1>
                    </div>
                    <section class="dots-container">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </section>

                </div>
            </div>
        )
    }
}

export default Loader