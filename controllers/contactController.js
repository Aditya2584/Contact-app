const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

// @desc Get All conatct
// @router GET /api/contact
// @access private
const getContacts = asyncHandler(async(req, res)=>{
    const contacts = await Contact.find({user_id: req.user.id}); 
    res.status(200).json(contacts)
});

// @desc Create All conatct
// @router POST /api/contact
// @access private
const CreateContact = asyncHandler(async(req, res)=>{
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json(contact)
});

// @desc Get conatact
// @router GET /api/contact/:id
// @access private
const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc update conatact
// @router PUT /api/contact/:id
// @access private
const UpdateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact);
})

// @desc update conatact
// @router PUT /api/contact/:id
// @access private
const DeleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    await Contact.deleteOne({_id: req.params.id});

    res.status(200).json(contact);
})

module.exports = {
    getContacts,
    CreateContact,
    getContact,
    UpdateContact,
    DeleteContact,
}