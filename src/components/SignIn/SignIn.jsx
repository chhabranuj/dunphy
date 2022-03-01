import './SignIn.css';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import axios from 'axios';

const SignIn = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkHandleBtn,setCheckHandleBtn] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value)
        setCheckHandleBtn(false);
        setShowAlert(false);
        if(e.target.value.length <= 5 && e.target.value.length > 0) {
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
        if(e.target.value.length <= 5 && e.target.value.length > 0) {
            setCheckPassword(true);
        }
        else {
            setCheckPassword(false);
        }
    }

    const handleToTags = () => {
        if(!checkUsername && username.length != 0 && !checkPassword && password.length != 0) {
            const body = {
                _id: username,
                password: password,
            }

            axios.post("http://localhost:5000/user/validateUser", body)
                .then((response) => {
                    if(response.data.result) {
                        navigate('/timeline', {
                            state: {
                                _id: body._id
                            }
                        });
                    }
                    else {
                        setShowAlert(true);
                    }
                })
        }
        else {
            setCheckHandleBtn(true);
        }
    }

    const handleToSignUp = () => {
        navigate('/signup')
    }

    return (
        <div className='signIn'>
            <p className='signUpSignInTitle'>Login</p>
            <div className='usernameAndPassword'>
                <AccountCircleRoundedIcon className='userIcon' />
                <div className='inputErrorParent'>
                    <input type='text' placeholder='Username...' className='userPasswordInput' value={username} onChange={handleUsername} />
                    {checkUsername?<p className='error'>Username is incorrect.</p>:<></>}
                </div>
            </div>
            <div className='usernameAndPassword password'>
                <PasswordRoundedIcon className='passwordIcon' />
                <div className='inputErrorParent'>
                    <input type='text' placeholder='Password...' type='password' className='userPasswordInput' value={password} onChange={handlePassword} />
                    {checkPassword?<p className='error'>Password is incorrect.</p>:<></>}
                </div>
            </div>
            {checkHandleBtn?<p className='error'>Textfields can't be empty.</p>:<></>}
            <Fab size="medium" className='signInBtn' aria-label="add">
                <PlayArrowRoundedIcon style={{color: "white"}} onClick={handleToTags} />
            </Fab>
            <p className='toSignUpSignIn'>Don't have an account? Please <span className='toSignUp' onClick={handleToSignUp}>Sign Up.</span></p>
            {
                showAlert && <Stack className='alert' spacing={2}>
                                <Alert severity="error">Username and Password does not match!!!</Alert>
                            </Stack>
            }
        </div>
    )
}

export default SignIn;