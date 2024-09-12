import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductUpdate() {
    const location = useLocation();
    const productFromLocation = location.state?.prod;
    const id = productFromLocation?._id;
    const [updateProduct, setUpdateProduct] = useState({
        product_gallery: [],  
        ...productFromLocation 
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/categories/');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    const fetchSubcategories = async (categoryID) => {
        try{
            const response = await fetch(`http://localhost:4000/api/v1/subcategories/category/${categoryID}`);
            if(!response.ok){
                throw new Error('Failed to fetch Sub Categories');
            }
            const data = await response.json();
            setSubcategories(data);
        } catch (error) {
            console.error("An error occurred while fetching subcategories:", error);
        }
    }

    const handleCategoryChange = (e) => {
        const categoryID = e.target.value;
        setUpdateProduct((prevProduct) => ({
            ...prevProduct,
            category: categoryID,
            subcategory: '' // Reset subcategory when category changes
        }));
        fetchSubcategories(categoryID);
    };

    const handleSubcategoryChange = (e) => {
        const subcategoryId = e.target.value;
        setUpdateProduct((prevProduct) => ({ ...prevProduct, subcategory: subcategoryId }));
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        setUpdateProduct((prevProduct) => ({
            ...prevProduct,
            product_img: file
        }));
    };

    const handleMultipleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        console.log("Slect Multiple Files:",files); 
        setUpdateProduct((prevProduct) => ({
            ...prevProduct,
            product_gallery: files
        }));
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            // Append product_gallery files
            updateProduct.product_gallery.forEach(file => {
                formData.append('product_gallery', file);
            });
    
            // Append product_img if it exists
            if (updateProduct.product_img) {
                formData.append('product_img', updateProduct.product_img);
            }
    
            // Append other fields
            Object.keys(updateProduct).forEach(key => {
                if (key !== 'product_gallery' && key !== 'product_img') {
                    formData.append(key, updateProduct[key]);
                }
            });
    
            const response = await fetch(`http://localhost:4000/api/v1/products/edit/${id}`, {
                method: 'PUT',
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }
    
            const data = await response.json();
            console.log('Product updated successfully:', data);
            toast.success('Product updated successfully!', {
                position: "top-center",
                autoClose: 3000, // Adjusted to 3000 milliseconds (3 seconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate(-1);
        } catch (error) {
            console.error('Error updating product:', error.message);
            toast.error('Error updating product: ' + error.message, {
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
    
    console.log("Check Product Images count",updateProduct); 
  
    
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
                />
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center mb-row">
                                <Col>
                                    <Card.Title as="h5">Update Product</Card.Title>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        className="mb-2"
                                        variant="primary"
                                        onClick={handleBackButtonClick}>
                                        <FiArrowLeft style={{ marginRight: '5px', fontSize: '15px' }} /> Back
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <Row className="mb-row">  
                                    <Col md={4}>
                                        <Form.Group controlId="formProductName">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="product_name"
                                                value={updateProduct.product_name || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formCountInStock">
                                            <Form.Label>Count In Stock</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Count In Stock"
                                                name="countInStock"
                                                value={updateProduct.countInStock || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formBrand">
                                            <Form.Label>Brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Brand Name"
                                                name="brand"
                                                value={updateProduct.brand || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Enter Product Description"
                                                name="description"
                                                value={updateProduct.description || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formNumReviews">
                                            <Form.Label>Number of Reviews</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Number of Reviews"
                                                name="numReviews"
                                                value={updateProduct.numReviews || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formPrice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Price"
                                                name="price"
                                                value={updateProduct.price || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formRating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Product Rating"
                                                name="rating"
                                                value={updateProduct.rating || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formRichDescription">
                                            <Form.Label>Long Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Enter Product Long Description"
                                                name="richDescription"
                                                value={updateProduct.richDescription || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formCategory">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="category"
                                                value={updateProduct.category || ''}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Please Select Category</option>
                                                {categories.map((cat) => (  
                                                    <option key={cat._id} value={cat._id} className={cat._id === updateProduct.category._id ? 'selected' : ''}>  
                                                        {cat.cat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group controlId="formSubcategory">
                                            <Form.Label>Sub Category</Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="subcategory"
                                                value={updateProduct.subcategory || ''}
                                                onChange={handleSubcategoryChange}
                                            >
                                                <option value="">Please Select Subcategory</option>
                                                {subcategories.map((subcat) => (
                                                    <option key={subcat._id} value={subcat._id} className={subcat._id === updateProduct.subcategory._id ? 'selected' : ''}>
                                                        {subcat.subcat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formMetaTitle">
                                            <Form.Label>Meta Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Meta Title"
                                                name="metaTitle"
                                                value={updateProduct.metaTitle || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formMetaDescription">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Enter Product Meta Description"
                                                name="metaDescription"
                                                value={updateProduct.metaDescription || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formImage">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="product_img" // Match Multer field name
                                                onChange={handleImageSelect}
                                            />
                                            {updateProduct.product_img && (
                                                <Image  height={50} width={50}
                                                    src={
                                                        typeof updateProduct.product_img === 'string'
                                                            ? updateProduct.product_img
                                                            : URL.createObjectURL(updateProduct.product_img)
                                                    }
                                                    alt="Selected Product Image"
                                                    fluid
                                                />
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row className="mb-row">
                                    <Col md={6}>
                                        <Form.Group controlId="formMultipleImage">
                                            <Form.Label>Product Gallery</Form.Label>
                                            <Form.Control
                                                multiple
                                                type="file"
                                                name="product_gallery" // Match Multer field name
                                                onChange={handleMultipleImageUpload}
                                            />
                                            <div>
                                                {updateProduct.product_gallery &&
                                                    Array.from(updateProduct.product_gallery).map((file, index) => (
                                                        <Image height={50} width={50}
                                                            key={index}
                                                            src={
                                                                typeof file === 'string'
                                                                    ? file
                                                                    : URL.createObjectURL(file)
                                                            }
                                                            alt={`Selected Gallery Image ${index}`}
                                                            fluid
                                                        />
                                                    ))}
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formFeatured">
                                            <Form.Label>Is Featured?</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                name="isFeatured"
                                                checked={updateProduct.isFeatured || false}
                                                onChange={(e) => setUpdateProduct((prevProduct) => ({
                                                    ...prevProduct,
                                                    isFeatured: e.target.checked,
                                                }))}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Update Product
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProductUpdate;
