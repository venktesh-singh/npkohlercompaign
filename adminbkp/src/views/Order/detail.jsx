import React from 'react';
import {  Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import moment from 'moment';

function UserDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const uData = location.state?.order;

    const handleBackButtonClick = () => {
        navigate(-1);
    };


    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                    <Card className="user-list">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title as="h5">Order Detail</Card.Title>
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
                            {uData && (
                                <>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>User Name:</b> {uData.user.username}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Email:</b> {uData.user.email}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Phone:</b> {uData.user.phone}</p>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Street:</b> {uData.user.street}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Apartment:</b> {uData.user.apartment}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Zip:</b> {uData.user.zip}</p>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>City:</b> {uData.user.city}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Country:</b> {uData.user.country}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Date Created:</b> {moment(uData.dateOrdered).format('Do MMMM YYYY')}</p>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Total Price:</b> <FaRupeeSign size='15' /> {uData.totalPrice}</p>
                                            </Card.Text>
                                        </Col>
                                        <Col md={4}>
                                            <Card.Text>
                                                <p><b>Status:</b> {uData.status}</p>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="user-list mt-4">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title as="h5">Order Product Detail</Card.Title>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {uData?.orderItems.map((oItem, index) => (
                                <Card className="mt-3" key={index}>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Product Name:</b> {oItem.product.name}</p>
                                                </Card.Text>
                                            </Col>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Product Price:</b> <FaRupeeSign size='15' /> {oItem.product.price}</p>
                                                </Card.Text>
                                            </Col>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Product Category:</b> {oItem.product.category.cat_name}</p>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Product Subcategory:</b> {oItem.product.subcategory.subcat_name}</p>
                                                </Card.Text>
                                            </Col>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Quantity:</b> {oItem.quantity}</p>
                                                </Card.Text>
                                            </Col>
                                            <Col md={4}>
                                                <Card.Text>
                                                    <p><b>Featured Product:</b> {oItem.product.isFeatured ? 'Yes' : 'No'}</p>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default UserDetail;
