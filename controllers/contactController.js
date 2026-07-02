const asyncHandler = require("express-async-handler")

// @desc Get All conatct
// @router GET /api/contact
// @access public
const getContacts = asyncHandler(async(req, res)=>{
    res.status(200).json({message: "Get All conatact"})
});

// @desc Create All conatct
// @router POST /api/contact
// @access public
const CreateContact = asyncHandler(async(req, res)=>{
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).json({message: "Create conatact"})
});

// @desc Get conatact
// @router GET /api/contact/:id
// @access public
const getContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message : `Get contacts for ${req.params.id}`});
})

// @desc update conatact
// @router PUT /api/contact/:id
// @access public
const UpdateContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message : `Update contacts for ${req.params.id}`});
})

// @desc update conatact
// @router PUT /api/contact/:id
// @access public
const DeleteContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message : `Delete contacts for ${req.params.id}`});
})

module.exports = {
    getContacts,
    CreateContact,
    getContact,
    UpdateContact,
    DeleteContact,
}