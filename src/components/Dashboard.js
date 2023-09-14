import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import CustomTable from './CustomTable';
import { ToastContainer } from 'react-toastify';

function Dashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleDepartmentClick = (selectedValue) => {
    setSelectedDepartment(selectedValue);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={isSidebarVisible ? 2 : 1}>
          <div className="app">
            {isSidebarVisible ? (
                <Sidebar
                  isSidebarVisible={isSidebarVisible}
                  toggleSidebar={toggleSidebar}
                  onDepartmentClick={handleDepartmentClick}
                />
            ) : (
              <button onClick={toggleSidebar} className="show-button border-0">
               Departments
              </button>
            )}
          </div>
        </Col>
        <CustomTable 
        isSidebarVisible={isSidebarVisible}
        selectedDepartment={selectedDepartment} 
        setSelectedDepartment={setSelectedDepartment} />
        <ToastContainer autoClose={3000} />
      </Row>
    </Container>
  );
}

export default Dashboard;
