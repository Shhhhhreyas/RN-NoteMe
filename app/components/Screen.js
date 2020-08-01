import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <StatusBar style="auto" />
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    //marginTop: Constants.statusBarHeight,
    flex: 1,
    padding: 10,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
