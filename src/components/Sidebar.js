import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

function Sidebar({ isSidebarVisible, toggleSidebar, onDepartmentClick }) {
  const departmentOptions = [
    { value: 'Central Public Works Department (CPWD)', label: 'Central Public Works Department (CPWD)', subDepartments: ['NBCC (India) Limited', 'Housing and Urban Development Corporation Limited', 'National Capital Region Transport Corporation'] },
    { value: 'Directorate of Estates', label: 'Directorate of Estates', subDepartments: ['d', 'e', 'f'] },
    { value: 'Land & Development Office', label: 'Land & Development Office', subDepartments: ['x', 'y', 'z'] },
  ];

  const [openDepartment, setOpenDepartment] = useState(null);

  const handleDepartmentClick = (departmentValue, isSubDepartment) => {
    if (!isSubDepartment) {
      // If it's a department (not a sub-department), open it
      setOpenDepartment(departmentValue);
    }
    onDepartmentClick(isSubDepartment ? `${openDepartment} - ${departmentValue}` : departmentValue);
  };
  

  return (
    <div className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
      {isSidebarVisible && (
        <>
          <Row className='sidebar-header d-flex align-items-center'>
            <Col>
              <h2>Departments</h2>
            </Col>
            <Col>
              <button onClick={toggleSidebar} className="close-sidebar border-0 hide-button">
                <i className="fa-solid fa-xmark fa-2xl"></i>
              </button>
            </Col>
          </Row>
        </>
      )}
      <div className="department-list">
        <ul>
          <li key="all-users">
            <button
              className="border-0"
              onClick={() => handleDepartmentClick(null)} // Pass null to indicate all users
              style={{ fontWeight: openDepartment === null ? 'bold' : 'normal' }}
            >
              All Users
            </button>
          </li>
          {departmentOptions.map((dept) => (
            <li key={dept.value}>
              <button
                className="border-0"
                onClick={() => handleDepartmentClick(dept.value)}
                style={{ fontWeight: openDepartment === dept.value ? 'bold' : 'normal' }}
              >
                {dept.label}
              </button>
              {openDepartment === dept.value && dept.subDepartments && (
                <ul>
                  {dept.subDepartments.map((subDept) => (
                    <li key={subDept}>
                      <button
                        className='border-0'
                        onClick={() => handleDepartmentClick(subDept)}
                        style={{ fontWeight: openDepartment === subDept ? 'bold' : 'normal' }}
                      >
                        {subDept}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
