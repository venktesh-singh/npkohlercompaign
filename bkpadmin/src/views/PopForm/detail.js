import React from 'react';
import {  Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import moment from 'moment';

function PopFormDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const uData = location?.state?.appointment;

    const handleBackButtonClick = () => {
        navigate(-1);
    };
    //console.log("check Popup Data",uData)
  return (
            <>
            <Row className="justify-content-md-center mt-4">
                <Col md={12}>
                <Card className="user-list">
                    <Card.Header>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title as="h5">Popup Detail</Card.Title>
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
                                        <p><b>First Name:</b> {uData?.fname}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Last Name:</b> {uData?.lname}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>User:</b> {uData?.npuser}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Email:</b> {uData?.email}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Phone:</b> {uData?.phone}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>city:</b> {uData?.city.city_name}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Store:</b> {uData?.store.store_name}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Message:</b> {uData?.message}</p>
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text>
                                        <p><b>Date Created:</b> {moment(uData?.dateCreated).format('Do MMMM YYYY')}</p>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Card>
                </Col>
            </Row>
        </>
    )    
}

export default PopFormDetail;
