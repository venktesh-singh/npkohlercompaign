import React from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import moment from 'moment';
import DOMPurify from 'dompurify';

const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const proData = location.state?.prod;

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    console.log("Product Detail:", proData);

    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title as="h5">Product Detail</Card.Title>
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
                            <Row>
                                <Col md={4}>
                                    <Card.Text><b>Name:</b> {proData?.product_title}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text><b>Subtitle:</b> {proData?.product_subtitle}</Card.Text>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col md={4}>
                                    <Card.Text><b>Category:</b> {proData?.category?.cat_name}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text><b>Subcategory:</b> {proData?.subcategory?.subcat_name}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text><b>Subsubcategory:</b> {proData?.subsubcategory?.subsubcat_name}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className='mt-4'>
                                    <Card.Text><b>Short Desc:</b> {proData?.short_desc}</Card.Text>
                                </Col>
                                <Col md={12} className='mt-4'>
                                    <Card.Text><b>Long Desc:</b> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.long_desc || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className='mt-4'>
                                    <Card.Text><b>Date Created:</b> {moment(proData?.dateCreated).format('Do MMMM YYYY')}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title as="h5">Product Attributes</Card.Title>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            {proData?.attributes?.map((att, index) => (
                                <Row key={index} className="mb-3">
                                    <Col md={4}>
                                        <Card.Text><b>SKU:</b> {att?.sku}</Card.Text>
                                    </Col>
                                    
                                    <Col md={4}>
                                        <Card.Text><b>Color Name:</b> {att?.color_name}</Card.Text>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Text><b>Price:</b> {att?.price}</Card.Text>
                                    </Col>
                                    <Col md={4} className='mt-4'>
                                        <Card.Text><b>Sale Price:</b> {att?.sale_price}</Card.Text>
                                    </Col>
                                    <Col md={4} className='mt-4'>
                                        <Card.Text><b>Stock:</b> {att?.stock}</Card.Text>
                                    </Col>
                                    <Col md={4} className='mt-4'>
                                        <Card.Text>
                                            <b>Single Image:</b> <Image src={att?.single_img} height={30} width={30} alt={att?.sku} fluid />
                                        </Card.Text>
                                    </Col>
                                    <Col md={4} className='mt-4'>
                                        <Card.Text>
                                            <b>Color Image:</b> <Image src={att?.color_image} height={30} width={30} alt={att?.color_name} fluid />
                                        </Card.Text>
                                    </Col>
                                    
                                </Row>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title as="h5">Product Attributes</Card.Title>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            
                            <Row className="mb-3">
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Features:</h3>  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.features || '') }} /></Card.Text>
                                </Col>
                                
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Specs:</h3>  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.specs || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Installation & Service Parts:</h3>  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.installation_service || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Additional Information:</h3><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.additional_info || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Returns & Warranty:</h3> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.returns_warranty || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Spend & Save:</h3> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.spend_save || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text><h3>Need Help:</h3> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.need_help || '') }} /></Card.Text>
                                </Col>
                                <Col md={12} className="mb-3">
                                    <Card.Text>
                                        <h3>Free Shipping:</h3>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proData?.free_shipping || '') }} />
                                    </Card.Text>
                                </Col>
                            </Row>
                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetail;
