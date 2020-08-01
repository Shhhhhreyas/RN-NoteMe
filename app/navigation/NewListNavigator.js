import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckListScreen from "../screens/CheckListScreen";

const Stack = createStackNavigator();

function NewListNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New List" component={CheckListScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NewListNavigator;
