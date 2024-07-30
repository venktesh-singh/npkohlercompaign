import React, { useState } from 'react';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import logo from '../../../image/logo.png'
import { BASE_URL } from '../../../config/apiurl';

const Signin1 = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token-info', data.token);
        localStorage.setItem('user-info', JSON.stringify(data));

        if (data.isAdmin === true) {
          navigate('/app/dashboard/default');
        } else {
          console.error('User is not an admin');
        }
      } else {
        console.error('Token not found in response data');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message); // Set the error message received from backend
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="">
                <img src={logo} alt="NP Kohler Compaign"/>
              </div>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required'),
                })}
                onSubmit={handleSubmit}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        placeholder='Please Enter Your Email'
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                      />
                      {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        placeholder='Please Enter Your Password'
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                      />
                      {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                    </div>

                    {error && (
                      <Col sm={12}>
                        <Alert variant="danger">{error}</Alert>
                      </Col>
                    )}

                    <Row>
                      <Col mt={2}>
                        <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                          Dashboard Login
                        </Button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
