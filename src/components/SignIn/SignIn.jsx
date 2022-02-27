import './SignIn.css';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const SignIn = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [checkUsername, setCheckUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value)
        if(e.target.value.length <= 5) {
            setCheckUsername(true);
        }
        else {
            setCheckUsername(false);
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length <= 5) {
            setCheckPassword(true);
        }
        else {
            setCheckPassword(false);
        }
    }

    const handleToTags = () => {
        if(!checkUsername && username.length != 0 && !checkPassword && password.length != 0) {
            navigate('/tags');
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
            <Fab size="medium" className='signInBtn' aria-label="add">
                <PlayArrowRoundedIcon style={{color: "white"}} onClick={handleToTags} />
            </Fab>
            <p className='toSignUpSignIn'>Don't have an account? Please <span className='toSignUp' onClick={handleToSignUp}>Sign Up.</span></p>
        </div>
    )
}

export default SignIn;