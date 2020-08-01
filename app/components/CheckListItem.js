import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Checkbox from "@react-native-community/checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CheckListItem({
  id,
  onPressDelete,
  defaultValue,
  onChangeText,
  checked,
  onValueChange,
}) {
  const [toggle, setToggle] = useState(!checked);
  return (
    <View style={styles.container} id={id}>
      <Checkbox
        onValueChange={() => {
          setToggle(!toggle);
          onValueChange(toggle);
        }}
        value={!toggle}
      />
      <View style={styles.textCont}>
        <TextInput
          placeholder="Item..."
          multiline
          style={styles.text}
          defaultValue={defaultValue}
          onChangeText={(text) => onChangeText(text)}
        />
      </View>
      <View style={styles.delete}>
        <TouchableWithoutFeedback onPress={onPressDelete}>
          <MaterialCommunityIcons name="delete" size={30} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 7.5,
    marginTop: 7.5,
  },
  delete: {
    position: "absolute",
    right: 0,
  },
  textCont: {
    flexShrink: 1,
    width: "85%",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default CheckListItem;
