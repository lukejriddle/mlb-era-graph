import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { postFeedback } from '../helpers/requestUtil'

function Header() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        handleClose()
        postFeedback(input)
    }


    return (
        <div className="header">
            <Navbar bg="light" id="headerNav">
                <Navbar.Brand>mlb-era-graph</Navbar.Brand>
                <Navbar.Collapse className="d-flex justify-content-between">
                    <Navbar.Text>Courtesy of <a href="http://baseball-reference.com">baseball-reference.com</a></Navbar.Text> 
                    <Nav.Link onClick={handleShow}>Report a problem</Nav.Link>            
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Report a problem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="problemInput">
                            <Form.Control 
                                onChange={e => setInput(e.target.value)}
                                type="feedback"
                                autocomplete="off"
                                placeholder="Please enter a brief description of the problem."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Header;