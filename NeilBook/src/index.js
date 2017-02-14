import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { hashHistory, Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import Modal from "./jsx/modal.jsx";
import Cart from "./jsx/cart.jsx";
import Checkout from "./jsx/checkout.jsx";
import Product from "./jsx/product.jsx";

const PRODUCTS = [
  { id: 0, src: 'https://s-media-cache-ak0.pinimg.com/236x/98/1e/fa/981efa5ce2be7a22620bd77b79a742a2.jpg', title: 'Pro Express.js', url: 'http://amzn.to/1D6qiqk' },
  { id: 1, src: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._SX379_BO1,204,203,200_.jpg', title: 'Practical Node.js', url: 'http://amzn.to/NuQ0fM' },
  {
    id: 2, src: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._SX379_BO1,204,203,200_.jpg',
    title: 'Express API Reference', url: 'http://amzn.to/1xcHanf'
  },
  {
    id: 3, src: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._SX379_BO1,204,203,200_.jpg',
    title: 'React Quickly', url: 'https://www.manning.com/books/react-quickly'
  },
  {
    id: 4, src: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._SX379_BO1,204,203,200_.jpg',
    title: 'Full Stack JavaScript', url: 'http://www.apress.com/9781484217504'
  }
]
const Heading = () => {
  return <h1>Nile Book Store</h1>
}

const Copy = () => {
  return <p>Please click on a book to view details in a modal. You can copy/paste the link of the modal. The link will open book on a separate page.
</p>
}

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.isModal = (nextProps.location.state && nextProps.location.state.modal)
    if (this.isModal &&
      nextProps.location.key !== this.props.location.key) {
      this.previousChildren = this.props.children
    }
  }

  render() {
    console.log('Modal: ', this.isModal)
    return (
      <div className="well">
        <Heading />
        <div>
          {(this.isModal) ? this.previousChildren : this.props.children}
          {(this.isModal) ?
            <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
              {this.props.children}
            </Modal> : ''
          }
        </div>
      </div>
    )
  }

}
class Index extends React.Component {
  render() {
    return (
      <div>
        <Copy />
        <p><Link to="/cart" className="btn btn-danger">Cart</Link></p>
        <div>
          {PRODUCTS.map(picture => (
            <Link key={picture.id}
              to={{
                pathname: `/products/${picture.id}`,
                state: {
                  modal: true,
                  returnTo: this.props.location.pathname
                }
              }
              }>
              <img style={{ margin: 10 }} src={picture.src} height="100" />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
let cartItems = {}
const addToCart = (id) => {
  if (cartItems[id])
    cartItems[id] += 1
  else
    cartItems[id] = 1
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/products/:id" component={Product}
        addToCart={addToCart}
        products={PRODUCTS} />
      <Route path="/cart" component={Cart}
        cartItems={cartItems} products={PRODUCTS} />
    </Route>
    <Route path="/checkout" component={Checkout}
      cartItems={cartItems} products={PRODUCTS} />
  </Router>
), document.getElementById('content'))