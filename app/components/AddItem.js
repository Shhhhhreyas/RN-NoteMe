import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AddItem({ onPress }) {
  return (
    <View
      style={{
        marginTop: 10,
        paddingLeft: 1,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={30}
          color={colors.medium}
        />
      </TouchableOpacity>
    </View>
  );
}
export default AddItem;
