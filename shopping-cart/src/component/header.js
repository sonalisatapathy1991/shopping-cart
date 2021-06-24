import React from 'react';
import {Navbar} from 'react-bootstrap';
import Style from 'style-it';

const Header = () => {
    const headerCls = {
        position:'sticky',
       top:0,
       backgroundColor:'#202311',
       padding:'0.8rem',
       zIndex:1
    }
   
    return (
        
        <>
         <Style>
      {`
        .intro{
            color: white !important;
            font-size:2.4rem !important;
        }
        .intro:hover {
          color: #ca650e !important;git remote add origin https://github.com/sonalisatapathy1991/shopping-cart.git
        }
      `}

      </Style>
      
<Navbar style={headerCls} expand="lg">
  <Navbar.Brand href="#" className="intro">React-Bootstrap</Navbar.Brand>
 
 
</Navbar>
</>
        
        
    );
}

export default Header;