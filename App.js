import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./components/Task"; 
import AddTask from "./components/AddTask"; 

const COLOR_PALETTE = [
  "#F28B82", "#FBBC04", "#FFF475", "#CCFF90",
  "#A7FFEB", "#CBF0F8", "#AECBFA", "#D7AEFB",
  "#FDCFE8", "#E6C9A8", "#E8EAED",
];

export default function App() {
  const [items, setItems] = useState([]);

  const handleTaskPressed = async (index) => {
    let updatedTasks = [...items];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    updatedTasks.sort((a, b) => a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1);
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  const handleDeleteTask = async (index) => {
    let updatedTasks = [...items].filter((_, i) => i !== index);
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error deleting task from AsyncStorage: ", error);
    }
  };

  const onAddTaskPress = async (text) => {
    const updatedTasks = [...items, { text, isCompleted: false }];
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error adding task to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("task-list");
        if (storedTasks !== null) {
          setItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasks();
  }, []);

  const renderItem = ({ item, index }) => {
    const color = COLOR_PALETTE[index % COLOR_PALETTE.length];
    return (
      <Task
        text={item.text}
        isCompleted={item.isCompleted}
        onPress={() => handleTaskPressed(index)}
        onDelete={() => handleDeleteTask(index)}
        squareColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.items}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskContainer}>
        <AddTask onAddTaskPress={onAddTaskPress} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});