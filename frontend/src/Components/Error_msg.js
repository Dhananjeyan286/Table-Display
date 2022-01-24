import React from 'react';
import {Alert} from "react-bootstrap"

const Error_msg = ({set_error_msg,msg}) => {


    return (
        <Alert variant="danger" className='m-2' onClose={() => set_error_msg("")} dismissible>
            <Alert.Heading>Error !!!</Alert.Heading>
                <p>
                    {msg}
                </p>
        </Alert>
    );
};

export default Error_msg;
