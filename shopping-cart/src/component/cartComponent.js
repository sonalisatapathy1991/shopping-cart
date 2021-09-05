import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import {priceFormatter,numArray,totalCartPriceNproducts,fullSizeFormat} from '../util';
import {updateCartProduct,removeFromCart} from '../actions/productActions';
// import {UPDATE_CART} from '../types/tepes.js'
class cartComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      textFieldStatus:false,
      textFieldValue:10,
      currentSelectedFieldItem:null,
      currentTextFieldItem:null,
      currentUpdateBtnStatus:true
    
    }
   
  }
    handleSelect=(product,e)=>{
      // console.log('chk1',product)
       console.log('chk2',e)
      
      if(e<10){
        this.setState({currentSelectedFieldItem:product._id})
        this.props.updateCartProduct(product,e)
      }else{
       
        this.setState({[product._id]:10});
        this.setState({currentUpdateBtnStatus:true})
        this.setState({currentTextFieldItem:product._id})
       
      }
      
      }
      
      changeOnEnter(id,e){
        this.setState({currentTextFieldItem:id})
        this.setState({currentUpdateBtnStatus:true})
      }
      handleChange(index, e){
        let change = {};
        change[e.target.name] = parseInt(e.target.value);
        this.setState(change);
       
      }
      updateCartItem = (product,selectedSize) =>{
       if(this.state[`${product._id}`]<10){
          this.setState({currentSelectedFieldItem:product._id,
            currentTextFieldItem:null
          })
        }else{
          this.setState({currentSelectedFieldItem:null,
            currentTextFieldItem:product._id
          })
        }
          this.setState({currentUpdateBtnStatus:false})
          console.log('pdt',this.state[`${product._id}`])
        if(this.state[`${product._id}`]===0 || isNaN(this.state[`${product._id}`]) || this.state[`${product._id}`]===null){
          this.props.removeFromCart(product,selectedSize);
        }else{
          this.props.updateCartProduct(product,this.state[`${product._id}`]);
        }
        
      
        
      }
    render() {
      const cartList = JSON.parse(localStorage.getItem('savedCartItems'))?JSON.parse(localStorage.getItem('savedCartItems')):[];
      const viewCartList = this.props.allCartItems &&  this.props.allCartItems.length >0 ? this.props.allCartItems : cartList;
      
      // console.log('viewCartList',viewCartList)
        return (
            <>
            <div className="felBox topCart">
                <div><h2>Shopping Cart</h2></div>
                <div>Price</div>
            </div> 
            <div className="contentCart">
            {viewCartList && viewCartList.map((cartItem,index) => {
            // console.log('cart ITEM',this.state[`${cartItem._id}`]);
              return (<div key={cartItem._id} className="cartList cartBorderCss">
                  <div className="cartImageComponent"><img src={cartItem.image} alt="no image" /></div>
                  <div className="cartTitleComponent">
                    <div>
                    <h3>  {cartItem.title}</h3>
                    <span style={{fontSize: '14px',color: 'rgb(48 135 71)',display:'block'}}>in stock</span>
                    <span style={{fontSize: '14px',color: '#514b4b',display:'block'}}>Ships from and sold by Shopshub.ca</span>
                    <span style={{fontSize: '14px',color: '#514b4b',display:'block'}}> Eligible for FREE Shipping</span>
                    <span style={{fontSize: '14px',color: '#514b4b',display:'block'}}>
                    <b>Size </b>: &nbsp; {fullSizeFormat(cartItem.selectedSize)}
                    </span>
                    <div style={{display:'flex',marginTop:'1rem'}}>
                   
                   {(cartItem.count<10 && cartItem._id!==this.state.currentTextFieldItem) && 
                   
                   <Dropdown  onSelect={(e)=>this.handleSelect(cartItem,e)}  className="cartDropdownList">
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  Qty: {cartItem.count} 
  </Dropdown.Toggle>

  <Dropdown.Menu  name="productItemNum" drop="up"  >
     

          {numArray.map((i,index)=> {
              let num = (i!==10)?i:i + '+';
            return (<Dropdown.Item eventKey={i} key={i}>{num}</Dropdown.Item>)
        })}
  </Dropdown.Menu>
</Dropdown>

}
{((cartItem._id===this.state.currentTextFieldItem) || ( cartItem.count>=10) ) &&
                    
            <div style={{display:'flex'}}>
              {/* <input type="text" name="textFieldValue"  value={this.state.textFieldValue}   onChange={(e) => this.changeFieldVal(cartItem,e)} className="textField"/> */}
              <input type="text" name={cartItem._id} key={cartItem._id} onFocus={(e)=>this.changeOnEnter(cartItem._id,e)} onChange={this.handleChange.bind(this, index)} className="textField" defaultValue={this.state[cartItem._id] || cartItem.count}/>
              { (cartItem._id===this.state.currentTextFieldItem) && (this.state.currentUpdateBtnStatus) && 
 <Button className="updateCartBtn"  data-id={cartItem._id}  onClick={(e) => this.updateCartItem(cartItem,cartItem.selectedSize)} >Update</Button>
              }
             
              </div>
            }
           &nbsp;&nbsp;|&nbsp;&nbsp; <span style={{color:'#487448',cursor:'pointer',lineHeight:'3rem'}} onClick={()=>this.props.removeFromCart(cartItem,cartItem.selectedSize)}> Delete</span>
            </div>
           
                    </div>
                    <div >
                       
                       <b>{priceFormatter(cartItem.price)}</b>
                       
                    
                    </div>
                    </div>
                  
               </div>)
              })}
                </div> 
            <div className="felBox bottomCart">  <h2>Subtotal : <b>{totalCartPriceNproducts().totalCartPrice}</b></h2></div>    
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allCartItems: state.products.cartItems
    };
  };
  
  export default connect(mapStateToProps,{updateCartProduct,removeFromCart})(cartComponent);