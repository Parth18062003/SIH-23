import React, { useState } from 'react';
import { ListGroup, Button, Form, Container, Row, Col } from 'react-bootstrap';

function Filter({ filterUsers }) {
  const [showFilter, setShowFilter] = useState(false);
  const [departments, setDepartments] = useState(["Finance", "Housing"]);
  const [newDepartment, setNewDepartment] = useState("");

  const handleAddDepartment = () => {
    if (newDepartment.trim() === "") {
      alert("Please enter a department name.");
      return;
    }

    setDepartments([...departments, newDepartment]);
    setNewDepartment("");
  };

  return (
    <>
    <div className={`filter-btn ${showFilter ? 'show' : 'hide'}`}>
      <Button variant="basic" onClick={() => setShowFilter(!showFilter)}>
        {showFilter ? <div><i class="fa-solid fa-xmark"></i></div> : <div><i class="fa-solid fa-bars"></i></div>}
      </Button>

      {showFilter && (
        <div className='filter'>  
          <h2><b>Departments</b></h2>
          <Container>
            <Row>
                <Col xl={8}>
                    <Form>
                      <Form.Group className='new-dept' controlId="newDepartment">
                        <Form.Control
                          type="text"
                          placeholder="New Department"
                          value={newDepartment}
                          onChange={(e) => setNewDepartment(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                </Col>
                <Col xl={4}>
                    <Button variant="basic" onClick={handleAddDepartment}>
                      <i className="fa-solid fa-circle-plus"></i>Add
                    </Button>
                </Col>
            </Row>
          </Container>
          <ListGroup className="mt-3 mb-3" as="ul" style={{borderRadius:"0"}}>
            {departments.map((department, index) => (
              <ListGroup.Item className="mt-2" as="li" key={index}>
                {department}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
    </>
  );
}

export default Filter;
