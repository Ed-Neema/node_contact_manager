const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
//contains the logic for the route
// this is where we access/update and delete database items

//@desc Get all contacts
//@route GET /api/contacts
//@access private

// fetching contacts of the logged in user
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({user_id:req.user.id});
  res.status(200).json({ message: "Get all contacts", data: contacts });
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  //   console.log(req.body); //{ name: 'Ednah', email: 'ednah@gmail.com', phone: '0789562314' }
  const { name, email, phone } = req.body;
  // error checking
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const contact = await contactModel.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: "Contact Created", contact: contact });
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  //   const dataItem = await contactModel.find({
  //     _id: req.params.id,
  //   });
  const contactItem = await contactModel.findById(req.params.id);
  if (!contactItem) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res
    .status(200)
    .json({ message: `Contact for ${req.params.id}`, data: contactItem });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    //find the contact from the db
    
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // check if the user created the contact
    if(contact.user_id.toString() !== req.user.id){
       res.status(403);
       throw new Error(
         "User don't have permission to update other user contacts"
       );

    }
    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
  res
    .status(200)
    .json({
      message: `Updated Contact for ${req.params.id}`,
      data: updatedContact,
    });
});
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  // find the contact to be deleted
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error(
        "Users don't have permission to delete other users contacts"
      );
    }
    // remove() --> deletes all the contacts instead of just one
    await contactModel.deleteOne({
      _id: req.params.id,
    });
  res.status(200).json({ message: `Contact for ${req.params.id} deleted` });
});
module.exports = {
  getContacts,
  createContact, 
  getContact,
  updateContact,
  deleteContact,
};
