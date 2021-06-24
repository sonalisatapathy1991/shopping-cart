import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import data from '../data.json';
import '../css/style.css';
import priceFormatter from '../util'

class products extends Component {
    render() {
       console.log('mydata',data.products)
        return (
            <div className="productContainer">
                <div className="productList">
                <ul>
                    {
                  data.products.map((product)=>{
                      return(
                        <li key={product._id} className="listItems">
                            <div className="product">
                                <a href={`#${product._id}`}>
                         <img src={product.image} alt={product.title} /> 
                        <h3>{product.title}</h3>
                        <p></p>
                        </a>
                        <div className="productPrice">
                        <div>{priceFormatter(product.price)}</div>
                        <Button variant="primary">Add to cart</Button>
                        </div>
                        </div>
                        </li>
                      )
                          
                      
                  })      
                    }
                </ul>

                </div>
                <div className="cartItem"></div>
            </div>
        );
    }
}

export default products;