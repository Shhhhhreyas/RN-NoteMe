import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

function ColorPicker({ onPress, item }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          height: 25,
          width: 25,
          borderRadius: 12.5,
          backgroundColor: item.value,
        }}
      />
    </TouchableWithoutFeedback>
  );
}

export default ColorPicker;
