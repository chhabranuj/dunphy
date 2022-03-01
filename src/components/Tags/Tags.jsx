import './Tags.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TagsChild from '../TagsChild/TagsChild';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';


const Tags = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [types, setTypes] = useState([]);

    // const types = ['Python', 'Java', 'Artificial Intelligence', 'Robotics', 'C', 'Ruby','Javascript', 'Go', 'Kotlin', 'Robotics Process Automation', 'C++', 'PHP', 'NodeJs', 'MongoDb', 'C#', 'Quantum Computing', 'Ethical Hacking', 'Augmented Reality', 'Edge Computing', 'Azure', 'Flutter']

    useEffect(() => {
        axios.get('http://localhost:5000/interests/getInterests')
        .then((response) => {
            const tempTypes = []
            response.data.result.map(item => {
                tempTypes.push(item.interestName)
            })
            setTypes(tempTypes)
        })
        sessionStorage.clear()
    }, [])

    const handleNavigationToTimeline = () => {
        const body = {
            _id: location.state.body._id,
            name: location.state.body.name,
            password: location.state.body.password,
            interests: sessionStorage.getItem('selectedTags').split(',')
        };

        axios.post('http://localhost:5000/user/insertUser', body)
        navigate('/timeline', {
            state: {
                _id: body._id
            }
        });
                
    }

    return (
        <div className='tags'>
            <div className='cards' >
                {
                    types.map(item => {
                        return (
                            <TagsChild key={item} name={item} />
                        )
                    })
                }
            </div>
        <div className='buttonParent'>
            <Fab size='medium' className='tagBtn' aria-label='add'>
                <PlayArrowRoundedIcon style={{color: 'white'}} onClick={handleNavigationToTimeline}/>
            </Fab>
        </div>    
        </div>
    );
}

export default Tags;