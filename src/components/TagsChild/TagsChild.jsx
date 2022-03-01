import './TagsChild.css'
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TagsChild = (props) => {

    let selectedTags = []
    const [addTag, setAddTag] = useState(false);
    const [cardClass, setCardClass] = useState('tagsCard');

    const add = () => {
        selectedTags = sessionStorage.getItem('selectedTags')?sessionStorage.getItem('selectedTags').split(','):[];

        if(addTag) {
            setAddTag(false);
            selectedTags.map((item, index) => {
                if(item == props.name) {
                    selectedTags.splice(index, 1);
                }
            })
            sessionStorage.setItem('selectedTags', selectedTags);
            setCardClass('tagsCard');
        }
        else {
            setAddTag(true);
            selectedTags.push(props.name);
            sessionStorage.setItem('selectedTags', selectedTags);
            setCardClass('tagsCard selectedTagsCard');
        }
    }

    return (
        <div className={cardClass} onClick={add}>
            {addTag? (<CheckCircleIcon className='tagTickIcon'/>):(<></>)}
            <p className='tagName'>{props.name}</p>
        </div>
    );
}

export default TagsChild;