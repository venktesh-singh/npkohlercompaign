import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logj02.png';

function PincodeList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pincode, setPincode] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/pincodes/');
            if (!response.ok) {
                throw new Error('Failed to fetch Pincode');
            }
            const data = await response.json();
            setPincode(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/pincodes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete Pincode');
            }

            const updatedPincode = pincode.filter(pin => pin._id !== id);
            setPincode(updatedPincode); 

            toast.success('Pincode deleted successfully!', {
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

    const filteredPincode = pincode.filter(pin =>
        pin.pincode.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

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
                                <Card.Title as="h5">Pincode List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search Pincode Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/pincode/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add Pincode
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Pic</th>
                                    <th>Pincode</th>
                                    <th>Delivery Available</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPincode.length > 0 ? (
                                    filteredPincode.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pin, index) => (
                                        <tr key={index}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />  
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{pin.pincode}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{pin.deliveryAvailable === true ? 'Available' : 'Not Available'}</h6>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(pin.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/pincode/detail`} state={{ pin }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link style={{ padding: 2 }} state={{ pin }} to={`/pincode/edit/${pin._id}`}>
                                                    <FiEdit size='25' className="f-30 text-c-blue" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(pin._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            {error ? error : "No Pincode available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredPincode.length}
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

export default PincodeList;
