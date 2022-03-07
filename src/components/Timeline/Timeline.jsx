import './Timeline.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import environment from '../../environment';

const Timeline = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [messageTo, setMessageTo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [messageError, setMessageError] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false);

    useEffect(() => {

        document.title = location.state._id

        axios.get(`${environment.serverUrl}/message/getMessages`, {
            params: {
                userId: location.state._id
            }
        })
            .then(response => {
                if(response.data.result)
                    setPosts(response.data.result.messageDetail.reverse())
            })

        axios.get(`${environment.serverUrl}/user/checkFriends`, {
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
            const body = {
                _id: messageTo,
                messageDetail: [
                    {
                        message: message,
                        messageBy: location.state._id,
                        sentAt: new Date().toLocaleString()
                    }
                ],
            }
            axios.post(`${environment.serverUrl}/message/sendMessage`, body)
                .then((response) => {
                    handleCloseMessageDialog()
                })
        }
    }

    const handleOpenMessageDialog = (e) => {
        setMessageTo(e.target.innerHTML)
        setOpenMessageDialog(true);
    }

    const handleCloseMessageDialog = (value) => {
        setOpenMessageDialog(false);
        setMessageError(false);
      };

    return(
        <div className='timeline'>
                {
                    posts.length > 0 && posts.map(item => {
                        return(
                            <div key={item['sentAt']} className='timelinePosts' onClick={handleCloseContactsDialog}>
                                <div className='postMessageDiv'>
                                    {item['message']}
                                </div>
                                <p className='postBy'><span style={{fontWeight: 'bolder'}}>Sent By :</span> {item['messageBy']}</p>
                                <p className='sentAt postBy'><span style={{fontWeight: 'bolder'}}>Sent At :</span> {item['sentAt']}</p>
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
                                <div key={item['name']} className='dialogData'>
                                    <p className='contactName'>{item.name}</p>
                                    <p className='contactId' onClick={handleOpenMessageDialog}>{item._id}</p>
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