import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPinCode = () => {
    const [addPincode, setAddPincode] = useState({
        pincode: '',
        deliveryAvailable: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddPincode((prevPincode) => ({ ...prevPincode, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/v1/pincodes/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addPincode),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add Pin code');
            }

            const data = await response.json();
            console.log('Pincode added successfully:', data);
            toast.success('Pincode added successfully!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate(-1); // Optionally navigate back after successful submission
        } catch (error) {
            console.error('Error adding Pincode:', error.message);
            setError(error.message); // Set the error state
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

    console.log("Add Pincode:",addPincode);

    return (
        <>
            <style type="text/css">
                {`
                .mb-row {
                    margin-bottom: 1rem; /* Adjust the value as needed */
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
                                    <Card.Title as="h5">Add Pincode</Card.Title>
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
                                    <Col md={4}>
                                        <Form.Group controlId="formCategoryName">
                                            <Form.Label>Pincode Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Pincode Number"
                                                name="pincode"
                                                value={addPincode.pincode}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formMetaTitle">
                                            <Form.Label>Delivery Available</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                name="deliveryAvailable"
                                                checked={addPincode.deliveryAvailable || false}
                                                onChange={(e) => setAddPincode((prevPincode) => ({
                                                    ...prevPincode,
                                                    deliveryAvailable: e.target.checked,
                                                }))}
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                <Button type="submit" className="mt-3">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AddPinCode;


