import React, { Component } from 'react';
import '../css/style.css';
import { Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/productActions';
import { totalCartPriceNproducts } from '../util';
class CartList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const cartList = JSON.parse(localStorage.getItem('savedCartItems')) ? JSON.parse(localStorage.getItem('savedCartItems')) : [];
        const viewCartList = this.props.allCartItems && this.props.allCartItems.length > 0 ? this.props.allCartItems : cartList;
        console.log('cartList', viewCartList)
        return (
            <>

                <Fade left cascade>
                    <div className="cartAllItems">
                        {viewCartList && viewCartList.map((cartItem) => {

                            return (<div key={cartItem._id + cartItem.selectedSize} className="cartList">
                                <div className="cartImageCls"><img src={cartItem.image} alt="no image" /></div>
                                <div className="cartTitle">
                                    {cartItem.title}
                                    {/* <span style={{display:'block'}}> {cartItem.selectedSize}</span> */}
                                    <span className="cartSubTitle">  <span style={{ 'flex-basis': '8rem' }}> <b>Size:</b> {cartItem.selectedSize} &nbsp; &nbsp;</span>
                                        <span > <b>Qty:</b> {cartItem.count} X ${cartItem.price}
                                            {/* <Button className="removeBtn" onClick={()=>this.props.removeFromCart(cartItem,cartItem.selectedSize)}>Remove</Button> */}
                                        </span></span>
                                </div>

                            </div>)
                        })}

                        {!viewCartList && <span>No Items in cart</span>}

                        {viewCartList && viewCartList.length > 0 &&
                            <Fade left cascade>
                                <div className="toatalCartAmount">Total Amount : <span>{totalCartPriceNproducts().totalCartPrice}</span></div>
                            </Fade>
                        }
                    </div>
                </Fade>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        allCartItems: state.products.cartItems
    };
};

export default connect(mapStateToProps, { removeFromCart })(CartList);
