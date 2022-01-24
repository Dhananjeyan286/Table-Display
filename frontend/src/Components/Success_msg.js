import React from 'react';
import {Alert} from "react-bootstrap"

const Success_msg = ({set_success_msg,msg}) => {


    return (
        <Alert variant="success" className='m-2' onClose={() => set_success_msg("")} dismissible>
            <Alert.Heading>Success !!!</Alert.Heading>
                <p>
                    {msg}
                </p>
      </Alert>
    );
};

export default Success_msg;
