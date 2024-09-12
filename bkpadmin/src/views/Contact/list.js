import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row } from 'react-bootstrap';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logo.png';
import { BASE_URL } from '../../config/apiurl';

function ContactList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [appointment, setAppointment] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/contacts/`,{
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch Contact');
            }
            const data = await response.json();
            setAppointment(data.contact);
        } catch (err) {
            setError(err.message);
        }
    };
    console.log("Contact",appointment)
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/contacts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete Contact');
            }

            setAppointment(appointment.filter(appointments => appointments._id !== id));

            toast.success('Contact deleted successfully!', {
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

    const filteredAppointments = appointment?.filter(appointments =>
        (appointments.fname && appointments.fname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (appointments.email && appointments.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (appointments.phone && appointments.phone.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                <Card.Title as="h5">Appointments List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search First Name Or Phone Or Email..."
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
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments && filteredAppointments.length > 0 ? (
                                    filteredAppointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
                                        <tr key={appointment._id}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{appointment.name}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{appointment.city}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{appointment.phone}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{appointment.email}</h6>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(appointment.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/contact/detail`} state={{ appointment }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(appointment._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            {error ? error : "No appointments available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {filteredAppointments && filteredAppointments.length > 0 && (
                            <TablePagination
                                component="div"
                                count={filteredAppointments.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default ContactList;
