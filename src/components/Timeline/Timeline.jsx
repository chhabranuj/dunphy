import './Timeline.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';

const Timeline = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [messageError, setMessageError] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);

    useEffect(() => {
        const tempPosts = []
        for(let i=0; i<100; i+=10) {
            tempPosts.push({
                url: `https://picsum.photos/id/${i}/400`,
                title: 'Anuj Chhabra'
            });
        }

        setPosts(tempPosts);

        axios.get('http://localhost:5000/user/checkFriends', {
            params: {_id: location.state._id}
        })
            .then((response) => {
                setContacts(response.data.result)
            })
    }, [])

    const handleNavigateToContacts = () => {
        if(openDialog) {
            setOpenDialog(false);
        }
        else {
            setOpenDialog(true);
        }
    }

    const handleCloseContactsDialog = () => {
        setOpenDialog(false);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
        if(e.target.value.length < 1) {
            setMessageError(true);
        }
        else {
            setMessageError(false);
        }
    }

    const handleSendMessage = () => {
        if(message.length < 1) {
            setMessageError(true);
        }
        else {
            navigate('/');
        }
    }

    const handleOpenMessageDialog = (e) => {
        console.log(e.target.innerHTML)
        setOpenMessageDialog(true);
    }

    const handleCloseMessageDialog = (value) => {
        setOpenMessageDialog(false);
        setMessageError(false);
      };

    return(
        <div className='timeline'>
                {
                    posts.map(item => {
                        return(
                            <div key={item['url']} className='timelinePosts' onClick={handleCloseContactsDialog}>
                                <img className='postImage' src={item['url']}></img>
                                <p className='postBy'><span style={{fontWeight: 'bolder'}}>Sent By :</span> {item['title']}</p>
                            </div>          
                        )
                    })
                }
            <Fab style={{color: 'white'}} variant="extended" aria-label="edit" className='contactsIcon' onClick={handleNavigateToContacts}>
                <ContactsRoundedIcon sx={{ mr: 1 }} style={{color: 'white'}}/>
                Contacts
            </Fab>

            {
                openDialog && 
                <div className='contactsDialog'>
                    {
                        contacts.map(item => {
                            return(
                                <div key={item['name']} className='dialogData' onClick={handleOpenMessageDialog}>
                                    <p className='contactName'>{item.name}</p>
                                    <p className='contactId'>{item._id}</p>
                                    <hr className='divider full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
            } 

            <Dialog className='messageDialog' open={openMessageDialog} onClose={handleCloseMessageDialog}>
                <p className='messageTitle'>Please enter the message you want to send.</p>
                <div className='messageIconAndInputParent'>
                    <CommentRoundedIcon className='messageIcon' />
                    <div className='messageInputAndErrorParent'>
                        <input placeholder='Please enter your message...' className='messageInput' value={message} onChange={handleMessage}/>
                        {messageError?<p className='error'>Message can't be empty</p>:<></>}
                    </div>
                </div>
                <div className='sendAndBackParent'>
                    <Button variant="contained" className='messageDialogBtn dialogSendBtn' onClick={handleSendMessage}>Send</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Timeline;