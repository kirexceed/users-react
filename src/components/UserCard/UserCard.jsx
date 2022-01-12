import React from 'react';
import DeleteButton from '../Buttons/DeleteButton';
import './UserCard.css';


export const UserCard = ({picture, name, email, handler}) => {

    return (
        <div className="user-data">
            <div className="thumbnail-wrapper">
                <img className="thumbnail" src={picture} alt={name} />
            </div>
            <div className="user-info">
            <p className="user-name">{name}</p>
            <p className="user-email">{email}</p>
            </div>
            <DeleteButton click={handler} />
		</div>
    )
}