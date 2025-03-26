import React, { Component } from 'react'

export default class Social extends Component {
    render() {

        let {href, img} = this.props

        return (
            <li>
                <a href={href} target="_blank">
<<<<<<< HEAD
                    <img className='footer-nav-img' src={img} />
=======
                    <img src={img} />
>>>>>>> 7b7c1297e1bc02a8e9811671b90041c3d3d94410
                </a>
            </li>
        )
    }
}
