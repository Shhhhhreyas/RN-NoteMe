import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notes",
  initialState: {
    list: [],
    lastId: 1,
    loading: false,
  },
  reducers: {
    noteAdded: (notes, action) => {
      if (action.payload) {
        notes.list.push(action.payload.note);
        notes.lastId = Math.max(...notes.list.map((note) => note.id)) + 1;
        return;
      }
      notes.list.push({
        id: notes.lastId,
        type: "note",
        toc: Date.now(),
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
      });
      notes.lastId++;
    },
    listAdded: (notes, action) => {
      notes.list.push({
        id: notes.lastId,
        type: "list",
        toc: Date.now(),
        items: [],
      });
      notes.lastId++;
    },
    titleChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index === -1) return;
      notes.list[index].title = action.payload.title;
    },
    noteChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      console.log("Reducer: id,index", action.payload.id, index);
      if (index === -1) return;
      notes.list[index].note = action.payload.note;
    },
    styleChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index === -1) return;
      if (action.payload.focus === "title")
        notes.list[index].style.title = {
          size: action.payload.size,
          color: action.payload.color,
        };
      else
        notes.list[index].style.note = {
          size: action.payload.size,
          color: action.payload.color,
        };
    },
    listItemChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      if (action.payload.change === "add")
        notes.list[index].items.push(action.payload.item);
      else if (action.payload.change === "delete") {
        const itemIndex = notes.list[index].items.findIndex(
          (item) => item.id === action.payload.item
        );
        if (itemIndex !== -1) notes.list[index].items.splice(itemIndex, 1);
        else
          console.log(
            "Item not found. id:, itemId: ",
            action.payload.id,
            action.payload.itemId
          );
      }
    },
    listItemTextChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      const itemIndex = notes.list[index].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      notes.list[index].items[itemIndex].text = action.payload.text;
    },
    listItemChecked: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      const itemIndex = notes.list[index].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      notes.list[index].items[itemIndex].checked = action.payload.checked;
    },
    noteDeleted: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index === -1)
        console.log("reducer delete id: index: ", action.payload.id, index);
      notes.list.splice(index, 1);
    },
    tocChanged: (notes, action) => {
      const index = notes.list.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index === -1) return;
      notes.list[index].toc = Date.now();
    },
  },
});

export const {
  listAdded,
  noteAdded,
  noteChanged,
  listItemChanged,
  listItemTextChanged,
  listItemChecked,
  noteDeleted,
  titleChanged,
  styleChanged,
  tocChanged,
} = slice.actions;
export default slice.reducer;
