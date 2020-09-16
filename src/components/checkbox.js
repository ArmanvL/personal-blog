import React, { useState } from "react"
import { rhythm } from "../utils/typography"

import Emoji from './emoji'

const Checkbox = ({ handler, value, styles }) => {
    const [ hover, setHover] = useState(false);

    const handleCheckboxChange = event => 
        handler(event.target.checked);

    const handleHover = () =>
        setHover(!hover);

    const sliderBall = {
        width: rhythm(0.8),
        height: rhythm(0.8),
        top: rhythm(1/10),
        bottom: rhythm(1/10),
        transition: 'left .2s linear',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '50%',
        zIndex: 999
    }

    return (
        <label style={{
            ...styles,
            width: rhythm(2),
            height: rhythm(1),
            position: 'relative',
            display: 'inline-block'
        }} onMouseEnter={ handleHover }
        onMouseLeave={ handleHover }>
            <input style={{
                    opacity: 0,
                    width: 0,
                    height: 0
                }}
                type="checkbox"
                checked={ value }
                onChange={ handleCheckboxChange }></input>
            <span style={{
                backgroundColor: '#262626',
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: rhythm(1),
                transition: 'box-shadow .2s linear',
                boxShadow: hover ? value ? '0 0 25px #F4F1C9' : '0 0 25px #ffdd00' : ''
            }}>
                <span style={
                    value ? {
                        ...sliderBall,
                        left: rhythm(2 - 0.8 - (1/10))
                    } : {
                        ...sliderBall,
                        left: rhythm(1/10)
                    }
                }></span>
                <Emoji style={{
                    position: 'absolute',
                    width: rhythm(0.8),
                    height: rhythm(0.8),
                    left: rhythm(.115),
                    zIndex: 5
                }} label='crescent-moon' symbol='🌙'></Emoji>
                <Emoji style={{
                    position: 'absolute',
                    width: rhythm(0.8),
                    height: rhythm(0.8),
                    left: rhythm(1.125),
                    zIndex: 5
                }} label='sun' symbol='☀️'></Emoji>
            </span>
        </label>
    )
}

export default Checkbox