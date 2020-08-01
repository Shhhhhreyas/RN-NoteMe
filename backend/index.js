const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const notes = [
  {
    id: 1,
    type: "note",
    title: "test1",
    note:
      "hello there this is note 1.blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
    toc: 1596014127000,
    style: {
      title: {
        size: 26,
        color: "#000",
      },
      note: {
        size: 18,
        color: "#000",
      },
    },
  },
  {
    id: 2,
    type: "note",
    title: "test3",
    note: "hello there this is note 3.",
    toc: 1596014127000,
    style: {
      title: {
        size: 26,
        color: "#000",
      },
      note: {
        size: 18,
        color: "#000",
      },
    },
  },
  {
    id: 3,
    type: "list",
    toc: 1596014127000,
    items: [
      { id: 1, checked: false },
      { id: 2, text: "ok", checked: true },
      { id: 3, checked: false },
    ],
  },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const note = { ...req.body };
  notes.push(note);

  res.json(note);
});

app.patch("/api/notes/change/:id", (req, res) => {
  console.log("body: id: ", req.body, req.params.id);
  const index = notes.findIndex((note) => note.id === parseInt(req.params.id));
  const note = notes[index];
  if ("title" in req.body) note.title = req.body.title;
  if ("note" in req.body) note.note = req.body.note;
  if ("style" in req.body) {
    const size = req.body.style.size;
    const color = req.body.style.color;
    if (req.body.style.focus === "title") {
      if (size) note.style.title.size = size;
      if (color) note.style.title.color = color;
    } else {
      if (size) note.style.note.size = size;
      if (color) note.style.note.color = color;
    }
  }
  if ("item" in req.body) {
    const itemIndex = note.items.findIndex(
      (item) => item.id === req.body.item.id
    );
    const item = note.items[itemIndex];
    if (req.body.item.change === "check") item.checked = req.body.item.check;
    if (req.body.item.change === "text") item.text = req.body.item.text;
  }
  if ("addDeleteItem" in req.body) {
    if (req.body.addDeleteItem.change === "add")
      note.items.push(req.body.addDeleteItem.item);
    else if (req.body.addDeleteItem.change === "delete") {
      const itemIndex = note.items.findIndex(
        (item) => item.id === req.body.addDeleteItem.item
      );
      if (itemIndex !== -1) note.items.splice(itemIndex, 1);
      else console.log("Item not found. itemId: ", req.body.addDeleteItem.item);
    }
  }
  if ("toc" in req.body) note.toc = Date.now();
  if ("delete" in req.body) {
    if (index === -1) {
      console.log("invalid index id: ", req.params.id);
      return;
    }
    notes.splice(index, 1);
  }

  res.json(note);
});

app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});
