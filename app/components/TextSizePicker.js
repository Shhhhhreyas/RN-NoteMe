import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

function TextSizePicker({ onPress, item }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={{ fontSize: 18, color: "#000" }}>{item.value}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TextSizePicker;
