import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
    userEmail: '',
    userPassword: ''
}
const loginSchema = Yup.object().shape({
    userEmail: Yup.string().required("* Email is required").email("* Please enter a valid email"),
    userPassword: Yup.string().required("* Password is required").min(6, "* Password must have at least 6 characters")
})
const userLogin = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={(values) => { console.log(values) }}>
            {(formik) => {
                const { values, errors, touched, isValid, dirty, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;
                return (
                    <Container>
                        <Row><Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleSubmit} className="user RegisterForm">
                                <h1 className="signLabelText">Sign-In</h1>
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
                                <Button type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}
                                >
                                    Login
                                </Button>
                            </Form>
                            <Row><Col xs={12}>
                                <div className="hrSect">New to Shopping Haul ?</div>
                                <span className="createBtnSpan">
                                    <Link to="/Register">Creatr your Shopping Haul Account</Link>
                                </span>
                            </Col></Row>
                        </Col></Row>
                    </Container>
                )
            }}
        </Formik>
    );
}

export default userLogin;