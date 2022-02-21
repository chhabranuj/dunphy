import './TagsChild.css'
import Card from '@mui/material/Card';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TagsChild = (props) => {

    const [addTag, setAddTag] = useState(false);
    const [cardClass, setCardClass] = useState('tagsCard');

    const add = () => {
        if(addTag) {
            setAddTag(false);
            setCardClass('tagsCard');
        }
        else {
            setAddTag(true);
            setCardClass('tagsCard selectedTagsCard');
        }
    }

    return (
        <Card className={cardClass} onClick={add}>
            {addTag? (<CheckCircleIcon className='tagTickIcon'/>):(<></>)}
            <p className='tagName'>{props.name}</p>
        </Card>
    );
}

export default TagsChild;