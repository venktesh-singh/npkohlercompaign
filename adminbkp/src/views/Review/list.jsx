import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row } from 'react-bootstrap';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logj02.png';


function ListReview(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [review, setReview] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/reviews/');
            if (!response.ok) {
                throw new Error('Failed to fetch review');
            }
            const data = await response.json();
            setReview(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    //const checkReview = review.map((chk) => ("Check Review", chk?.product?.name));
    const checkUser = review.map((chkU) => ("Check Review", chkU?.user?.username));
    console.log("Check Review",checkUser);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/reviews/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete Reviews');
            }

            const deletedReview = review.filter(dreview => dreview._id !== id);
            console.log("Reviews Deleted:", deletedReview)
            setReview(deletedReview); 

            toast.success('Reviews deleted successfully!', {
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

    const filteredReview = review.filter(review =>
        review.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return(
        <>
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
                                    <Card.Title as="h5">Review List</Card.Title>
                                </Col>
                                <Col md={5}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search Review Name..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </Col>
                                
                            </Row>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>User Pic</th>
                                        <th>User Name</th>
                                        <th>Product Name</th>
                                        <th>Rating</th>
                                        <th>Review</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReview.length > 0 ? (
                                        filteredReview.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((review, index) => (
                                            <tr key={index}>
                                                <td>{page * rowsPerPage + index + 1}</td>
                                                <td>
                                                    <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />  
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{review?.user?.username}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{review?.product?.product_name}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{review.rating}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{review.reviewText}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">{moment(review.dateReviewed).format('Do MMMM YYYY')}</h6>
                                                </td>
                                                <td>
                                                    <Link to={`/review/detail`} state={{ review }} style={{ padding: 10 }}>
                                                        <FiEye size='25' className="f-30 text-c-green" />
                                                    </Link>
                                                    {/*<Link style={{ padding: 2 }} state={{ uname }} to={`/user/edit/${uname._id}`}>
                                                        <FiEdit size='25' className="f-30 text-c-blue" />
                                                    </Link> */}
                                                    <Link
                                                        style={{ padding: 2 }}
                                                        onClick={() => handleDelete(review._id)}
                                                    >
                                                        <FiTrash2 size='25' className="f-30 text-c-red" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                {error ? error : "No Category available"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={filteredReview.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </React.Fragment>
        </>
    )
}

export default ListReview;