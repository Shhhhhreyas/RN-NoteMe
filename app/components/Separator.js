import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function Separator(props) {
  return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
  seperator: {
    height: 3,
    backgroundColor: colors.medium,
    marginVertical: 4,
  },
});

export default Separator;
