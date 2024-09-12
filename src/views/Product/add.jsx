import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
import { BASE_URL } from '../../config/apiurl';
import JoditEditor from 'jodit-react';

const AddProduct = () => {
    const [addProduct, setAddProduct] = useState({
        product_title: '',
        product_subtitle: '',
        short_desc: '',
        long_desc: '',
        category: '',
        subcategory: '',
        subsubcategory: '',
        features:'',
        specs:'',
        installation_service:'',
        additional_info:'',
        returns_warranty:'',
        spend_save:'',
        need_help:'',
        free_shipping:'',
        attributes: [{ sku: '', sku_subtitle:'', single_img: null, price: '', sale_price: '', color_name: '', color_image: null, stock: '' }],
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [subsubcategories, setSubsubcategories] = useState([]);  // Added subsubcategories state
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleBackButtonClick = () => {
        navigate(-1);
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

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setAddProduct((prevProduct) => ({ ...prevProduct, category: categoryId, subcategory: '' }));
        fetchSubcategories(categoryId);
    };

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
    
    const handleSubcategoryChange = (e) => {
        const subcategoryId = e.target.value;
        setAddProduct((prevProduct) => ({ ...prevProduct, subcategory: subcategoryId, subsubcategory:'' }));
        fetchSubsubcategories(subcategoryId);
    };

    const fetchSubsubcategories = async (subcategoryId) => {
        try {
            const response = await fetch(`${BASE_URL}/subsubcategories/subcategory/${subcategoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch subsubcategories');
            }
            const data = await response.json();
            setSubsubcategories(data.subsubcategories);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubsubcategoryChange = (e) => {
        const subsubcategoryId = e.target.value;
        setAddProduct((prevProduct) => ({ ...prevProduct, subsubcategory: subsubcategoryId }));
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
            attributes: [...prevProduct.attributes, { sku: '', sku_subtitle:'', single_img: null, price: '', sale_price: '', color_name: '', color_image: null, stock: '' }]
        }));
    };

    const removeAttribute = () => {
        setAddProduct((prevProduct) => {
            const { attributes } = prevProduct;
            const updatedAttributes = attributes.length > 1 ? attributes.slice(0,attributes.length-1) : attributes;
            return {
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

    const handleEditor2Change = (field) => (content) => {
        setAddProduct((prevProduct) => ({
            ...prevProduct,
            [field]: content
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

            const response = await fetch(`${BASE_URL}/products/add`, {
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
                                    <Col md={4}>
                                        <Form.Group controlId="formCategory">
                                            <Form.Label><b>Category</b></Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="category"
                                                value={addProduct.category || ''}
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
                                    <Col md={4}>
                                        <Form.Group controlId="formSubcategory">
                                            <Form.Label><b>Subcategory</b></Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="subcategory"
                                                value={addProduct.subcategory || ''}
                                                onChange={handleSubcategoryChange}
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
                                    <Col md={4}>
                                        <Form.Group controlId="formSubsubcategory">
                                            <Form.Label><b>Subsubcategory</b></Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="subsubcategory"
                                                value={addProduct.subsubcategory || ''}
                                                onChange={handleSubsubcategoryChange}
                                            >
                                                <option value="">Select Subsubcategory</option>
                                                {subsubcategories.map((subsubcategory) => (
                                                    <option key={subsubcategory._id} value={subsubcategory._id}>
                                                        {subsubcategory.subsubcat_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
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
                                                onChange={handleEditorChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Card.Header>
                                        <Card.Title as="h5">Product Attributes</Card.Title>
                                    </Card.Header>
                                    <Col md={12}>
                                        <Card className="mb-3">
                                            <Card.Body>
                                                {addProduct.attributes.map((attribute, index) => (
                                                    <div key={index}>
                                                        <Row className="mb-3">
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formSKU${index}`}>
                                                                    <Form.Label>SKU</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Enter SKU"
                                                                        name="sku"
                                                                        value={attribute.sku}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formSKU${index}`}>
                                                                    <Form.Label>SubTitle</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Enter SKU Subtitle"
                                                                        name="sku_subtitle"
                                                                        value={attribute.sku_subtitle}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formPrice${index}`}>
                                                                    <Form.Label>Price</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter Price"
                                                                        name="price"
                                                                        value={attribute.price}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formSalePrice${index}`}>
                                                                    <Form.Label>Sale Price</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter Sale Price"
                                                                        name="sale_price"
                                                                        value={attribute.sale_price}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formStock${index}`}>
                                                                    <Form.Label>Stock</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter Stock"
                                                                        name="stock"
                                                                        value={attribute.stock}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formSingleImg${index}`}>
                                                                    <Form.Label>Single Image</Form.Label>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="single_img"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleImageSelect(index, 'single_img', e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formColorName${index}`}>
                                                                    <Form.Label>Color Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Enter Color Name"
                                                                        name="color_name"
                                                                        value={attribute.color_name}
                                                                        onChange={(e) => handleAttributeChange(index, e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group controlId={`formColorImage${index}`}>
                                                                    <Form.Label>Color Image</Form.Label>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="color_image"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleImageSelect(index, 'color_image', e)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                                <Button variant="outline-primary" onClick={addAttribute}>Add Attribute</Button>
                                                {' '}
                                                <Button variant="outline-danger" onClick={removeAttribute}>Remove Last Attribute</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="mb-row">
                                    <Card.Header>
                                        <Card.Title as="h5">Product Detail</Card.Title>
                                    </Card.Header>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formFeatures">
                                            <Form.Label><h3>Features</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.features || ''}
                                                onChange={handleEditor2Change('features')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formSpecs">
                                            <Form.Label><h3>Specs</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.specs || ''}
                                                onChange={handleEditor2Change('specs')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formInstallationService">
                                            <Form.Label><h3>Installation & Service Parts</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.installation_service || ''}
                                                onChange={handleEditor2Change('installation_service')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formAdditionalInfo">
                                            <Form.Label><h3>Additional Information</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.additional_info || ''}
                                                onChange={handleEditor2Change('additional_info')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formReturnsWarranty">
                                            <Form.Label><h3>Returns & Warranty</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.returns_warranty || ''}
                                                onChange={handleEditor2Change('returns_warranty')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formSpendSave">
                                            <Form.Label><h3>Spend & Save</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.spend_save || ''}
                                                onChange={handleEditor2Change('spend_save')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formNeedHelp">
                                            <Form.Label><h3>Need Help</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.need_help || ''}
                                                onChange={handleEditor2Change('need_help')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-5">
                                        <Form.Group controlId="formFreeShipping">
                                            <Form.Label><h3>Free Shipping</h3></Form.Label>
                                            <JoditEditor
                                                value={addProduct.free_shipping || ''}
                                                onChange={handleEditor2Change('free_shipping')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AddProduct;
