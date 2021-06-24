import Header  from "./component/header";
import Footer  from "./component/footer";

// import {Container} from 'react-bootstrap';
import Products from './component/products';

function App() {
  return (
    <div style={{height:'100%'}}>
    <Header/>
    
     <Products/>
 
    <Footer/>
    </div>
  );
}

export default App;
