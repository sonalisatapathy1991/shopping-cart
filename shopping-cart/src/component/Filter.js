import React, { Component } from 'react';
import '../css/style.css';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { fetchSizes, filteredProducts } from '../actions/productActions';
import { totalCartPriceNproducts } from '../util';

class Filter extends Component {

    componentDidMount() {
        this.props.fetchSizes();
    }

    render(props) {
        //console.log('filter page', this.props);
        if (this.props.location.pathname.indexOf("Admin") > -1 || (this.props.location.pathname.toUpperCase()) === '/REGISTER'
            || this.props.location.pathname.toUpperCase() === '/LOGIN') {
            return null;
        }
        const listProducts = !this.props.filteredItems ? this.props.products : this.props.filteredItems;
        //console.log('listProducts',listProducts.length);
        return (
            <div className='headerSection'>
                <Row>
                    <div className='filterProducts'>
                        <Col xs={4} >
                            <div className='totalProduct'>{listProducts ? listProducts.length : ''}  Products</div></Col>
                        {!this.props.allSizes ? (<div>Loading...</div>) :

                            (

                                <Col xs={6} lg={6}>
                                    <div className='sizes'>Size &nbsp;
                                        <select onChange={e => this.props.filteredProducts(this.props.products, e.target.value)}>
                                            <option value="">All</option>
                                            {this.props.allSizes.map((sizeList) => {

                                                return (<option value={sizeList.size} key={sizeList.size}>{sizeList.title}</option>)
                                            })}

                                        </select></div>
                                </Col>



                            )}

                        {/*  <div className='totalProduct'>

                        Oreder <select>
                            <option value="Latest">Latest</option>
                            <option value="Highest">Highest</option>
                            <option value="Lowest">Lowest</option>

                        </select> 
                    </div>*/}
                    </div>
                    <Col xs={2} lg={2}>
                        <div className='cartSection'>
                            {/* {this.props.allCartItems && this.props.allCartItems.length > 0 ? 'Total Cart Items ' + totalCartPriceNproducts().totalCartProduct : 'No items in cart'} */}
                            {this.props.allCartItems ?
                                <Link to="/cartList">
                                    <i className="fa fa-cart-plus fa-2x" style={{ color: '#363b3b', cursor: 'pointer' }}></i>
                                    {this.props.allCartItems.length > 0 && <span className='badge badgeWarning' id='lblCartCount'> {totalCartPriceNproducts().totalCartProduct}  </span>}
                                </Link> : ''}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => ({
    allSizes: state.products.allSizes,
    products: state.products.items,
    allCartItems: JSON.parse(localStorage.getItem('savedCartItems')),
    filteredItems: state.products.filteredItems
}), { fetchSizes, filteredProducts })(Filter);