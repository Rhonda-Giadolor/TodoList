import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const Scroll = ({ tasks, onToggleTask }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onToggleTask(item.id)}>
      <View style={styles.item}>
        <View style={styles.itemLeading}>
          <View style={[styles.square, item.isCompleted && styles.completedSquare]} />
          <Text style={[styles.text, item.isCompleted && styles.completedText]}>
            {item.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemLeading: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    backgroundColor: '#8DDFDA',
    borderRadius: 4,
    width: 24,
    height: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedSquare: {
    backgroundColor: '#58A55C',
  },
  text: {
    maxWidth: '80%',
    fontSize: 17,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default Scroll;