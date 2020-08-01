import notesApi from "../../api/notes";

const api = ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === "notes/noteAdded" && !action.payload) {
    console.log("Note Added");
    notesApi.addNotes({
      id: getState().entities.notes.lastId - 1,
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
  }
  if (action.type === "notes/listAdded") {
    notesApi.addList({
      id: getState().entities.notes.lastId - 1,
      type: "list",
      toc: Date.now(),
      items: [],
    });
  }
  if (action.type === "notes/titleChanged") {
    notesApi.changeTitle(action.payload.id, action.payload.title);
  }
  if (action.type === "notes/noteChanged") {
    notesApi.changeNote(action.payload.id, action.payload.note);
  }
  if (action.type === "notes/styleChanged") {
    notesApi.changeStyle(action.payload.id, {
      style: {
        focus: action.payload.focus,
        size: action.payload.size,
        color: action.payload.color,
      },
    });
  }
  if (action.type == "notes/listItemChanged") {
    notesApi.changeListItem(action.payload.id, {
      addDeleteItem: {
        item: action.payload.item,
        change: action.payload.change,
      },
    });
  }
  if (action.type === "notes/listItemTextChanged") {
    notesApi.changeListItemChange(action.payload.id, {
      item: {
        id: action.payload.itemId,
        change: "text",
        text: action.payload.text,
      },
    });
  }
  if (action.type === "notes/listItemChecked") {
    notesApi.changeListItemChange(action.payload.id, {
      item: {
        id: action.payload.itemId,
        change: "check",
        check: action.payload.checked,
      },
    });
  }
  if (action.type === "notes/tocChanged") {
    notesApi.changeTOC(action.payload.id);
  }
  if (action.type === "notes/noteDeleted") {
    notesApi.deleteNote(action.payload.id);
  }
};

export default api;
