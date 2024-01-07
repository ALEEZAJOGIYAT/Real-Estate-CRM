import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import './style.css'

const CounterBtn = (props) => {
    const handleIncr = () => {
        if (props.state === '') {
            props.setState(1);
        } else {
            props.setState(props.state + 1);
        }
    }
    const handleDecr = () => {
        if (props.state === 1) {
            props.setState('');
        } else if (props.state > 0) {
            props.setState(props.state - 1);
        }
    }
    return (
        <div className='appart_container'>
            <input className='input' type='text' value={props.state} placeholder={props.placeholder} />
            <button className='btn' onClick={handleDecr} disabled = {props.disabled ? props.disabled : false }><AiOutlineMinus /></button>
            <br/>
            <button className='btn' onClick={handleIncr} disabled = {props.disabled ? props.disabled : false }><AiOutlinePlus /></button>
        </div>
    )
}

export default CounterBtn
