import React from 'react';
import {  Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import moment from 'moment';

const CategoryDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const catData = location?.state?.cat;

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    console.log("Cate Image",catData);  

    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                <Card className="user-list">
                    <Card.Header>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title as="h5">Subsubcategory Detail</Card.Title>
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
                                        <p><b>Category:</b> {catData.category.cat_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Subcategory:</b> {catData.subcategory.subcat_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Subsubcategory:</b> {catData.subsubcat_name}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Meta Title:</b> {catData?.meta_title}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={8}>
                                    <Card.Text>
                                        <p><b>Meta Description:</b> {catData.meta_desc}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Date Created:</b> {moment(catData.dateCreated).format('Do MMMM YYYY')}</p>
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

export default CategoryDetail;
