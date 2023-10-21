const router = require("express").Router();
const Note = require("../modals/notes");
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchuser");

// get notes /getallnotes

router.get("/getallnotes", fetchuser, async (req, res) => {
  try {
    const getnotes = await Note.find({ user: req.user.id });
     res.send(getnotes)
  } catch (error) {
    console.log(error);
    res.send({ error: "internal server error" });
  }
});

// post notes
router.post(
  "/addnote",
  fetchuser,
  [
    [
      body("title", "enter valid tittle").isLength({ min: 3 }),

      body("description", "enter at leat 5 character description").isLength({
        min: 5,
      }),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }

    try {
     
      const { title, description, tag, user } = req.body;
      const addnotes = new Note({
        title,
        description,
        user: req.user.id,
      });

      const newnote = await addnotes.save();

      res.send({ json:newnote});
    } catch (error) {
      console.log(error);
      res.send({ msg: "internal server error" });
    }
  }
);

//  find and update a notes

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // find the notes and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({msg:"note found"});
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send({msg:"note allowd "});
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({msg:note});
  } catch (error) {
    console.log(error);
    res.status(401).send({error:"interl serval error"});
  }
});

// delete notes

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the notes and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send({ msg: "note has been deleted " });
  } catch (error) {
    console.log(error);
    res.status(401).send({msg:"internal server error"});
  }
});

module.exports = router;
