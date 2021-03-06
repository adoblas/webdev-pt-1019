const express = require("express");
const router = express.Router();
const FraseTa = require("../models/FraseTa");

// CRUD -> (R) Retrieve
router.get("/", async (req, res) => {
  const frases = await FraseTa.find();
  res.render("crud/list", { frases });
});

// CRUD -> (C) Create: Show form
router.get("/create", (req, res, next) => {
  res.render("crud/createForm", { title: "Hola" });
});

// CRUD -> (C) Create: Submit & Process form data
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  const { taName, taFrase, taMola } = req.body;
  const obj = await FraseTa.create({
    taName,
    taFrase,
    taMola: taMola ? true : false
  });
  console.log(obj);
  res.redirect("/frases/create");
});

// CRUD -> (D) Delete the object in database with query params
/*router.get("/delete", async (req, res) => {
  const id = req.query.id;
  await FraseTa.findByIdAndRemove(id);
  res.redirect("/frases");
});*/

// CRUD -> (D) Delete the object in database with route params
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await FraseTa.findByIdAndRemove(id);
  res.redirect("/frases");
});

// CRUD -> (U) Update/Edit the object in db
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const obj = await FraseTa.findById(id);
  res.render("crud/createForm", { obj, isUpdate: true });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { taName, taFrase, taMola } = req.body;
  await FraseTa.findByIdAndUpdate(id, {
    taName,
    taFrase,
    taMola: taMola ? true : false
  });
  res.redirect("/frases");
});

// Mark as mola
router.get("/markasmola/:id", async (req, res) => {
  const { id } = req.params;
  const obj = await FraseTa.findById(id);
  obj.taMola = !obj.taMola;
  await obj.save();
  res.redirect("/frases");
});

module.exports = router;
