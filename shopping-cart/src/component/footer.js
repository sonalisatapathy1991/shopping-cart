import React from 'react';
import {Container} from 'react-bootstrap';

const Footer = () => {
    const footerCls = {backgroundColor:'#202311',
    color:'#e9ecef',
    textAlign:'center',
    position:'fixed',
    bottom:0
}
    return (
        <Container style={footerCls} fluid> 
All rights reserved.
        </Container>
    );
}

export default Footer;

 
