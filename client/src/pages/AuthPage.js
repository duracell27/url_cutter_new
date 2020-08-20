import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useAuth } from '../hooks/auth.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const Auth = useContext(AuthContext)
    const message = useMessage() 
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const changeHandler = e => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const registrHandler = async () => {
        try{
            const data = await request('/api/auth/registr', 'POST', {...form})
            message(data.message)
        }catch(e){}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            Auth.login(data.userId, data.token)
        }catch(e){}
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1> Скороти ссилку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введіть Email" id="Email" type="text" name='email' className='yellow-input' onChange={changeHandler}/>
                                <label for="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введіть пароль" id="password" type="password" name='password' className='yellow-input' onChange={changeHandler}/>
                                <label for="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-4' onClick={loginHandler} style={{ marginRight: 10 }} disabled={loading}>Увійти</button>
                        <button className='btn grey darken-4' onClick={registrHandler} disabled={loading}>Реєстрація</button>
                    </div>
                </div>
            </div>
        </div>
    )
}