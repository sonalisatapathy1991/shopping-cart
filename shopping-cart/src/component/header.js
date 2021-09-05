import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Style from 'style-it';
//import { useLocation } from 'react-router-dom';

const Header = () => {
  const headerCls = {
    position: 'sticky',
    top: 0,
    backgroundColor: '#202311',
    padding: '0.8rem',
    zIndex: 1
  }
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(localStorage.getItem('loggedUser'))

  })

  return (

    <>
      <Style>
        {`
        .intro{
            color: white !important;
            font-size:2.2rem !important;
        }
        .intro:hover {
          color: #ca650e !important;git remote add origin https://github.com/sonalisatapathy1991/shopping-cart.git
        }
      `}

      </Style>

      <Navbar style={headerCls} variant="dark" expand="lg">
        <Container fluid style={{ 'paddingLeft': 0 }}>
          <Navbar.Brand href="/" className="intro">Shopping Haul</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user &&
              <Navbar.Text>

                <i className="fa fa-user" style={{ 'color': '#cfdddde8', 'fontSize': '2.5rem', 'paddingRight': '5px' }} aria-hidden="true"></i>
                <span style={{ 'color': '#cfdddde8' }}>   {user}  </span>
              </Navbar.Text>
            }
          </Navbar.Collapse>




        </Container>
      </Navbar>
    </>


  );
}

export default Header;