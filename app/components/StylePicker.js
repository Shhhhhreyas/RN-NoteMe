import React, { useState } from "react";
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import ColorPicker from "./ColorPicker";
import Screen from "./Screen";
import colors from "../config/colors";

function StylePicker({
  items,
  children,
  PickerItemComponent = ColorPicker,
  noOfColumns = items.length,
  onSelectItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        {children}
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <Screen>
          <View style={styles.modal}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              numColumns={noOfColumns}
              renderItem={({ item }) => (
                <PickerItemComponent
                  item={item}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: "space-evenly",
                marginVertical: 5,
              }}
            />
          </View>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "80%",
    height: 35,
    backgroundColor: colors.light,
    position: "absolute",
    bottom: 90,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default StylePicker;
