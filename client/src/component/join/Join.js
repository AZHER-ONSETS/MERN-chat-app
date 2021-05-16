import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css'

const Join = () => {
    const [name, setname] = useState('')
    const [room, setroom] = useState('')
    return (
        <div className="joinOuterContainer" >
            <div className="joinInnerContainer" >
                <h1 className="heading" >Join</h1>
                <div> <input onChange={(e) => setname(e.target.value)} placeholder="name" className="joinInput" type="text" /> </div>
                <div> <input onChange={(e) => setroom(e.target.value)} placeholder="room" className="joinInput mt-20" type="text" /> </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}  to={`/chat?name=${name}&room=${room}`} >
                    <button className="button mt-20" type="submit" >Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
