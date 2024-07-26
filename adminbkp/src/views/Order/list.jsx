import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/orders/');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (orders.length > 0 && orders[0].user) {
            console.log("First Order User:", orders[0].user.username);
        }
    }, [orders]);

    const orderUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/orders/status/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();
            setOrders(orders.map(order => order._id === id ? updatedOrder : order));

            toast.success("Order status updated successfully!", {
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/orders/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            const updatedOrders = orders.filter(order => order._id !== id);
            setOrders(updatedOrders);

            toast.success('Order deleted successfully!', {
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

    const filteredOrders = orders.filter(order =>
        order.user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <Card.Title as="h5">Order List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search Order Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/order/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add Order
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>#orderID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>{order.orderID}</td>
                                            <td>
                                                <h6 className="mb-1">{order.user.username}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{order.user.email}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{order.user.phone}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{order.city}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1"><FaRupeeSign size='15' /> {order.totalPrice}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">
                                                    <Form.Select
                                                        value={order.status}
                                                        onChange={(e) => orderUpdate(order._id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </Form.Select>
                                                </h6>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(order.dateOrdered).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/order/detail`} state={{ order }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(order._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">
                                            {error ? error : "No orders available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredOrders.length}
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

export default OrderList;
