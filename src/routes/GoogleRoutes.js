import { Google } from "../models/googleModel.js";
import express from "express";
import { jwtDecode } from "jwt-decode";

const router = express.Router();

router.post("/", async (req, res) => {
  const { credential } = req.body;
  const { email } = jwtDecode(credential);
  const google = await Google.create({
    email,
  });
  return res.status(200).json({ google });
});

router.post("/sheetDetails", async (req, res) => {
  const { id, name, sheetId } = req.body;
  const sheet = await Google.findOne({ _id: id });
  const pay = { sheetId, sheetName: name };
  sheet.sheetDetails.push(pay);
  sheet.save();
  // const Sheetid = sheet.sheetDetails[sheet.sheetDetails.length-1]._id
  res
    .status(200)
    .json({ details: sheet.sheetDetails[sheet.sheetDetails.length - 1] });
});

router.get("/getAll/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
const details = await Google.findOne({_id:id})
res.status(201).json({details:details.sheetDetails})
});

router.get("/", async (req, res) => {
  const email = await Google.find();
  return res.status(200).json({ email });
});

export default router;
