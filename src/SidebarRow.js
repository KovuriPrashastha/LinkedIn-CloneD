import React from 'react'
import './SidebarRow.css';

function SidebarRow(props) {
    return (
        <div className='SidebarRow'>
           
            {props.Icon} <h4>{props.title}</h4>
        </div>
    )
}

export default SidebarRow
