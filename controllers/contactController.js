const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
//contains the logic for the route
// this is where we access/update and delete database items

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({});
  res.status(200).json({ message: "Get all contacts", data: contacts });
});

//@desc Create New contact
//@route POST /api/contacts
//@access public
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
  });
  res.status(201).json({ message: "Contact Created", contact: contact });
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public

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
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
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
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
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
