const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@Description Get all contacts
//@Route GET /api/contacts
//@Access Public
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).send(contacts);
});

//@Description Add a contact
//@Route POST /api/contacts
//@Access Public
const createContact = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are Mandetory !");
    }

    const contact = await Contact.create({
        name, 
        email, 
        phone
    })
    res.status(201).send(contact);
});

//@Description Find a contact
//@Route POST /api/contacts/:id
//@Access Public
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//@Description Update a contact
//@Route POST /api/contacts/:id
//@Access Public
const updateContact = asyncHandler(async (req,res)=>{
    const contact = Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    res.status(200).json(updatedContact);
});

//@Description Deletee a contact
//@Route DELETE /api/contacts/:id
//@Access Public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }
    await Contact.deleteOne();
    res.status(200).json({contact, message: "Contact Deleted"});
});

module.exports = {getContacts, createContact, updateContact, deleteContact, getContact};
