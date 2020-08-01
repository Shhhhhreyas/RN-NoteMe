import { useContext } from "react";
import moment from "moment";

import StoreContext from "./context";
import * as actions from "./notes";

export default useStore = () => {
  const { store } = useContext(StoreContext);

  const getState = () => {
    return store.getState();
  };

  const subscribeStore = (onStoreChange) => {
    return store.subscribe(onStoreChange);
  };

  const addNote = (note = null) => {
    if (note) {
      store.dispatch(actions.noteAdded({ note }));
      return;
    }
    store.dispatch(actions.noteAdded());
  };

  const addList = () => {
    store.dispatch(actions.listAdded());
  };

  const changeNote = (note, id) => {
    store.dispatch(actions.noteChanged({ note, id }));
  };
  const changeTitle = (title, id) => {
    store.dispatch(actions.titleChanged({ title, id }));
  };

  const deleteNote = (id) => {
    store.dispatch(actions.noteDeleted({ id }));
  };

  const changeListItem = (item, id, change) => {
    store.dispatch(actions.listItemChanged({ item, id, change }));
  };

  const changeListItemText = (itemId, id, text) => {
    store.dispatch(actions.listItemTextChanged({ itemId, id, text }));
  };

  const checkListItem = (itemId, id, checked) => {
    store.dispatch(actions.listItemChecked({ itemId, id, checked }));
  };

  const getLastId = () => {
    return store.getState().entities.notes.lastId - 1;
  };

  const getList = (id) => {
    const notes = store.getState().entities.notes.list;
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) return notes[index];
    else return { items: [] };
  };

  const changeStyle = (id, focus, size, color) => {
    store.dispatch(actions.styleChanged({ id, focus, size, color }));
  };

  const getStyle = (id) => {
    const notes = store.getState().entities.notes.list;
    const index = notes.findIndex((note) => note.id === id);
    try {
      return notes[index].style;
    } catch {
      return {
        title: {
          size: 26,
          color: "#000",
        },
        note: {
          size: 18,
          color: "#000",
        },
      };
    }
  };

  const getToc = (id) => {
    const notes = store.getState().entities.notes.list;
    const index = notes.findIndex((note) => note.id === id);
    try {
      return moment(notes[index].toc).format("MM/DD/YYYY hh:mm");
    } catch {
      return "Today";
    }
  };

  const setToc = (id) => {
    store.dispatch(actions.tocChanged({ id }));
  };

  return {
    getState,
    getLastId,
    addNote,
    changeNote,
    changeTitle,
    subscribeStore,
    deleteNote,
    addList,
    changeListItem,
    changeListItemText,
    checkListItem,
    changeStyle,
    getStyle,
    getToc,
    setToc,
    getList,
  };
};
