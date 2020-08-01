import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import colors from "../config/colors";
import StylePicker from "./StylePicker";
import TextSizePicker from "./TextSizePicker";

const textColors = [
  { value: "#fc5c65" },
  { value: "#4ecdc4" },
  { value: "#228B22" },
  { value: "#8B008B" },
  { value: "#000" },
];

const noteTextSizes = [
  { value: 18 },
  { value: 20 },
  { value: 22 },
  { value: 24 },
];
const titleTextSizes = [
  { value: 26 },
  { value: 28 },
  { value: 30 },
  { value: 32 },
];

function BottomBar({ styleChange = null, focus, style, toc }) {
  const [textSize, setTextSize] = useState(18);
  const [textColor, setTextColor] = useState("#000");
  const [textSizes, setTextSizes] = useState(noteTextSizes);
  useEffect(() => {
    if (focus === "title") {
      setTextSizes(titleTextSizes);
      if (style) {
        setTextColor(style.title.color);
        setTextSize(style.title.size);
      }
    } else {
      if (style) {
        setTextColor(style.note.color);
        setTextSize(style.note.size);
      }
      setTextSizes(noteTextSizes);
    }
  }, [focus]);
  return (
    <View style={styles.typeStyle}>
      <StylePicker
        children={
          <Text style={[styles.main, { fontSize: textSize }]}>{textSize}</Text>
        }
        items={textSizes}
        onSelectItem={(item) => {
          if (styleChange) styleChange(item.value, textColor);
          setTextSize(item.value);
        }}
        PickerItemComponent={TextSizePicker}
      />
      <View>
        <Text>Edited on: {toc}</Text>
      </View>
      <StylePicker
        children={
          <View style={[styles.typeColor, { backgroundColor: textColor }]} />
        }
        items={textColors}
        onSelectItem={(item) => {
          if (styleChange) styleChange(textSize, item.value);
          setTextColor(item.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    fontSize: 18,
  },
  modal: {
    width: "80%",
    height: 40,
    backgroundColor: colors.light,
    position: "absolute",
    bottom: 50,
    marginLeft: 30,
    marginRight: 30,
    flexGrow: 1,
  },
  typeStyle: {
    backgroundColor: colors.light,
    height: 35,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  typeColor: {
    backgroundColor: colors.black,
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
});

export default BottomBar;
