const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@Description Get all contacts
//@Route GET /api/contacts
//@Access Private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).send(contacts);
});

//@Description Add a contact
//@Route POST /api/contacts
//@Access Private
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
        phone,
        user_id: req.user.id,
    })
    res.status(201).send(contact);
});

//@Description Find a contact
//@Route POST /api/contacts/:id
//@Access Private
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
//@Access Private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User dosent have permission to update other users contacts");
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
//@Access Private
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }

    if(contact.user_id.toString()!== req.user.id) {
        res.status(403)
        throw new Error("User dosent have permission to update other users contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json({contact, message: "Contact Deleted"});
});

module.exports = {getContacts, createContact, updateContact, deleteContact, getContact};
