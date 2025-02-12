import React, { Component } from 'react'
import Product from './Product'
import CartProduct from './CartProduct'
import Social from './Social'

export default class Shop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [
                { id: 1, title: 'Album 1', price: 5, img: 'images/Album 1.png' },
                { id: 2, title: 'Album 2', price: 15, img: 'images/Album 2.png' },
                { id: 3, title: 'Album 3', price: 20, img: 'images/Album 3.png' },
                { id: 4, title: 'Album 4', price: 100, img: 'images/Album 4.png' },
                { id: 5, title: 'Album 5', price: 5, img: 'images/Album 5.png' },
                { id: 6, title: 'Album 6', price: 50, img: 'images/Album 6.png' },
            ],
            shoppingCart: [],
            socials: [
                { id: 1, href: 'https://www.youtube.com', img: 'images/YouTube Logo.png' },
                { id: 2, href: 'https://www.spotify.com', img: 'images/Spotify Logo.png' },
                { id: 3, href: 'https://www.facebook.com', img: 'images/FaceBook Logo.png' },
            ]
        }
    }

    addProductToCart = (productId) => {
        console.log(productId)

        let mainProduct = this.state.products.find(product => product.id === productId)
        console.log(mainProduct)

        this.setState(prevState => ({
            shoppingCart: [...prevState.shoppingCart, mainProduct]
        }))
    }

    emptyShoppingCart = () => {
        this.setState({
            shoppingCart: []
        })
    }

    removeProductFromCart = (productId) => {
        let newShoppingCart = this.state.shoppingCart.filter(product => product.id !== productId)
        this.setState({
            shoppingCart: newShoppingCart
        })
    }

    render() {
        return (
            <>
                <header className="main-header">
                    <nav className="main-nav nav">
                        <h3 className="header-title">Online Boutique</h3>
                        <ul className="nav-list">
                            <li className='nav-list-item'><a href="#" className="nav-link">Home</a></li>
                            <li className='nav-list-item'><a href="#" className="nav-link">Store</a></li>
                            <li className='nav-list-item'><a href="#" className="nav-link">Contact</a></li>
                            <li className='nav-list-item'><a href="#" className="nav-link">About</a></li>
                            <li className='nav-list-item'><a href="#" className="nav-link">Products</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="container content-section">
                    <div className="shop-items">
                        {this.state.products.map(product => (
                            <Product key={product.id} {...product} onAddProduct={this.addProductToCart} className="shop-item"></Product>
                        ))}
                    </div>
                </section>
                <section className="container content-section">
                    <h2 className="section-title">Cart</h2>
                    <div className="cart-row">
                        <span className="cart-item cart-header cart-column">ITEM</span>
                        <span className="cart-price cart-header cart-column">PRICE</span>
                        <span className="cart-quantity cart-header cart-column">Doing</span>
                    </div>
                    <div className="cart-items">
                        {this.state.shoppingCart.map(product => (
                            <CartProduct key={product.id} {...product} onRemove={this.removeProductFromCart} className="cart-item"></CartProduct>
                        ))}
                    </div>
                    <button className="btn btn-primary btn-purchase" type="button" onClick={this.emptyShoppingCart}>Empty Cart</button>
                </section>
                <footer className="main-footer">
                    <div className="container main-footer-container">
                        <h3 className="band-name">The Generics</h3>
                        <ul className="nav-footer nav">
                            {this.state.socials.map(social => (
                                <Social key={social.id} {...social} className="social-link"></Social>
                            ))}
                        </ul>
                    </div>
                </footer>
            </>
        )
    }
}