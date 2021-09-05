import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { withRouter } from 'react-router'
import { fetchProduct } from '../actions/productActions';


// import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../css/style.css';
const SignInSchema = Yup.object().shape({
    userName: Yup.string().required("* Name is required").min(2, "* Names must have at least 2 characters"),
    userEmail: Yup.string().email("* Email is not valid").required("* Email is required"),
    userPassword: Yup.string().required("* Password is required").min(6, "* Password must have at least 6 characters"),
    userConfirmPassword: Yup.string().when('userPassword', (userPassword, field) =>
        userPassword ? field.required().oneOf([Yup.ref('userPassword')], '* Passwords does not match') : field
    ),


});
const initialValues = {
    userName: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: ''

}

function UserRegister() {
    //  let history = useHistory();

    useEffect(() => {
        // alert(9)
        window.localStorage.clear();
    }, [])
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => {

                const { userName, userEmail } = values;
                localStorage.setItem('loggedUser', userName);
                window.location = 'http://localhost:8081/';

            }}
        >
            {(formik) => {
                const { values, errors, touched, isValid, dirty, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;


                return (
                    <Container>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={handleSubmit} className="user RegisterForm">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="userName" onChange={handleChange} onBlur={handleBlur} value={values.userName} className={errors.userName && touched.userName ?
                                            "inputError" : null} placeholder="Enter your name" />
                                        <ErrorMessage name="userName" component="span" className="error" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="userEmail" onChange={handleChange} onBlur={handleBlur} value={values.userEmail} className={errors.userEmail && touched.userEmail ?
                                            "inputError" : null} placeholder="Enter your email" />
                                        <ErrorMessage name="userEmail" component="span" className="error" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="userPassword" onChange={handleChange} onBlur={handleBlur} value={values.userPassword} className={errors.userPassword && touched.userPassword ?
                                            "inputError" : null} placeholder="Enter your Password" />
                                        <ErrorMessage name="userPassword" component="span" className="error" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name="userConfirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.userConfirmPassword} className={errors.userConfirmPassword && touched.userConfirmPassword ?
                                            "inputError" : null} placeholder="Re-enter your Password" />
                                        <ErrorMessage name="userConfirmPassword" component="span" className="error" />
                                    </Form.Group>
                                    <Button type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid)}
                                    >
                                        Sign In
                                    </Button>

                                </Form>
                            </Col>

                        </Row>

                    </Container>);
            }}
        </Formik >
    );
}

export default UserRegister;