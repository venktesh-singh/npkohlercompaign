import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';

const AddProduct = () => {
    const [addProduct, setAddProduct] = useState({
        product_title: '',
        product_subtitle: '',
        short_desc: '',
        long_desc: '',
        category: '',
        subcategory: '',
        attributes: [{ sku: '', single_img: null, price: '', sale_price: '', color_name: '', color_image: null, stock: '' }],
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
                const response = await fetch('http://localhost:4001/api/v1/categories/');
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

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setAddProduct((prevProduct) => ({ ...prevProduct, category: categoryId, subcategory: '' }));
        fetchSubcategories(categoryId);
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:4001/api/v1/subcategories/category/${categoryId}`, {
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
    
    const handleSubcategoryChange = (e) => {
        const subcategoryId = e.target.value;
        setAddProduct((prevProduct) => ({ ...prevProduct, subcategory: subcategoryId }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleAttributeChange = (index, e) => {
        const { name, value } = e.target;
        setAddProduct((prevProduct) => {
            const attributes = [...prevProduct.attributes];
            attributes[index] = { ...attributes[index], [name]: value };
            return { ...prevProduct, attributes };
        });
    };

    const handleImageSelect = (index, field, e) => {
        const file = e.target.files[0];
        setAddProduct((prevProduct) => {
            const attributes = [...prevProduct.attributes];
            attributes[index] = { ...attributes[index], [field]: file };
            return { ...prevProduct, attributes };
        });
    };

    const addAttribute = () => {
        setAddProduct((prevProduct) => ({
            ...prevProduct,
            attributes: [...prevProduct.attributes, { sku: '', single_img: null, price: '', sale_price: '', color_name: '', color_image: null, stock: '' }]
        }));
    };

    const removeAttribute = () => {
        setAddProduct((prevProduct) => {
            const { attributes } = prevProduct;
            const updatedAttributes = attributes.length > 1 ? attributes.slice(0,attributes.length-1) : attributes;
            return{
                ...prevProduct,
                attributes: updatedAttributes
            }
        });
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setAddProduct((prevProduct) => ({
            ...prevProduct,
            long_desc: data,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(addProduct).forEach((key) => {
                if (key === 'attributes') {
                    addProduct[key].forEach((attr, index) => {
                        Object.keys(attr).forEach((attrKey) => {
                            formData.append(`attributes[${index}][${attrKey}]`, attr[attrKey]);
                        });
                    });
                } else {
                    formData.append(key, addProduct[key]);
                }
            });

            const response = await fetch("http://localhost:4001/api/v1/products/add", {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const data = await response.json();
            console.log('Product added successfully:', data);
            toast.success('Product added successfully!', {
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
            console.error('Error adding product:', error.message);
        }
    };

    return (
        <>
            <style type="text/css">
                {`
                .mb-row {
                    margin-bottom: 1rem;
                }
                .ck-editor__editable {
                    min-height: 150px; 
                    max-height: 400px;
                    overflow-y: auto;  
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
                                    <Card.Title as="h5">Add Product</Card.Title>
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
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formProductName">
                                            <Form.Label><b>Product Name</b></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="product_title"
                                                value={addProduct.product_title || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formProductSubtitle">
                                            <Form.Label><b>Product Subtitle</b></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Subtitle"
                                                name="product_subtitle"
                                                value={addProduct.product_subtitle || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formShortDesc">
                                            <Form.Label><b>Short Description</b></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                placeholder="Enter Short Description"
                                                name="short_desc"
                                                value={addProduct.short_desc || ''}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={12}>
                                        <Form.Group controlId="formLongDesc">
                                            <Form.Label><b>Long Description</b></Form.Label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={addProduct.long_desc || ''}
                                                    onChange={(event, editor) => handleEditorChange(event, editor)}
                                                    config={{
                                                    toolbar: [
                                                        'undo', 'redo', '|',
                                                        'heading', '|', 'bold', 'italic', '|',
                                                        'paragraph', '|',
                                                        'link', 'insertTable', 'mediaEmbed', '|',
                                                        'bulletedList', 'numberedList', 'indent', 'outdent'
                                                    ],
                                                    }}
                                                    onReady={(editor) => {
                                                    console.log('Editor is ready to use!', editor);
                                                    }}
                                                />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Col md={4}>
                                        <Form.Group controlId="formCategory">
                                            <Form.Label><b>Category</b></Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={addProduct.category || ''}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Please Select Category</option>
                                                {categories?.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.cat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formSubCategory">
                                            <Form.Label><b>Sucategory</b></Form.Label>
                                            <Form.Select
                                                name="subcategory"
                                                value={addProduct.subcategory || ''}
                                                onChange={handleSubcategoryChange}
                                            >
                                                <option value="">Please Select Sub Category</option>
                                                {subcategories.map((subcategory) => (
                                                    <option key={subcategory._id} value={subcategory._id}>
                                                        {subcategory.subcat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Card className="mb-4">
                                    <Card.Header>
                                        <h5>Product Attributes</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {addProduct.attributes.map((attribute, index) => (
                                            <div key={index} className="mb-5">
                                                <Row className="mb-2">
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formSku${index}`}>
                                                            <Form.Label><b>SKU</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter SKU"
                                                                type="text"
                                                                name="sku"
                                                                value={attribute.sku}
                                                                onChange={(e) => handleAttributeChange(index, e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formPrice${index}`}>
                                                            <Form.Label><b>Price</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter price"
                                                                type="number"
                                                                name="price"
                                                                value={attribute.price}
                                                                onChange={(e) => handleAttributeChange(index, e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formSalePrice${index}`}>
                                                            <Form.Label><b>Sale Price</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter Sale price"
                                                                type="number"
                                                                name="sale_price"
                                                                value={attribute.sale_price}
                                                                onChange={(e) => handleAttributeChange(index, e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formColorName${index}`}>
                                                            <Form.Label><b>Color Name</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter color name"
                                                                type="text"
                                                                name="color_name"
                                                                value={attribute.color_name}
                                                                onChange={(e) => handleAttributeChange(index, e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formStock${index}`}>
                                                            <Form.Label><b>Stock</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter Stock"
                                                                type="number"
                                                                name="stock"
                                                                value={attribute.stock}
                                                                onChange={(e) => handleAttributeChange(index, e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formSingleImg${index}`}>
                                                            <Form.Label><b>Single Image</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter single image"
                                                                type="file"
                                                                name="single_img"
                                                                onChange={(e) => handleImageSelect(index, 'single_img', e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group controlId={`formColorImage${index}`}>
                                                            <Form.Label><b>Color Image</b></Form.Label>
                                                            <Form.Control
                                                                placeholder="Please Enter Color image"
                                                                type="file"
                                                                name="color_image"
                                                                onChange={(e) => handleImageSelect(index, 'color_image', e)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                        <Button variant="primary" onClick={addAttribute}>Add More Attributes</Button> 
                                        <Button variant="danger" onClick={removeAttribute}>Remove Attributes</Button>
                                    </Card.Body>
                                </Card>

                                <Button type="submit" className="mt-3">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AddProduct;
