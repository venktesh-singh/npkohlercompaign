import React, { useEffect, useState } from 'react';
import { Col, Card, Table, Form, Row, Button } from 'react-bootstrap';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TablePagination from '@mui/material/TablePagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asiamama from '../../image/logo.png';
import { BASE_URL } from '../../config/apiurl';

function SubCategoryList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [subcategory, setSubCategory] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/subcategories/`);
            if (!response.ok) {
                throw new Error('Failed to fetch subcategories');
            }
            const data = await response.json();
            setSubCategory(data.subcat || []);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/subcategories/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete subcategory');
            }

            const updatedSubCategory = subcategory.filter(cat => cat._id !== id);
            setSubCategory(updatedSubCategory);

            toast.success('Subcategory deleted successfully!', {
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
            toast.error(`Error: ${error.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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

    const filteredSubCategory = subcategory.filter(cat =>
        (cat?.subcat_name && cat.subcat_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cat?.category?.cat_name && cat.category.cat_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                <Card.Title as="h5">Subcategory List</Card.Title>
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search Subcategory Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mb-2 text-right"
                                    variant="primary"
                                    to={`/subcategory/add`}
                                    style={{ float: 'right' }}
                                    as={Link}
                                >
                                    <FiPlus style={{ marginRight: '3px', fontSize: '15px' }} /> Add Subcategory
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
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubCategory.length > 0 ? (
                                    filteredSubCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (  
                                        <tr key={cat._id}>
                                            <td>{page * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={asiamama} alt="activity-user" />  
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{cat.category?.cat_name}</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{cat.subcat_name}</h6>
                                            </td>
                                            <td>
                                                <h6 className="m-0">{moment(cat.dateCreated).format('Do MMMM YYYY')}</h6>
                                            </td>
                                            <td>
                                                <Link to={`/subcategory/detail`} state={{ cat }} style={{ padding: 10 }}>
                                                    <FiEye size='25' className="f-30 text-c-green" />
                                                </Link>
                                                <Link style={{ padding: 2 }} state={{ cat }} to={`/subcategory/edit/${cat._id}`}>
                                                    <FiEdit size='25' className="f-30 text-c-blue" />
                                                </Link>
                                                <Button
                                                    variant="link"
                                                    style={{ padding: 2 }}
                                                    onClick={() => handleDelete(cat._id)}
                                                >
                                                    <FiTrash2 size='25' className="f-30 text-c-red" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            {error ? error : "No Subcategory available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredSubCategory.length}
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

export default SubCategoryList;
