//contains the logic for the route
// this is where we access/update and delete database items

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = async (req, res) => {
  //   console.log(req.body); //{ name: 'Ednah', email: 'ednah@gmail.com', phone: '0789562314' }
  const { name, email, phone } = req.body;
  // error checking
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  res.status(201).json({ message: "Create Contact" });
};

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public

const getContact = async (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}` });
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
  res.status(200).json({ message: `Update Contact for ${req.params.id}` });
};
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  res.status(200).json({ message: `Contact for ${req.params.id} deleted` });
};
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
