import React, { useState, useEffect } from 'react';
import { Col, Table, Modal, Form, Button, Row } from 'react-bootstrap';
import Select from 'react-select';
import DeleteConfirmationModal from './ConfirmDeleteModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const departmentOptions = [
  { value: 'Central Public Works Department (CPWD)', label: 'Central Public Works Department (CPWD)', subDepartments: ['NBCC (India) Limited', 'Housing and Urban Development Corporation Limited', 'National Capital Region Transport Corporation'] },
  { value: 'Directorate of Estates', label: 'Directorate of Estates', subDepartments: ['d', 'e', 'f'] },
  { value: 'Land & Development Office', label: 'Land & Development Office', subDepartments: ['x', 'y', 'z'] },
];

function CustomTable({ isSidebarVisible, selectedDepartment}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', department: null, subDepartment: null, role: '' });
  const [tableData, setTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDeleteIndex, setUserToDeleteIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const usersPerPage = 5;

  const filteredUsers = tableData.filter((user) => {
    if (!selectedDepartment) return true; // Show all users if no department is selected
  
    const departmentMatches = user.department?.value === selectedDepartment;
    const subDepartmentMatches = user.subDepartment?.value === selectedDepartment;
  
    return departmentMatches || subDepartmentMatches;
  });

  useEffect(() => {
    // Reset pagination when the selected department changes
    setCurrentPage(0);
  }, [selectedDepartment]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleDeleteModal = (index) => {
    setUserToDeleteIndex(index);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Capitalize the input value
    const parts = value.split(' ');

    // Capitalize each part
    const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  
    // Join the capitalized parts back together with spaces
    const capitalizedValue = capitalizedParts.join(' ');
    setFormData({
      ...formData,
      [name]: capitalizedValue,
    });
  };

  const handleDepartmentChange = (selectedOption) => {
    setFormData({
      ...formData,
      department: selectedOption,
      subDepartment: null, // Reset sub-department when department changes
    });
  };

  const handleSubDepartmentChange = (selectedOption) => {
    setFormData({
      ...formData,
      subDepartment: selectedOption,
    });
  };

  const handleRoleChange = (selectedOption) => {
    setFormData({
      ...formData,
      role: selectedOption,
    });
  };

  const handleSubmit = () => {
    // Check if Name, Department, and Role are not empty
    if (!formData.name || !formData.department || !formData.role) {
      toast.error('Please fill in all required fields.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setTableData([...tableData, formData]);
    setShowModal(false);
    setFormData({ name: '', department: null, subDepartment: null, role: null });

    toast.success('User added successfully!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const departmentSelectOptions = departmentOptions.map((dept) => ({
    value: dept.value,
    label: dept.value,
  }));

  const subDepartmentSelectOptions = formData.department
    ? departmentOptions.find((dept) => dept.value === formData.department.value)?.subDepartments.map((subDept) => ({
        value: subDept,
        label: subDept,
      }))
    : [];

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ];

  const handleDeleteUser = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    setShowDeleteModal(false);
  };

  // Calculate the current page users
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);
  const startId = offset + 1;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobileView = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <Col className={`user-table table-container ${isSidebarVisible ? '' : 'slide-left'}`} style={{ height: '100vh', overflow: 'auto'}}>
      <Row className='user-table-header align-items-center'>
        <Col xs={8}>
        <h2>{selectedDepartment || 'All Departments'}</h2>
        </Col>
        <Col  className='text-center' xs={4}>
          <Button variant="basic" onClick={toggleModal}>
            Add Data
          </Button>
        </Col>
      </Row>
      {filteredUsers.length === 0 ? ( // Conditionally render "No users found" message
        <h2 className='text-center mt-5'>No users found</h2>
      ) : (
        <Table striped bordered hover style={{ height: 'calc(100vh - 220px)', overflow: 'auto' }}>
          <thead style={{ fontSize: !isMobileView ? '21px' : '16.5px' }}>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '20%' }}>Department</th>
              <th style={{ width: '20%' }}>Sub-Department</th>
              <th style={{ width: '20%' }}>Role</th>
              <th style={{ width: '5%' }}>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((data, index) => (
              <tr key={index} style={{ fontSize: window.innerWidth >= 768 ? '18px' : '16px' }}>
                <td>{startId + index}</td>
                <td>{data.name}</td>
                <td>{data.department?.value}</td>
                <td>{data.subDepartment?.value}</td>
                <td>{data.role?.label}</td>
                <td className='text-center'>
                  <button className="delete-user border-0" onClick={() => toggleDeleteModal(index)}>
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'pagination-item'} 
          previousClassName={'pagination-previous'} 
          nextClassName={'pagination-next'} 
        />
      )}
      
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mt-3' controlId="name">
              <Form.Label>*Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder='Name' required/>
            </Form.Group>
            <Form.Group className='mt-3' controlId="department">
              <Form.Label>*Department</Form.Label>
              <Select
                value={formData.department}
                onChange={handleDepartmentChange}
                options={departmentSelectOptions}
                isSearchable
                placeholder="Select or type..."
                required
              />
            </Form.Group>
            <Form.Group className='mt-3' controlId="subDepartment">
              <Form.Label>Sub-Department</Form.Label>
              <Select
                value={formData.subDepartment}
                onChange={handleSubDepartmentChange}
                options={subDepartmentSelectOptions}
                isSearchable
                placeholder="Select or type..."
                isDisabled={!formData.department}
              />
            </Form.Group>
            <Form.Group className='mt-3' controlId="role">
              <Form.Label>*Role</Form.Label>
              <Select
                value={formData.role}
                onChange={handleRoleChange}
                options={roleOptions}
                isSearchable
                placeholder="Select or type..."
                required
              />
            </Form.Group>
            <p><small>Fields marked with * are compulsory</small></p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onConfirm={() => handleDeleteUser(userToDeleteIndex)} />
    </Col>
    </>
  );
}

export default CustomTable;
