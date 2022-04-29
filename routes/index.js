const express = require("express");
// db model
const Model = require("../models");

const router = express.Router();

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  // trying to store the data in a const called dataToSave
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const dataToShow = await Model.find();
    res.status(200).json(dataToShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const dataToShow = await Model.findById(req.params.id);
    res.status(200).json(dataToShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataDeleted = await Model.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        message: `Record with the name "${dataDeleted.name}" was deleted successfuly`,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
