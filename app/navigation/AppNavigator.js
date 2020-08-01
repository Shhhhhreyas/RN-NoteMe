import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NotesNavigator from "./NotesNavigator";
import colors from "../config/colors";
import NewNoteNavigator from "./NewNoteNavigator";
import NewListNavigator from "./NewListNavigator";

const Tab = createBottomTabNavigator();

const Dummy = () => {
  return <View />;
};

function AppNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="myNotes"
      tabBarOptions={{
        labelStyle: { fontSize: 15 },
        header: { visible: true },
        inactiveBackgroundColor: colors.light,
        activeBackgroundColor: colors.medium,
        activeTintColor: colors.green,
      }}
    >
      <Tab.Screen
        name="newNote"
        component={NewNoteNavigator}
        options={{
          title: "New Note",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="playlist-plus"
              size={40}
              color={colors.green}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myNotes"
        component={NotesNavigator}
        options={{
          title: "My Notes",

          tabBarIcon: ({ size }) => (
            <View style={styles.addContainer}>
              <MaterialCommunityIcons
                name="note-text"
                size={50}
                color={colors.greenDark}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="newList"
        component={NewListNavigator}
        options={{
          title: "New List",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="format-list-checks"
              size={40}
              color={colors.green}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    bottom: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default AppNavigator;
