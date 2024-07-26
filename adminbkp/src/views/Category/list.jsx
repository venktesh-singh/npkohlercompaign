import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logo.png';

function CategoryList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4001/api/v1/categories/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            
            console.log('Fetched data:', data); // Log the full data for inspection
    
            // Access the categories from the `category` property of the response
            if (Array.isArray(data.category)) {
                setCategory(data.category);
            } else {
                console.error('Expected an array of categories in `data.category`');
                setCategory([]);
            }
        } catch (err) {
            console.error('Error fetching categories:', err.message);
            setError(err.message);
            setCategory([]); // Ensure `category` is an array
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4001/api/v1/categories/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete Category');
            }

            const updatedCategory = category.filter(cat => cat._id !== id);
            setCategory(updatedCategory);

            toast.success('Category deleted successfully!', {
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
    //console.log("Check Category", category)
    const filteredCategory = Array.isArray(category) ? category?.filter(cat =>
        cat?.cat_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

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
                                <Card.Title as="h5">Category List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search Category Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/category/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add Category
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Category Pic</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategory.length > 0 ? (
                                    filteredCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
                                        <tr key={index}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />  
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{cat.cat_name}</h6>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(cat.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/category/detail`} state={{ cat }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link style={{ padding: 2 }} state={{ cat }} to={`/category/edit/${cat._id}`}>
                                                    <FiEdit size='25' className="f-30 text-c-blue" />
                                                </Link>
                                                <Link
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(cat._id)}
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
                            count={filteredCategory.length}
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

export default CategoryList;
