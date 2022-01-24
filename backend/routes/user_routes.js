const user_model=require("../models/user_model")
const express=require("express")
const router=express.Router()
const nodemailer=require("nodemailer")

//route-/api/users

router.get("/",async(req,res)=>{
    try{
        const users=await user_model.find()
        if(users)
        {
            res.status(200).json(users)
        }
        else{
            res.status(404).send("Details not found.")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - Users not found.")
    }
})


router.get("/:id",async(req,res)=>{
    try{
        const user=await user_model.findById(req.params.id)
        if(user)
        {
            res.status(200).json(user)
        }
        else{
            res.status(404).send("Details not found.")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - User not found.")
    }
})

router.post("/",async(req,res)=>{
    //console.log(req.body)
    try{
        const{name,email,phone,hobbies}=req.body
        //console.log(name,email,phone,hobbies)
        let user=await user_model.findOne({phone:phone})
        if(user)
        {
            res.status(401).send("The phone number is already registered.")
            return
        }
        user=await user_model.findOne({email:email})
        if(user)
        {
            res.status(401).send("The E-MailID is already registered.")
        }
        else{
            const user_create=await user_model.create({name:name,email:email,phone:phone,hobbies:hobbies})
            res.status(200).send("User registered successfully")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - User not registered.")
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const{name,email,phone,hobbies}=req.body
        let user=await user_model.findById(req.params.id)
        if(user)
        {
            user.name=name||user.name
            user.email=email||user.email
            user.phone=phone||user.phone
            user.hobbies=hobbies||user.hobbies
            const updated_user=await user.save()
            res.status(200).send("Details updated successfully.")
        }
        else{
            res.status(404).send("Details not found.")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - Details not updated.")
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        let user=await user_model.findById(req.params.id)
        if(user)
        {
            await user_model.findByIdAndRemove(req.params.id)
            res.status(200).send("Details deleted successfully.")
        }
        else{
            res.status(404).send("Details not found.")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - Details not deleted.")
    }
})

router.post("/send",async(req,res)=>{
    try{
        let f_id=[],i=0,info=[],str="The details of the users are:\n";
        //console.log("here")
        //console.log({body:req.body})
        const {ids}=req.body
        for(let [key,val] of Object.entries(ids))
        {
            if(val===true)
            f_id[i++]=key
        }
        for(i=0;i<f_id.length;i++)
        {
            let user=await user_model.findById(f_id[i])
            if(user)
            {
                info[i]=user
                let temp=`${i+1}.Name: ${user.name},\n  E-MailID: ${user.email},\n  Phone Number: ${user.phone},\n  Hobbies: ${user.hobbies}\n\n\n`
                str=str.concat(temp)
            }
            else{
                res.status(404).send(`The details of the user with id ${f_id[i]} not found`)
                return
            }
        }
        //console.log(info)


        const transporter=nodemailer.createTransport({
            service:"hotmail",
            auth:{
                user:"dhananjeyan286@outlook.com",
                pass:"abcdef@123456"
            }
        })
        const options={
            from:"dhananjeyan286@outlook.com",
            to:"info@redpositive.in",
            subject:"Details of the selected users",
            text:str
        }
        transporter.sendMail(options,(err,info)=>{
            if(err)
            {
                console.log(err)
                res.status(500).send("Internal Server error - E-Mail not sent")
                return;
            }
            res.status(200).send("Details of the selected users has been mailed successfully.")
            //console.log("Sent "+info.response)
        })


        
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal server error - Could not send the mail.")
    }
})



module.exports=router