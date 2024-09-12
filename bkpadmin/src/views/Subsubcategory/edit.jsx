import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config/apiurl';

const UpdateSubSubcategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location?.state?.cat?.id || '';
    console.log("Subsubcategory", id)
    const [updateSubsubcategory, setUpdateSubsubcategory] = useState({
        cat_name: '',
        subcat_name: '',
        subsubcat_name: '',
        subsubcat_url: '',
        meta_title: '',
        meta_desc: ''
    });

    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (updateSubsubcategory.subsubcat_name) {
            const generatedUrl = updateSubsubcategory.subsubcat_name
                .toLowerCase()
                .replace(/'s/g, '') 
                .replace(/[^a-z0-9]+/g, '-') 
                .replace(/^-+|-+$/g, ''); 
    
                setUpdateSubsubcategory((prevCategory) => ({
                ...prevCategory,
                subsubcat_url: generatedUrl,
            }));
        }
    }, [updateSubsubcategory.subsubcat_name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateSubsubcategory((prevSubsubcategory) => ({
            ...prevSubsubcategory,
            [name]: value
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
                setCategories(data.category);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    //console.log("Check Category ID",categoryId)
    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error(errorData.message || 'Failed to fetch subcategories');
            }
            const data = await response.json();
            console.log('Fetched Subcategories:', data); // Debugging log
            setSubcategories(data.subcategories);
        } catch (error) {
            console.error("An error occurred while fetching subcategories:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (location?.state?.cat) {
            const { cat_name = '', subcat_name = '', subsubcat_name = '', meta_title = '', meta_desc = '' } = location.state.cat;
            setUpdateSubsubcategory({
                cat_name,  // Ensure this is a category ID string
                subcat_name,
                subsubcat_name,
                meta_title: meta_title,
                meta_desc: meta_desc
            });

            // Fetch subcategories of the selected category
            if (cat_name) {
                fetchSubcategories(cat_name);
            }
        }
    }, [location.state.cat]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        console.log('Selected Category ID:', categoryId); // Check if this logs the correct ID
        setUpdateSubsubcategory((prevSubsubcategory) => ({
            ...prevSubsubcategory,
            cat_name: categoryId,
            subcat_name: '' // Reset subcategory when category changes
        }));
        fetchSubcategories(categoryId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!updateSubsubcategory.cat_name || !updateSubsubcategory.subcat_name || !updateSubsubcategory.subsubcat_name) {
            toast.error('Category, Subcategory, and Subsubcategory Names are required');
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/subsubcategories/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: updateSubsubcategory.cat_name,
                    subcategory: updateSubsubcategory.subcat_name,
                    subsubcat_name: updateSubsubcategory.subsubcat_name,
                    subsubcat_url: updateSubsubcategory.subsubcat_url,
                    meta_title: updateSubsubcategory.meta_title,
                    meta_desc: updateSubsubcategory.meta_desc,
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to update subsubcategory');
            }
    
            toast.success('Subsubcategory updated successfully!', {
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

    console.log("Check category", updateSubsubcategory)
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
                                    <Card.Title as="h5">Update Subsubcategory</Card.Title>
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
                                            <Form.Label>Select Category</Form.Label>
                                            <Form.Select
                                                name="cat_name"
                                                value={updateSubsubcategory.cat_name}
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
                                            <Form.Label>Select Subcategory</Form.Label>
                                            <Form.Select
                                                name="subcat_name"
                                                value={updateSubsubcategory.subcat_name}
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
                                                value={updateSubsubcategory.subsubcat_name}
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
                                                name="meta_title"
                                                value={updateSubsubcategory.meta_title}
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
                                                name="meta_desc"
                                                value={updateSubsubcategory.meta_desc}
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
                                                value={updateSubsubcategory.subsubcat_url}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="submit" className="mt-3">Update Subsubcategory</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default UpdateSubSubcategory;
