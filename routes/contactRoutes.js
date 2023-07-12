const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
/**
 * The router.route() method is used for defining multiple routes on a single route path, but it does not accept a route handler as the second parameter.
 */
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.get("/",(req,res)=>{
//     res.status(200).json({message:"Get all contacts"})
// })
module.exports = router;
