import React,{useState,useEffect} from 'react';
import {Form,Button} from "react-bootstrap"
import axios from "axios"
import Success_msg from '../Components/Success_msg';
import Error_msg from '../Components/Error_msg';
import Catch_errors from '../Catch_errors';

const Editscreen = ({match}) => {

    const [name,set_name]=useState("")
    const [email,set_email]=useState("")
    const [phone,set_phone]=useState("")
    const [hobbies,set_hobbies]=useState("")
    const [success_msg,set_success_msg]=useState("")
    const [error_msg,set_error_msg]=useState("")

    const reg_exp_phone= /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;//accepts - 8880344456 +918880344456 +91 8880344456 +91-8880344456 08880344456 918880344456
    const reg_exp_email= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // 1.Uppercase (A-Z) and lowercase (a-z) English letters. 2.Digits (0-9). 3.Characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~  4.Character . ( period, dot or fullstop) provided that it is not the first or last character and it will not come one after the other.

    const submit_handler=async(e)=>{
        try{
            e.preventDefault()

            if(!name || name.length<6)
            {
                set_error_msg("Enter a name and it should have 6 or more characters")
                //alert("Enter a name and it should have 6 or more characters")
                return
            }

            if(!hobbies)
            {
                set_error_msg("Enter the hobbies")
                // alert("Enter the hobbies")
                return
            }

            if(!reg_exp_phone.test(phone))
            {
                set_error_msg("Enter a valid mobile number")
                // alert("Enter a valid mobile number")
                return
            }

            if(!reg_exp_email.test(email))
            {
                set_error_msg("Enter a valid E-Mail ID")
                // alert("Enter a valid E-Mail ID")
                return
            }

            const {data}=await axios.put(`/api/users/${match.params.id}`,({name,email,phone,hobbies}))
            set_success_msg(data)

            //console.log(name+" "+email+" "+phone+" "+hobbies)

            // const {dataas}=await axios.get("/api/users")
            // set_users(dataas)

            // let b=i
            // set_i(b+=1)
            // console.log("i value from form_Add "+i)



            //console.log(name+" "+email+" "+phone+" "+hobbies)

            //history.push("/")

        }
        catch(error)
        {
            let err=Catch_errors(error)
            set_error_msg(err)
        }
    }


    useEffect(()=>{

        const fetch_data=async()=>{
            //console.log(match.params.id)
            const {data}=await axios.get(`/api/users/${match.params.id}`)
            //console.log(data)
            set_name(data.name)
            set_email(data.email)
            set_phone(data.phone)
            set_hobbies(data.hobbies)
        }

        fetch_data()
    },[match])

    return (
    <div className='container'>
        <a href="/" ><button className='btn btn-secondary'>Go Back</button></a>
        {success_msg && <Success_msg set_success_msg={set_success_msg} msg={success_msg} />}
        {error_msg && <Error_msg set_error_msg={set_error_msg} msg={error_msg} />}
        <h2 className='py-2'>Edit Details</h2>
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
            <Button type="submit" >Submit</Button>
        </Form>
    </div>
    );
};

export default Editscreen;
