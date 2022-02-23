import './Timeline.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';

const Timeline = () => {

    const [posts, setPosts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const tempPosts = []
        for(let i=0; i<100; i+=10) {
            tempPosts.push({
                url: `https://picsum.photos/id/${i}/400`,
                title: `Sent By : Name ${i}`
            })
        }

        setPosts(tempPosts)

        const tempContacts = []
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                for(let i=0; i<10; i++) {
                    tempContacts.push(response['data'][i])
                }
                setContacts(tempContacts)
            })
    }, [])

    const handleNavigateToContacts = () => {
        if(openDialog) {
            setOpenDialog(false)
        }
        else {
            setOpenDialog(true)
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return(
        <div className='timeline'>
                {
                    posts.map(item => {
                        return(
                            <div key={item['title']} className='timelinePosts' onClick={handleCloseDialog}>
                                <img className='postImage' src={item['url']}></img>
                                <p className='postBy'>{item['title']}</p>
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
                <div className='contactsDialog' >
                    {/* <p className='dialogTitle'>Contacts</p> */}
                    {/* <hr className='divider'></hr> */}
                    {
                        contacts.map(item => {
                            return(
                                <div key={item['name']} className='dialogData'>
                                    <p className='contactName'>{item['name']}</p>
                                    <p className='contactEmail'>{item['email']}</p>
                                    <hr className='divider full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Timeline;