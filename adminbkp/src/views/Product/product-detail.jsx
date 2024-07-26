import React from 'react';
import {  Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import moment from 'moment';

const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const proData = location.state?.prod;

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    console.log("Product Review:",proData);  

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
                                    onClick={handleBackButtonClick}>
                                    <FiArrowLeft style={{ marginRight: '5px', fontSize: '15px' }} /> Back
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card className="mt-3">
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Name:</b> {proData.product_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Description:</b> {proData.description}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Price:</b> ${proData.price}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Category:</b> {proData?.category?.cat_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Category:</b> {proData?.subcategory?.subcat_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Count In Stock:</b> {proData.countInStock}</p>
                                    </Card.Text>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Nunber of Review:</b> {proData?.numReviews}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Brand:</b> {proData?.brand}</p>
                                    </Card.Text>
                                </Col>
                                
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Rating:</b> {proData.rating}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Meta Title:</b> {proData?.metaTitle}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={8}>
                                    <Card.Text>
                                        <p><b>Meta Description:</b> {proData.metaDescription}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Sub Category:</b> {proData?.subcategory?.name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Date Created:</b> {moment(proData.dateCreated).format('Do MMMM YYYY')}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={8}>
                                    <Card.Text>
                                        <p><b>Long Description:</b> {proData.richDescription}</p>
                                    </Card.Text>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                    <p><b>Product Image:</b><Image  src={proData.product_img} height={100} width={100} /></p>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetail;
