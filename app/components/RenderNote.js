import React from "react";
import { View, StyleSheet, ToastAndroid, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import useStore from "../store/useStore";
import colors from "../config/colors";

function RenderNote({ item, onPress, longPress }) {
  const { deleteNote } = useStore();
  if (item && !item.title) {
    if (item.type === "note" && !item.note) {
      deleteNote(item.id);
      Platform.OS === "android"
        ? ToastAndroid.show("Empty note deleted", ToastAndroid.LONG)
        : alert("Empty note deleted");
      return <></>;
    }
    if (item.type === "list") {
      var textPresent = false;
      item.items.every((item) => {
        if (item.text) {
          textPresent = true;
          return false;
        }
        return true;
      });
      if (!textPresent) {
        deleteNote(item.id);
        alert("Empty list deleted");
        return <></>;
      }
    }
  }
  if (item.type === "note") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          onLongPress={() => longPress(item.id)}
          delayLongPress={300}
        >
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={5} style={styles.note}>
            {item.note}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (item.type === "list") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          onLongPress={() => longPress(item.id)}
          delayLongPress={300}
        >
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={5} style={styles.note}>
            {item.items.map((entry) => {
              return entry.text ? "◘ " + entry.text + "\n" : "◘ " + "" + "\n";
            })}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else return <></>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 7,
  },
  note: {
    fontSize: 13,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    width: "50%",
    borderWidth: 1,
    borderColor: colors.medium,
    margin: 5,
    borderRadius: 7,
    flexGrow: 1,
    padding: 5,
  },
});

export default RenderNote;
