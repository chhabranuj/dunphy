import './Tags.css';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagsChild from '../TagsChild/TagsChild';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';


const Tags = () => {

    const navigate = useNavigate();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/interests/getInterests")
        .then((response) => {
            const tempTypes = []
            response.data.result.map(item => {
                tempTypes.push(item.interestName)
            })
            setTypes(tempTypes)
        })
    }, [])

    const handleNavigationToTimeline = () => {
        navigate("/timeline")
    }

    return (
        <div className='tags'>
            <div className='cards'>
                {
                    types.map(item => {
                        return (
                            <TagsChild name={item} />
                        )
                    })
                }
            </div>
        <div className='buttonParent'>
            <Fab size="medium" className='tagBtn' aria-label="add">
                <PlayArrowRoundedIcon style={{color: "white"}} onClick={handleNavigationToTimeline}/>
            </Fab>
        </div>    
        </div>
    );
}

export default Tags;