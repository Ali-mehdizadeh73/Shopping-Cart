import React, { Component } from 'react'

export default class CartProduct extends Component {

    clickHandler (id) {
        this.props.onRemove(id)
    }
  render() {

    let {id, title, img, price} = this.props
    return (
      <div className="cart-row">
        <dicv className="cart-item cart-column">
            <img className="cart-item-image" src={img}></img>
            <span className="cart-item-title">{title}</span>
        </dicv>
        <span className="cart-price cart-column">${price}</span>
        <div className="cart-quantity cart-column">
            <button className="btn btn-danger" type="button" onClick={this.clickHandler.bind(this, id)}>REMOVE</button>
        </div>
      </div>
    )
  }
}
