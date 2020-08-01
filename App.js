import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import configureStore from "./app/store/configureStore";
import StoreContext from "./app/store/context";

const store = configureStore();

export default function App() {
  return (
    <StoreContext.Provider value={{ store }}>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

/**/
