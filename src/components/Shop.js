import React, { Component } from 'react'
import Product from './Product'
import CartProduct from './CartProduct'
import Social from './Social'

export default class Shop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [
                { id: 1, title: 'Album 1', price: 1500, img: '/images/Album 1.jpeg' },
                { id: 2, title: 'Album 2', price: 2048, img: '/images/Album 2.jpeg' },
                { id: 3, title: 'Album 3', price: 3651, img: '/images/Album 3.jpeg' },
                { id: 4, title: 'Album 4', price: 8540, img: '/images/Album 4.jpeg' },
                { id: 5, title: 'Album 5', price: 1205, img: '/images/Album 5.jpeg' },
                { id: 6, title: 'Album 6', price: 2254, img: '/images/Album 6.jpeg' },
            ],
            shoppingCart: [],
            socials: [
                { id: 1, href: 'https://www.youtube.com', img: '/images/YouTube Logo.png' },
                { id: 2, href: 'https://www.spotify.com', img: '/images/Spotify Logo.png' },
                { id: 3, href: 'https://www.facebook.com', img: '/images/FaceBook Logo.png' },
            ],
            isMenuOpen: false,
            showCheckout: false
        }
    }

    handleCheckout = () => {
        this.setState({ showCheckout: true })
    }

    handleBackToShop = () => {
        this.setState({ showCheckout: false })
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }))
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
        const { isMenuOpen, showCheckout, shoppingCart} = this.state;

        const totalPrice = shoppingCart.reduce((sum, product) => sum + product.price, 0);

        if (showCheckout) {
            return (
                <section className='container content-section invoice-section'>
                    <h2 className='section-title'>فاکتور خرید</h2>
                    <div className="invoice-table">
                        <div className="invoice-header">
                            <span>ردیف</span>
                            <span>نام کالا</span>
                            <span>قیمت (تومان)</span>
                        </div>
                        {shoppingCart.length === 0 ? (
                            <div className="invoice-row empty-row">
                                <span colSpan={3}>سبد خرید خالی است.</span>
                            </div>
                        ) : (
                            shoppingCart.map((product, idx) => (
                                <div className="invoice-row" key={idx}>
                                    <span>{idx + 1}</span>
                                    <span>{product.title}</span>
                                    <span>{product.price.toLocaleString()}</span>
                                </div>
                            ))
                        )}
                        <div className="invoice-footer">
                            <span></span>
                            <span>جمع کل:</span>
                            <span>{totalPrice.toLocaleString()} تومان</span>
                        </div>
                    </div>
                    <div className="invoice-actions">
                        <button className="btn btn-secondary" onClick={this.handleBackToShop}>بازگشت به فروشگاه</button>
                        <button className="btn btn-success">پرداخت</button>
                    </div>
                </section>
            )
        }

        return (
            <>
                <header className="main-header">
                    <nav className="container main-nav nav">
                        <h3 className="header-title"><a href="#">Online Boutique</a></h3>
                        <div className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={this.toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
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
                            <Product key={product.id} {...product} onAddProduct={this.addProductToCart} className="shop-item" />
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
                            <CartProduct key={product.id} {...product} onRemove={this.removeProductFromCart} className="cart-item" />
                        ))}
                    </div>
                    <div className='btn-holder'>
                        <button className="btn btn-primary btn-purchase" type="button" onClick={this.emptyShoppingCart}>Empty Cart</button>
                        <button className="btn btn-success btn-purchase" type="button" onClick={this.handleCheckout}>Final payment</button>
                    </div>
                </section>
                <footer className="main-footer">
                    <div className="container main-footer-container">
                        <h3 className="band-name">The Generics</h3>
                        <ul className="nav-footer nav">
                            {this.state.socials.map(social => (
                                <Social key={social.id} {...social} className="social-link" />
                            ))}
                        </ul>
                    </div>
                    <p className='copy-rigth'>copy-right..@.....</p>
                </footer>
            </>
        )
    }
}
