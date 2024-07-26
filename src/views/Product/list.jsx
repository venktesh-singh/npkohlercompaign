import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
//import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logo.png'

function ProductList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
     
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4001/api/v1/products/');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProduct(data.products);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4001/api/v1/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const updatedProducts = product?.filter(prod => prod._id !== id);
            setProduct(updatedProducts);

            toast.success('Product deleted successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = product.filter(prod =>
        prod?.product_title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        prod?.category?.cat_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod?.subcategory?.subcat_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod?.attributes.map(att => att.sku).join(", ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    //console.log("Product List Get SubCate:", product);
    return (
        <React.Fragment>
            <ToastContainer
                position="top-center"
                theme="dark"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Col md={6} xl={12}>
                <Card className="user-list">
                    <Card.Header>
                        <Row className="align-items-center">
                            <Col md={3}>
                                <Card.Title as="h5">Product List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search Product Or Category Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/product/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add Product
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Product Pic</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>
                                    <th>SKU</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prod, index) => (
                                        <tr key={index}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                { prod.product_img ? 
                                                     <img className="rounded-circle" style={{ width: '40px' }} src={prod.product_img} alt="activity-user" />
                                                     :  <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />  
                                                }
                                                
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{prod.product_title}</h6>
                                            </td>
                                            <td>
                                                <span className="pie_1">{prod.category?.cat_name || 'No Category'}</span>
                                            </td>
                                            <td>
                                                <span className="pie_1">{prod?.subcategory?.subcat_name || 'No Subcategory'}</span>
                                            </td>
                                            <td>
                                                <span className="pie_1">{ prod?.attributes.map(att => att.sku).join(", ") }</span>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(prod.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/product/detail`} state={{ prod }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link style={{ padding: 2 }} state={{ prod }} to={`/product/edit/${prod._id}`}>
                                                    <FiEdit size='25' className="f-30 text-c-blue" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(prod._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            {error ? error : "No products available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredProducts.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default ProductList;
