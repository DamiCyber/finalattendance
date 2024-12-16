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
        },6000)
    })
    if (loading) {
        return (
            <div>
                <div className="loader">
                    <h1>Attendipen</h1>
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