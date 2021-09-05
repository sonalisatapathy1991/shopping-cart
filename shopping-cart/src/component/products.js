import React, { Component } from 'react';
import { Button, CloseButton, Container, Row, Col } from 'react-bootstrap';
import '../css/style.css';
import Modal from 'react-modal';
import ReactStars from "react-rating-stars-component";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { priceFormatter } from '../util';
import { connect } from "react-redux";
import { fetchProduct, saveProductToCart } from '../actions/productActions';
import CartList from './CartList';
class products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Product: null,
      isModalOpen: false,
      isSelectedSize: false,
      selectedSize: null,
      backgroundPosition: '0% 0%',
      errorStatus: false
    }

  }
  componentDidMount() {
    this.props.fetchProduct();

  }
  saveToCart = (product, selectedSize) => {
    this.setModalStatusClose();

    if (!selectedSize) {
      this.setState({ errorStatus: true })
      return;
    }
    this.setState({ isModalOpen: false })
    return (
      this.props.saveProductToCart(product, selectedSize)
      // console.log(product,"product")
    )

  }
  openModal = (product) => {
    this.setState({ product: product, isModalOpen: true, selectedSize: null })
  }
  // closeModal = () =>{
  //   this.setState({product:product}) 
  // }
  setModalStatusClose = () => {


    return true
  }
  ratingChanged = (newRating) => {
    // alert(newRating);
  };
  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }
  render() {
    const viewProducts = !this.props.filteredItems ? this.props.products : this.props.filteredItems;
    //console.log('viewProducts',viewProducts);
    const { product, selectedSize } = this.state;
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '80%',
        maxWidth: '80%',
        height: '80vh',
        maxHeight: '80vh',
        transform: 'translate(-50%, -50%)',
      },
    };
    return (
      <>
        <Fade bottom cascade>
          <Row className="productContainer">

            <Col xs={12} lg={9}>

              {!viewProducts ? (
                <div className="productList">Loading...</div>
              ) : (
                <div className="productList">
                  {viewProducts.length > 0 ? (
                    <ul>
                      {
                        viewProducts.map((product) => {
                          return (
                            <li key={product._id} className="listItems">
                              <div className="product">
                                <a href={`#${product._id}`} onClick={() => this.openModal(product)}>
                                  <div className="imgWrapper">
                                    <img src={product.image} alt={product.title} />
                                  </div>
                                  <h3>{product.title}</h3>

                                </a>
                                <div className="productPrice pdt">
                                  <div>{priceFormatter(product.price)}</div>
                                  <ReactStars count={5} size={24} onChange={this.ratingChanged} activeColor="#ffd700" />
                                  {/* <Button variant="primary" onClick={()=> this.saveToCart(product,'M')}>Add to cart</Button> */}
                                </div>
                              </div>
                            </li>
                          )


                        })
                      }
                    </ul>

                  ) : (<div>  <img src="./images/nproduct.png" alt="No Product found!" style={{ height: '65vh', margin: 'auto', width: '90vw' }} cd /> </div>)}

                </div>)}
            </Col>
            <Col lg={3} className="d-none d-lg-block">
              {viewProducts && <div className="cartItem">
                <CartList />
              </div>}
            </Col>

          </Row>
        </Fade>
        {product &&
          <Modal isOpen={this.state.isModalOpen} onRequestClose={this.setModalStatusClose} ariaHideApp={false} style={customStyles} dialogClassName="dialogClass">
            {/* <div style={{ 'position': 'relative' }}> */}
            <CloseButton onClick={() => this.setState({ product: null })} />
            {/* </div> */}

            <Zoom>
              <div className="zoom">
                <Row>
                  <Col xs={12} lg={6}>
                    <div className="zoomImg">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </Col>
                  <Col xs={12} lg={6}>
                    <div className="zoomContent">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>Available Sizes : {
                        product.availableSizes.map(x => {
                          return <span key={x}>
                            <button onClick={() => this.setState({ selectedSize: x, errorStatus: false })} className={(selectedSize && selectedSize === x) ? 'selecteSizedBtn' : 'availableSizeBtn'}>{x}</button>{"  "}</span>
                        })

                      }

                      </p>
                      <div className="productPrice pdt">
                        <div> Price : {priceFormatter(product.price)}</div>

                      </div>
                      {this.state.errorStatus && <p style={{ 'color': 'red' }}>* Please select size</p>}
                      <p style={{ marginTop: '1rem' }}> <Button variant="primary" onClick={() => this.saveToCart(product, this.state.selectedSize)}>Add to cart</Button></p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Zoom>
          </Modal>


        }
      </>
    );
  }
}

export default connect((state) => ({
  products: state.products.items,
  filteredItems: state.products.filteredItems
}), { fetchProduct, saveProductToCart })(products);