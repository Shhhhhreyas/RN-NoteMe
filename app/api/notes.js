import client from "./client";

const getPostEndpoint = "/notes";
const patchEndpoint = "/notes/change/";

const getNotes = () => client.get(getPostEndpoint);
const addNotes = (note) => client.post(getPostEndpoint, note);
const addList = (list) => client.post(getPostEndpoint, list);
const changeTitle = (id, title) => client.patch(patchEndpoint + id, { title });
const changeNote = (id, note) => client.patch(patchEndpoint + id, { note });
const changeStyle = (id, style) => client.patch(patchEndpoint + id, style);
const changeListItem = (id, item) => client.patch(patchEndpoint + id, item);
const changeListItemChange = (id, item) =>
  client.patch(patchEndpoint + id, item);
const changeTOC = (id) => client.patch(patchEndpoint + id, { toc: "" });
const deleteNote = (id) => client.patch(patchEndpoint + id, { delete: "" });

export default {
  addNotes,
  addList,
  changeNote,
  changeTitle,
  getNotes,
  changeStyle,
  deleteNote,
  changeListItem,
  changeListItemChange,
  changeTOC,
};
