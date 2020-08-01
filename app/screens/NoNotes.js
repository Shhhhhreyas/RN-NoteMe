import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";

function NoNotes(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.text}>You have no notes!!</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    opacity: 0.5,
  },
  text: {
    fontSize: 30,
    color: colors.secondary,
  },
});

export default NoNotes;
