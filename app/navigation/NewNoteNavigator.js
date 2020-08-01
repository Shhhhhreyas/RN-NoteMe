import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NoteScreen from "../screens/NoteScreen";

const Stack = createStackNavigator();

function NewNoteNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Note" component={NoteScreen} />
    </Stack.Navigator>
  );
}

export default NewNoteNavigator;
