import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config/apiurl';

const AddSubSubcategory = () => {
    const [addSubsubcategory, setAddSubsubcategory] = useState({
        cat_name: '',
        subcat_name: '',
        subsubcat_name: '',
        subsubcat_url: '',
        metaTitle: '',
        metaDescription: ''
    });
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (addSubsubcategory.subsubcat_name) {
            const generatedUrl = addSubsubcategory.subsubcat_name
                .toLowerCase()
                .replace(/'s/g, '') 
                .replace(/[^a-z0-9]+/g, '-') 
                .replace(/^-+|-+$/g, ''); 
    
                setAddSubsubcategory((prevCategory) => ({
                ...prevCategory,
                subsubcat_url: generatedUrl,
            }));
        }
    }, [addSubsubcategory.subsubcat_name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddSubsubcategory((prevSubsubcategory) => ({ ...prevSubsubcategory, [name]: value }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/categories/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.category);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    
    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to fetch subcategories');
            }
            const data = await response.json();
            setSubcategories(data.subcategories);
        } catch (error) {
            console.error("An error occurred while fetching subcategories:", error);
            setError(error.message);
        }
    };
    

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        console.log('Selected Category ID:', categoryId); // Debugging log
        setAddSubsubcategory((prevSubsubcategory) => ({ ...prevSubsubcategory, cat_name: categoryId }));
        fetchSubcategories(categoryId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Debugging log to check what is being submitted
        console.log('Submitting Data:', addSubsubcategory);
    
        if (!addSubsubcategory.cat_name || !addSubsubcategory.subcat_name || !addSubsubcategory.subsubcat_name) {
            toast.error('Category, Subcategory, and Subsubcategory Names are required');
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/subsubcategories/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: addSubsubcategory.cat_name,
                    subcategory: addSubsubcategory.subcat_name,
                    subsubcat_name: addSubsubcategory.subsubcat_name,
                    subsubcat_url: addSubsubcategory.subsubcat_url,
                    meta_title: addSubsubcategory.metaTitle,
                    meta_desc: addSubsubcategory.metaDescription,
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to add subsubcategory');
            }
    
            toast.success('Subsubcategory added successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            navigate(-1);
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
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
                <ToastContainer />
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center mb-row">
                                <Col>
                                    <Card.Title as="h5">Add Subsubcategory</Card.Title>
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
                                                name="cat_name"
                                                value={addSubsubcategory.cat_name}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.cat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="formSubcategoryName">
                                            <Form.Label>Subcategory</Form.Label>
                                            <Form.Select
                                                name="subcat_name"
                                                value={addSubsubcategory.subcat_name}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {subcategories.map((subcategory) => (
                                                    <option key={subcategory._id} value={subcategory._id}>
                                                        {subcategory.subcat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formSubsubcategoryName">
                                            <Form.Label>Subsubcategory Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Subsubcategory Name"
                                                name="subsubcat_name"
                                                value={addSubsubcategory.subsubcat_name}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formMetaTitle">
                                            <Form.Label>Meta Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Meta Title"
                                                name="metaTitle"
                                                value={addSubsubcategory.metaTitle}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formMetaDescription">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter Meta Description"
                                                name="metaDescription"
                                                value={addSubsubcategory.metaDescription}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formCategoryUrl">
                                            <Form.Label>SubsubCategory URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Subsubcategory URL"
                                                name="subsubcat_url"
                                                value={addSubsubcategory.subsubcat_url}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" className="mt-3">Add Subsubcategory</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AddSubSubcategory;
