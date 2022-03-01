import './SignUp.css';
import axios from 'axios';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const SignUp = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [checkName, setCheckName] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkHandleBtn,setCheckHandleBtn] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
        setCheckHandleBtn(false);
        setShowAlert(false);
        if(e.target.value.length > 0 && e.target.value.length <= 2) {
            setCheckName(true);
        }
        else {
            setCheckName(false);
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setCheckHandleBtn(false);
        setShowAlert(false);
        if(e.target.value.length > 0 && e.target.value.length <= 5) {
            setCheckUsername(true);
        }
        else {
            setCheckUsername(false);
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setCheckHandleBtn(false);
        setShowAlert(false);
        if(e.target.value.length > 0 && e.target.value.length <= 5) {
            setCheckPassword(true);
        }
        else {
            setCheckPassword(false);
        }
    }
    
    const handleToTags = () => {
        if(!checkName && name != 0 && !checkUsername && username.length != 0 && !checkPassword && password.length != 0) {
            const body = {
                name: name,
                _id: username,
                password: password
            }
            axios.post("http://localhost:5000/user/validateUsername", body)
                .then((response) => {
                    if(response.data.result) {
                        setShowAlert(true)
                    }
                    else {
                        navigate('/tags', {
                            state: {body}
                        });
                    }
                })
        }
        else {
            setCheckHandleBtn(true);
        }
    }

    const handleToSignIn = () => {
        navigate('/')
    }

    


    return (
        <div className='signUp'>
            <p className='signUpSignInTitle'>Sign Up</p>
            <div className='usernameAndPassword'>
                <BadgeRoundedIcon className='nameIcon' />
                <div className='inputErrorParent'>
                    <input type='text' placeholder='Name...' className='userPasswordInput' value={name} onChange={handleName} />
                    {checkName?<p className='error'>Name must have more than 2 characters.</p>:<></>}
                </div>
            </div>
            <div className='usernameAndPassword username'>
                <AccountCircleRoundedIcon className='userIcon' />
                <div className='inputErrorParent'>
                    <input type='text' placeholder='Username...' className='userPasswordInput' value={username} onChange={handleUsername} />
                    {checkUsername?<p className='error'>Username must have more than 5 characters.</p>:<></>}
                </div>
            </div>
            <div className='usernameAndPassword spaceDown'>
                <PasswordRoundedIcon className='passwordIcon' />
                <div className='inputErrorParent'>
                    <input type='password' placeholder='Password...' className='userPasswordInput' value={password} onChange={handlePassword} />
                    {checkPassword?<p className='error'>Password must have more than 5 characters.</p>:<></>}
                </div>
            </div>
            {checkHandleBtn?<p className='error'>Textfields can't be empty.</p>:<></>}
            <Fab size="medium" className='signInBtn' aria-label="add">
                <PlayArrowRoundedIcon style={{color: "white"}} onClick={handleToTags} />
            </Fab>
            <p className='toSignUpSignIn'>Already have an account? Please <span className='toSignUp' onClick={handleToSignIn}>Sign In.</span></p>
            {
                showAlert && <Stack className='alert' spacing={2}>
                                <Alert severity="error">Username already Exist!!!</Alert>
                            </Stack>
            }
        </div>
    )
}

export default SignUp