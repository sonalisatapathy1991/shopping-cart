import axios from "axios";
import { FETCH_PRODUCTS,FETCH_SIZES,FILTERED_ITEMS,CART_ITEMS,REMOVE_FROM_CART, UPDATE_CART } from "../types";

export const fetchProduct = () => async (dispatch) =>{
  
    try {
    
        const response = await axios.get(`/api/products?${Date.now()}`);
       // console.log('response',response.data);
      
        dispatch({
            type: FETCH_PRODUCTS,
            payload:response.data
            
        })
      } catch (error) {
        
        console.error(error);
      }
}

export const fetchSizes = () => async (dispatch) =>{
 
try{
 
  const response = await axios.get(`/api/sizes?${Date.now()}`);
 // console.log('response',response.data);
  dispatch({
    type : FETCH_SIZES,
    payload: response.data
  })

}catch(error){
 
console.error(error);
}
 

}

export const filteredProducts = (products,size) => async (dispatch) =>{
dispatch({
  type:FILTERED_ITEMS,
  payload:{
    size,
    items: size === "" ? products : products.filter((x) => x.availableSizes.indexOf(size) >=0 )
  }
 
})
}
// export const fetchProduct = () => async (dispatch) => {

//   fetch(`/api/products?${Date.now()}`)
//       .then((response) => response.json())
//       .then((data) => console.log('This is your data', data));
// };

export const saveProductToCart = (product,selectedSize) => async (dispatch,getState) =>{
  const storedCartItems = JSON.parse(localStorage.getItem('savedCartItems'))?JSON.parse(localStorage.getItem('savedCartItems')):[];
  const cartItems = getState().products.cartItems && getState().products.cartItems.length >0 ? getState().products.cartItems : storedCartItems ;
  
  const count = 1;
  if(cartItems && cartItems.find(x => x._id=== product._id) && cartItems.find(x => x.selectedSize=== selectedSize)){
    //alert(1)
      cartItems.forEach(x => {
        if(x._id === product._id && x.selectedSize===selectedSize){
          x.count++;
          
         }
      });
   
  }else if(cartItems && cartItems.find(x => x._id=== product._id) && cartItems.find(x => x.selectedSize!== selectedSize)){
    //alert(2)
    cartItems.push({ ...product, count,selectedSize });
     }else{
      // alert(3)
      cartItems.push({ ...product, count,selectedSize });
     }
     console.log('cartItems Action',cartItems)
  localStorage.setItem('savedCartItems',JSON.stringify(cartItems));
  dispatch({
    type : CART_ITEMS,
    payload:JSON.stringify(cartItems)
  })

}
// Remove Items from cart

export const removeFromCart = (product,selectedSize) => (dispatch, getState) => {
  console.log('removed Product',product)
  const restCartItems = JSON.parse(localStorage.getItem('savedCartItems')).filter((x) => !(x._id === product._id && x.selectedSize===selectedSize));
  console.log('Rest Product',restCartItems)
  localStorage.setItem("savedCartItems", JSON.stringify(restCartItems));
   dispatch({ type: REMOVE_FROM_CART, payload: JSON.stringify(restCartItems)});
 
};

//update cart
export const updateCartProduct = (product,numberOfItem) =>(dispatch,getState) =>{
  const storedCartItems = JSON.parse(localStorage.getItem('savedCartItems'))?JSON.parse(localStorage.getItem('savedCartItems')):[];
  const cartItems = getState().products.cartItems && getState().products.cartItems.length >0 ? getState().products.cartItems : storedCartItems ;
  cartItems.forEach(cartItem=>{
    
    if(cartItem._id === product._id && cartItem.selectedSize === product.selectedSize ) {
      cartItem.count = numberOfItem;
     // console.log('new Arr',cartItem)
    }
  })
 //console.log('new Arr2',cartItems)
dispatch({
  type:UPDATE_CART,
  payload:JSON.stringify(cartItems)
})

localStorage.setItem("savedCartItems", JSON.stringify(cartItems));
}