import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config/apiurl';

const UpdateCategory = () => {
    const location = useLocation();
    const id = location.state?.cat._id;
    const [updatedCategory, setUpdatedCategory] = useState(location.state?.cat || {});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    useEffect(() => {
        if (updatedCategory.cat_name) {
            const generatedUrl = updatedCategory.cat_name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') 
                .replace(/^-+|-+$/g, ''); 
    
            setUpdatedCategory((prevCategory) => ({
                ...prevCategory,
                cat_url: generatedUrl,
            }));
        }
    }, [updatedCategory.cat_name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/categories/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update category');
            }

            const data = await response.json();
            toast.success(data.message || 'Category updated successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate(-1); // Navigate back after successful submission
        } catch (error) {
            console.error('Error updating category:', error.message);
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
                                    <Card.Title as="h5">Update Category</Card.Title>
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
                                            <Form.Label>Category Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Category Name"
                                                name="cat_name"
                                                value={updatedCategory.cat_name}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formMetaTitle">
                                            <Form.Label>Meta Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Meta Title"
                                                name="metaTitle"
                                                value={updatedCategory.metaTitle}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formMetaDescription">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter Meta Description"
                                                name="metaDescription"
                                                value={updatedCategory.metaDescription}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formCategoryUrl">
                                            <Form.Label>Category URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Category URL"
                                                name="cat_url"
                                                value={updatedCategory.cat_url}
                                                onChange={handleChange}
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

export default UpdateCategory;
