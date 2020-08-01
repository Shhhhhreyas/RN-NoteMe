import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import colors from "../config/colors";

function Title({
  defaultValue = "",
  onChangeText,
  id,
  onFocus = null,
  style = null,
}) {
  if (!style) style = styles.titleFont;
  return (
    <View style={styles.title}>
      <TextInput
        defaultValue={defaultValue}
        multiline
        onChangeText={(text) => onChangeText(text, id)}
        placeholder="Title"
        style={([styles.titleFont], style)}
        onFocus={onFocus}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    height: "10%",
    backgroundColor: colors.light,
  },
  titleFont: {
    fontSize: 26,
  },
});

export default Title;
