import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotesScreen from "../screens/NotesScreen";
import NoteScreen from "../screens/NoteScreen";
import CheckListScreen from "../screens/CheckListScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

function NotesNavigator(props) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{ cardStyle: { backgroundColor: colors.white } }}
    >
      <Stack.Screen
        name="Notes"
        component={NotesScreen}
        options={{ title: "My Notes" }}
      />
      <Stack.Screen
        name="NoteEdit"
        component={NoteScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="CheckListEdit"
        component={CheckListScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

export default NotesNavigator;
