import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (

        <nav>
            <div class="nav-wrapper blue darken-1">
                <a href="/" class="brand-logo" style={{marginLeft: 15}}>Скорочення ссилок</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Створити</NavLink></li>
                    <li><NavLink to={'/links'}>Мої ссилки</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Вийти</a></li>
                </ul>
            </div>
        </nav>

    )
}