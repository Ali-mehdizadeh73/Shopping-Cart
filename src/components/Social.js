import React, { Component } from 'react'

export default class Social extends Component {
    render() {

        let {href, img} = this.props

        return (
            <li>
                <a href={href} target="_blank" rel="noreferrer">
                    <img className='footer-nav-img' src={img} alt='social icon' />
                </a>
            </li>
        )
    }
}
