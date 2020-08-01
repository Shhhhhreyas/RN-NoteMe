import React, { useState, useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Screen from "../components/Screen";
import CheckListItem from "../components/CheckListItem";
import AddItem from "../components/AddItem";
import Title from "../components/Title";
import Separator from "../components/Separator";
import useStore from "../store/useStore";
import colors from "../config/colors";

function CheckListScreen({ route }) {
  const list = route.params;

  const scrollView = useRef();

  const isFocused = useIsFocused();

  const {
    changeTitle,
    getLastId,
    addList,
    changeListItem,
    changeListItemText,
    checkListItem,
    getToc,
    setToc,
  } = useStore();

  const [items, setItems] = useState([]);
  const [lastId, setLastId] = useState(1);
  let id = null;
  if (list) id = list.id;
  if (isFocused && !list) {
    id = getLastId();
  }

  useEffect(() => {
    setItems([]);
    setLastId(2);
    if (list) {
      if (!list.items.length) return;
      setItems([...list.items]);
      let id = list.items[list.items.length - 1].id;
      setLastId(id + 1);
    }
    if (isFocused && !list) {
      addList();
    }
    return function cleanup() {
      setToc(id);
    };
  }, [isFocused]);

  const onDelete = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    changeListItem(itemId, id, "delete");
  };

  const title = (list) => {
    if (list) return list.title;
  };
  const toc = (id) => {
    if (list)
      return (
        <View style={styles.toc}>
          <Text>Edited on: {getToc(id)}</Text>
        </View>
      );
  };

  if (isFocused)
    return (
      <>
        <Screen>
          <Title
            defaultValue={title(list)}
            onChangeText={(text, id) => changeTitle(text, id)}
            id={id}
          />
          <Separator />
          <View style={{ height: "80%" }}>
            <ScrollView
              ref={scrollView}
              onContentSizeChange={() => scrollView.current.scrollToEnd()}
              style={{}}
            >
              {items.map((item) => (
                <CheckListItem
                  id={item.id}
                  key={item.id}
                  onPressDelete={() => onDelete(item.id)}
                  defaultValue={item.text}
                  onChangeText={(text) => {
                    changeListItemText(item.id, id, text);
                  }}
                  checked={item.checked}
                  onValueChange={(value) => checkListItem(item.id, id, value)}
                />
              ))}
              <AddItem
                onPress={() => {
                  setItems([...items, { id: lastId, checked: false }]);
                  changeListItem({ id: lastId, checked: false }, id, "add");
                  setLastId(lastId + 1);
                }}
              />
            </ScrollView>
          </View>
          {toc(id)}
        </Screen>
      </>
    );
  else return <></>;
}

const styles = StyleSheet.create({
  toc: {
    backgroundColor: colors.light,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default CheckListScreen;
