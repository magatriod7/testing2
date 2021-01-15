// import React from 'react'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props){

    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassward, setConfirmPassward] = useState("")

    const onEmailandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswardHandler = (event) => {
        setConfirmPassward(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password!== ConfirmPassward) {
            return alert('비밀번호와 비밀번호 확인이 다릅니다.')
        }

         let body = {
             email: Email,
             password: Password,
             name: Name
                }

        dispatch(registerUser(body))
        .then(response => {
            if (response.payload.registerSuccess) {
                props.history.push('/login')
            } else {
                alert('Failed to signed up˝')
            }
        })
 
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassward} onChange={onConfirmPasswardHandler} />
                <br />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
