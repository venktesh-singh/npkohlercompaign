import React from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
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
                                <Col md={4}>
                                    <Card.Text><b>Short Desc:</b> {proData?.short_desc}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Card.Text><b>Category:</b> {proData?.category?.cat_name}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text><b>Subcategory:</b> {proData?.subcategory?.subcat_name}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Text><b>Date Created:</b> {moment(proData?.dateCreated).format('Do MMMM YYYY')}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Card.Text><b>Long Desc:</b> {proData?.long_desc}</Card.Text>
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
                                    <Col md={4}>
                                        <Card.Text><b>Sale Price:</b> {att?.sale_price}</Card.Text>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Text><b>Stock:</b> {att?.stock}</Card.Text>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Text>
                                            <b>Single Image:</b> <Image src={att?.single_img} height={30} width={30} alt={att?.sku} fluid />
                                        </Card.Text>
                                    </Col>
                                    <Col md={4}>
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
        </>
    );
};

export default ProductDetail;
