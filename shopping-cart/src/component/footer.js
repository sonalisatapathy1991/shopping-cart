import React from 'react';
import {Container} from 'react-bootstrap';

const Footer = () => {
    const footerCls = {backgroundColor:'#202311',
    color:'white',
    textAlign:'center',
    position:'sticky',
    bottom:0
}
    return (
        <Container style={footerCls} fluid> 
All rights reserved.
        </Container>
    );
}

export default Footer;