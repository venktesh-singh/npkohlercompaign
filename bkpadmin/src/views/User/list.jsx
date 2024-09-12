import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logo.png';
import { BASE_URL } from '../../config/apiurl';

function UserList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.users);
        } catch (err) {
            setError(err.message);
        }
    };
    console.log("Check Users",users)
    useEffect(() => {
        fetchData();
    }, []);



    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user._id !== id));

            toast.success('User deleted successfully!', {
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

    const filteredUsers = users?.filter(user =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <Card.Title as="h5">User List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search User Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/user/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add User
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>User Pic</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{user.username}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{user.email}</h6>
                                            </td>
                                            
                                            <td>
                                                <h6 className="m-0">{moment(user.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/user/detail`} state={{ user }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            {error ? error : "No users available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredUsers.length}
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

export default UserList;
