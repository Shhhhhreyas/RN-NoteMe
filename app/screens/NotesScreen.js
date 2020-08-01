import React, { useState, useEffect } from "react";
import { FlatList, View, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import RenderNote from "../components/RenderNote";
import colors from "../config/colors";
import useStore from "../store/useStore";
import NoNotes from "./NoNotes";
import notesApi from "../api/notes";

function NotesScreen({ navigation }) {
  const { getState, subscribeStore, addNote } = useStore();
  const [items, setItems] = useState(getState().entities.notes.list);
  const [refreshing, setRefreshing] = useState(false);

  const populateStore = async () => {
    const response = await notesApi.getNotes();
    if (response.ok) {
      const notes = response.data;
      notes.forEach((note) => addNote(note));
    }
  };
  useEffect(() => {
    populateStore();
    setItems(getState().entities.notes.list);
  }, []);
  subscribeStore(async () => {
    setItems(await getState().entities.notes.list);
  });
  if (!useIsFocused()) return <></>;

  const { deleteNote } = useStore();
  const handleLongPress = (id) => {
    Alert.alert("Delete", "Are you sure to delete this note?", [
      { text: "Yes", onPress: () => deleteNote(id) },
      { text: "No" },
    ]);
  };

  if (!items.length) return <NoNotes />;

  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: colors.light, height: "80%" }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderNote
              item={item}
              onPress={() => {
                if (item.type === "note") navigation.navigate("NoteEdit", item);
                else if (item.type === "list")
                  navigation.navigate("CheckListEdit", item);
              }}
              longPress={handleLongPress}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setItems(getState().entities.notes.list);
            setRefreshing(false);
          }}
        />
      </View>
    </Screen>
  );
}

export default NotesScreen;
