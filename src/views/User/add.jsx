import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewUser() {
    const [addUser, setAddUser] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddUser((prevUser) => ({ ...prevUser, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/v1/users/add", {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addUser),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to add user');
            }

            const data = await response.json();
            console.log('User added successfully:', data);
            toast.success('User added successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate(-1);
        } catch (error) {
            console.error('Error adding user:', error.message);
            setError(error.message);
            toast.error(`Error: ${error.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return (
        <>
            <style type="text/css">
                {`
                .mb-row {
                    margin-bottom: 1rem;
                }
                `}
            </style>
            <Row className="justify-content-md-center mt-4">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center mb-row">
                                <Col>
                                    <Card.Title as="h5">Add User</Card.Title>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        className="mb-2"
                                        variant="primary"
                                        onClick={handleBackButtonClick}
                                    >
                                        <FiArrowLeft style={{ marginRight: '5px', fontSize: '15px' }} /> Back
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>User</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                name="username"
                                                value={addUser.username || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Email"
                                                name="email"
                                                value={addUser.email || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                name="password"
                                                value={addUser.password || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formPhone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Phone"
                                                name="phone"
                                                value={addUser.phone || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formApartment">
                                            <Form.Label>Apartment Or House Number Or Village</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Apartment Or House Number"
                                                name="apartment"
                                                value={addUser.apartment || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formStreet">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Street"
                                                name="street"
                                                value={addUser.street || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formCity">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Your City"
                                                name="city"
                                                value={addUser.city || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formZip">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Zip"
                                                name="zip"
                                                value={addUser.zip || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formCountry">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Country Name"
                                                name="country"
                                                value={addUser.country || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formIsAdmin">
                                            <Form.Label>Is Admin</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                label="Is Admin"
                                                name="isAdmin"
                                                checked={addUser.isAdmin || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="submit" className="mt-3">Add User</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default AddNewUser;
