//@Description Get all contacts
//@Route GET /api/contacts
//@Access Public
const getContacts = async (req,res)=>{
    res.status(200).send("Get All contacts");
}

//@Description Create a contact
//@Route POST /api/contacts
//@Access Public
const createContact = async (req,res)=>{
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are Mandetory !");
    }
    res.status(201).send("Created Contact");
}

//@Description Create a contact
//@Route POST /api/contacts
//@Access Public
const updateContact = async (req,res)=>{
    res.status(200).send(`Updated Contact: ${req.params.id}`);
}

//@Description Create a contact
//@Route POST /api/contacts
//@Access Public
const deleteContact = async (req,res)=>{
    res.status(200).send(`Deleted Contact: ${req.params.id}`);
}

//@Description Create a contact
//@Route POST /api/contacts
//@Access Public
const getContact = async (req,res)=>{
    res.status(200).send(`Fetched Contact: ${req.params.id}`);
}
module.exports = {getContacts, createContact, updateContact, deleteContact, getContact};
