import React from 'react'
import './StoryReel.css';
import Story from './Story.js';
import Img from './images/myImg.png';
import Img2 from './images/default.jpg';

export default function StoryReel(props) {
    return (
        <div className='storyReel'>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            <Story image={Img2} profileSrc={Img} title='Prash'/>
            
        </div>
    )
}
