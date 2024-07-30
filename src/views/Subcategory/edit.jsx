import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config/apiurl';

const SubCategoryUpdate = () => {
    const location = useLocation();
    const id = location?.state?.cat?._id || '';
    const [updateSubcategory, setUpdateSubcategory] = useState({
        category: '', 
        subcat_name: '',
        meta_title: '',
        meta_desc: ''
    });
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateSubcategory((prevSubcategory) => ({ ...prevSubcategory, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setUpdateSubcategory((prevSubcategory) => ({
            ...prevSubcategory,
            category: categoryId
        }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/categories/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.category || []);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (location?.state?.cat) {
            const { category = '', subcat_name = '', meta_title = '', meta_desc = '' } = location.state.cat;
            setUpdateSubcategory({
                category,  // This should be a category ID string
                subcat_name,
                meta_title,
                meta_desc
            });
        }
    }, [location.state.cat]);
    console.log("Subcategory check", updateSubcategory.category._id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!updateSubcategory.category || !updateSubcategory.subcat_name) {
            toast.error('Category and Subcategory Name are required');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/subcategories/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateSubcategory),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to update subcategory');
            }

            const data = await response.json();
            console.log('Subcategory updated successfully:', data);
            toast.success('Subcategory updated successfully!', {
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
            console.error('Error updating subcategory:', error.message);
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
                .form-control option.selected {
                    font-weight: bold;
                    background-color: #d8d8d8;
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
                                    <Card.Title as="h5">Update Subcategory</Card.Title>
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
                                        <Form.Group controlId="formCategoryName">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={updateSubcategory.category} 
                                                onChange={handleCategoryChange}
                                                className="form-control"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option
                                                        key={cat._id}
                                                        value={cat._id}
                                                        className={updateSubcategory.category._id === cat._id ? 'selected' : ''}
                                                    >
                                                        {cat.cat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formSubcategoryName">
                                            <Form.Label>Subcategory Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Subcategory Name"
                                                name="subcat_name"
                                                value={updateSubcategory.subcat_name}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formMetaTitle">
                                            <Form.Label>Meta Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Meta Title"
                                                name="meta_title"
                                                value={updateSubcategory.meta_title}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formMetaDescription">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter Meta Description"
                                                name="meta_desc"
                                                value={updateSubcategory.meta_desc}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="submit" className="mt-3">Update Subcategory</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SubCategoryUpdate;
