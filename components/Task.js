import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text, isCompleted, onPress, onDelete, squareColor }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPress} style={styles.itemLeading}>
        <View style={[styles.square, { backgroundColor: squareColor || '#8DDFDA' }]}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text style={[styles.text, isCompleted ? styles.completedText : null]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    marginTop: 20,
  },
  itemLeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    borderRadius: 8,
    width: 24,
    height: 24,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    maxWidth: "80%",
    fontSize: 17,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Task;
