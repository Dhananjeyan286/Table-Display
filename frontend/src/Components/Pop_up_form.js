import React from 'react';
import {Button,Modal,Form} from "react-bootstrap"
import Success_msg from './Success_msg';
import Error_msg from './Error_msg';

const Pop_up_form = ({handle_close,handle_show,submit_handler,show,name,set_name,email,set_email,hobbies,set_hobbies,phone,set_phone,pop_up_success_msg,pop_up_error_msg,set_pop_up_success_msg,set_pop_up_error_msg}) => {
    return (
        <>
            
            <Button variant="secondary" onClick={handle_show}>
                Add
            </Button>

            <Modal show={show} onHide={handle_close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Details Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pop_up_success_msg && <Success_msg msg={pop_up_success_msg} set_success_msg={set_pop_up_success_msg} />}
                    {pop_up_error_msg && <Error_msg msg={pop_up_error_msg} set_error_msg={set_pop_up_error_msg} />}
                    <Form onSubmit={submit_handler}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e)=>set_name(e.target.value)} placeholder="Enter your Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>E-Mail ID</Form.Label>
                            <Form.Control type='email' value={email} onChange={(e)=>set_email(e.target.value)} placeholder="Enter your E-Mail ID" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" value={phone} onChange={(e)=>set_phone(e.target.value)} placeholder="Enter your Phone Number" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hobbies</Form.Label>
                            <Form.Control type="text" value={hobbies} onChange={(e)=>set_hobbies(e.target.value)} placeholder="Enter your Hobbies" />
                        </Form.Group>
                        <Button type="submit" variant='primary'>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handle_close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Pop_up_form;
