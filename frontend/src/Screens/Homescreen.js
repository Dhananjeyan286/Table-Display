import React,{useState,useEffect} from 'react';
import {FaEdit} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import Pop_up_form from '../Components/Pop_up_form';
import { Link } from 'react-router-dom';
import {IoMdArrowDropdown,IoMdArrowDropup} from "react-icons/io"
import axios from "axios"
import Success_msg from '../Components/Success_msg';
import Error_msg from '../Components/Error_msg';
import Catch_errors from '../Catch_errors';
import $ from "jquery"


const Homescreen = ({}) => {

    
    

    const [down,set_down]=useState(true)

    const [show, setShow] = useState(false);
    
    

    const handle_close = () => {
        setShow(false)
        set_pop_up_error_msg("")
        set_pop_up_success_msg("")    
    };
    const handle_show = () => setShow(true);


    const [name,set_name]=useState("")
    const [email,set_email]=useState("")
    const [phone,set_phone]=useState("")
    const [hobbies,set_hobbies]=useState("")

    const [success_msg,set_success_msg]=useState("")
    const [error_msg,set_error_msg]=useState("")

    const [pop_up_success_msg,set_pop_up_success_msg]=useState("")
    const [pop_up_error_msg,set_pop_up_error_msg]=useState("")

    const [users,set_users]=useState([])
    const [i,set_i]=useState(0)

    const ids={}

    const send_handler=async()=>{
        try{
            //console.log("send_handler")
            //console.log({ids})
            const {data}=await axios.post("/api/users/send",({ids}))
            set_success_msg(data)

            let z=i
            set_i(z+=1)
        }
        catch(error)
        {
            let err=Catch_errors(error)
            set_error_msg(err)
        }
    }

    

    const delete_handler=async(id)=>{
        if(window.confirm("Are you sure you want to delete?"))
        {
            try{
                const {data}=await axios.delete(`/api/users/${id}`)
                set_success_msg(data)

                let a=i
                set_i(a+=1)
                //console.log("i value from delete "+i)

                // const {dataas}=await axios.get("/api/users")
                // set_users(dataas)
            }
            catch(error)
            {
                let err=Catch_errors(error)
                set_error_msg(err)
            }
            //console.log("delete_handler "+id)
        }
        
    }

    const reg_exp_phone= /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;//accepts - 8880344456 +918880344456 +91 8880344456 +91-8880344456 08880344456 918880344456
    const reg_exp_email= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // 1.Uppercase (A-Z) and lowercase (a-z) English letters. 2.Digits (0-9). 3.Characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~  4.Character . ( period, dot or fullstop) provided that it is not the first or last character and it will not come one after the other.

    const submit_handler=async(e)=>{
        try{
            e.preventDefault()

            if(!name || name.length<6)
            {
                set_pop_up_error_msg("Enter a name and it should have 6 or more characters")
                //alert("Enter a name and it should have 6 or more characters")
                return
            }

            if(!hobbies)
            {
                set_pop_up_error_msg("Enter the hobbies")
                // alert("Enter the hobbies")
                return
            }

            if(!reg_exp_phone.test(phone))
            {
                set_pop_up_error_msg("Enter a valid mobile number")
                // alert("Enter a valid mobile number")
                return
            }

            if(!reg_exp_email.test(email))
            {
                set_pop_up_error_msg("Enter a valid E-Mail ID")
                // alert("Enter a valid E-Mail ID")
                return
            }

            const {data}=await axios.post("/api/users",({name,email,phone,hobbies}))
            set_pop_up_success_msg(data)

            //console.log({name,email,phone,hobbies})

            // const {dataas}=await axios.get("/api/users")
            // set_users(dataas)

            let b=i
            set_i(b+=1)
            //console.log("i value from form_Add "+i)

            set_name("")
            set_phone("")
            set_email("")
            set_hobbies("")

        }
        catch(error)
        {
            let err=Catch_errors(error)
            set_error_msg(err)
        }

    }

    const sort_handler=async()=>{
        try{
            set_down(!down)
            if(down)
            {
                //const {data}=await axios.get("/api/users/asc")

                users.sort((a,b)=>(a.name.localeCompare(b.name)))
                set_users(users)
                //console.log(users)

                $(':checkbox:checked').prop('checked',false);
            }
            else
            {
                users.sort((a,b)=>(-(a.name.localeCompare(b.name))))
                set_users(users)
                //console.log(users)

                $(':checkbox:checked').prop('checked',false);
            }
        }
        catch(error)
        {
            let err=Catch_errors(error)
            set_error_msg(err)
        }
    }

    useEffect(()=>{

        const fetch_data=async()=>{
            try{
                
                //console.log(i)
                
                const {data}=await axios.get("/api/users")
                //console.log(data)
                set_users(data)
            }
            catch(error)
            {
                let err=Catch_errors(error)
                set_error_msg(err)
            }
        }

        fetch_data()

        $(document).ready(function(){
            //console.log("jquery")
          $(':checkbox:checked').prop('checked',false);
        });

    },[i])


    return (
    <div>
        {success_msg && <Success_msg set_success_msg={set_success_msg} msg={success_msg} />}
        {error_msg && <Error_msg set_error_msg={set_error_msg} msg={error_msg} />}
        <h2 className='py-2'>Displaying Details</h2>
        <table className="table table-striped table-bordered table-hover" style={{}}>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>S No.</th>
                    {/* <th>Name <button className='btn btn-secondary'>Sort {down?<a href="/?sort=asc"><IoMdArrowDropdown style={{backgroundColor:"black",color:"white"}} /></a>:<a href="/?sort=dsc"><IoMdArrowDropup style={{backgroundColor:"black",color:"white"}}/></a>}</button></th> */}
                    <th style={{display:"flex",justifyContent:"space-between"}}>Name <button className='btn btn-secondary'>Sort {down?<IoMdArrowDropdown style={{backgroundColor:"black",color:"white"}} onClick={sort_handler} />:<IoMdArrowDropup style={{backgroundColor:"black",color:"white"}} onClick={sort_handler}/>}</button></th>
                    <th>E-Mail ID</th>
                    <th>Phone Number</th>
                    <th>Hobbies</th>
                    <th>Update/Delete</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((user,i)=>{
                    return(
                        <tr  key={i+1}>
                            <td><input type="checkbox" defaultChecked={false} onChange={(e)=>{
                                if(e.currentTarget.checked)
                                ids[user._id]=true
                                else
                                ids[user._id]=false
                                //console.log(ids)
                            }} /></td>
                            <td>{i+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.hobbies}</td>
                            {/* <td><i className="fa fa-edit"></i><i className="fa fa-trash"></i></td> */}
                            <td >{(i+1)%2===0?<><Link  to={`/user/${user._id}`}><FaEdit id='hash' size={25} style={{marginRight:"20px",marginLeft:"20px",cursor:"pointer",color:"black"}}/></Link><AiFillDelete id='hash' size={25} onClick={()=>(delete_handler(user._id))} style={{cursor:"pointer",color:"black"}}/></>:<><Link  to={`/user/${user._id}`}><FaEdit id='hash'  size={25} style={{marginRight:"20px",marginLeft:"20px",cursor:"pointer",color:"white"}}/></Link><AiFillDelete id='hash' size={25} onClick={()=>(delete_handler(user._id))} style={{cursor:"pointer",color:"white"}}/></>}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {/* {edit_show && <Edit_pop_up_form handle_close={handle_close} handle_show={handle_show} submit_handler={submit_handler} show={show} name={name} set_name={set_name} email={email} set_email={set_email} hobbies={hobbies} set_hobbies={set_hobbies} phone={phone} set_phone={set_phone} />}     */}
        <div className='row'>
            <div className='col-10'></div>
            <div className='col-1'>
                <Pop_up_form handle_close={handle_close} handle_show={handle_show} submit_handler={submit_handler} show={show} name={name} set_name={set_name} email={email} set_email={set_email} hobbies={hobbies} set_hobbies={set_hobbies} phone={phone} set_phone={set_phone} pop_up_success_msg={pop_up_success_msg} pop_up_error_msg={pop_up_error_msg} set_pop_up_success_msg={set_pop_up_success_msg} set_pop_up_error_msg={set_pop_up_error_msg}/>               
            </div>
            <div className='col-1'style={{padding:"0px !important"}}>
                <button className='btn btn-secondary' onClick={send_handler}>Send</button>
            </div>
        </div>
        
    </div>
    );
};

export default Homescreen;
