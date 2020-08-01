import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import Title from "../components/Title";
import Separator from "../components/Separator";
import BottomBar from "../components/BottomBar";
import useStore from "../store/useStore";

function NoteScreen({ route }) {
  const note = route.params;
  const {
    addNote,
    changeNote,
    changeTitle,
    getLastId,
    getStyle,
    changeStyle,
    subscribeStore,
    getToc,
    setToc,
  } = useStore();
  const isFocused = useIsFocused();

  let id = null;

  if (note) id = note.id;

  const [style, setStyle] = useState(getStyle(id));
  if (isFocused && !note && !id) {
    id = getLastId();
  }

  const unsubscribe = subscribeStore(() => setStyle(getStyle(id)));

  useEffect(() => {
    if (!note && isFocused) {
      addNote();
      id = getLastId();
      setStyle(getStyle(id));
      subscribeStore(() => setStyle(getStyle(id)));
    }
    return function cleanup() {
      unsubscribe();
      setToc(id);
    };
  }, [isFocused]);

  const title = (note) => {
    if (note) return note.title;
    else return null;
  };
  const text = (note) => {
    if (note) return note.note;
    else return null;
  };

  const toc = (id) => {
    if (note) return getToc(id);
  };

  const [focus, setFocus] = useState("note");
  const handleStyleChange = (size, color) => {
    changeStyle(id, focus, size, color);
  };

  if (isFocused)
    return (
      <Screen>
        <Title
          defaultValue={title(note)}
          onChangeText={(text, id) => changeTitle(text, id)}
          id={id}
          onFocus={() => setFocus("title")}
          style={{ fontSize: style.title.size, color: style.title.color }}
        />
        <Separator />
        <View style={styles.container}>
          <TextInput
            placeholder="Start tapping your keyboard....."
            multiline
            style={
              ([styles.main],
              { fontSize: style.note.size, color: style.note.color })
            }
            defaultValue={text(note)}
            onChangeText={(text) => {
              changeNote(text, id);
            }}
            onFocus={() => setFocus("note")}
          />
        </View>
        <BottomBar
          styleChange={handleStyleChange}
          focus={focus}
          style={style}
          toc={toc(id)}
        />
      </Screen>
    );
  else return <></>;
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
  },
  main: {
    fontSize: 18,
  },
});

export default NoteScreen;
