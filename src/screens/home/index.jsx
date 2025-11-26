import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import useTodos from "../../hooks/useTodos";
import { colors, sizes } from "../../theme";
import styles from "./styles";
import TodoItem from "../../components/todoItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";

const HomeScreen = () => {

  // Custom hook for all todo actions
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  const inputRef = useRef(null); // Ref used to auto-focus the task input

  // States
  const [addingTask, setAddingTask] = useState(false);
  const [input, setInput] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Auto-focus input when toggling "add task" mode
  useEffect(() => {
    inputRef.current?.focus();
  }, [addingTask]);

  // Toggle task completion
  const handleToggle = (id) => {
    const task = todos.find((val) => val.id === id);
    task && updateTodo({ id, completed: !task.completed });
  };

  // Update input and switch UI into "edit mode"
  const handleEdit = (todo) => {
    setInput(todo.title);
    setAddingTask(true);
    setUpdatingId(todo.id);
  };

  // Confirm deletion with alert
  const handleDelete = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task", [
      {
        text: "Delete",
        onPress: () => {
          deleteTodo(id);
        },
      },
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
  };

  // Add or update a todo depending on state
  const saveTask = () => {
     // Prevent saving empty inputs
    if (!input || input.trim().length === 0) {
      setAddingTask(false);
      setInput(null);
      return;
    }

    // Update existing task
    if (updatingId) {
      updateTodo({
        id: updatingId,
        title: input,
        completed: false,
      });
      setUpdatingId(null);
    } 
    // Create new task
    else {
      addTodo({
        id: Date.now(), // unique id
        title: input,
        completed: false,
      });
    }
    setAddingTask(false);
    setInput(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.container}>
        <Text style={styles.title}>tasked</Text>

         {/* Input field for adding/editing a todo */}
        {addingTask && (
          <View style={styles.inputContainer}>
            <Ionicons name="square" size={sizes.h2 * 2} color={colors.black} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={input}
              autoFocus={addingTask}
              onChangeText={(val) => setInput(val)}
              onSubmitEditing={saveTask}
            />
          </View>
        )}

        {/* List of todos */}
        <View>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // Fade animation
              <Animated.View entering={FadeInDown.delay(50)}>
                <TodoItem
                  todo={item}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Animated.View>
            )}
          />
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          onPress={() => {
            setAddingTask(!addingTask);
            setInput(null);
            setUpdatingId(null);
          }}
          style={styles.fab}
        >
          <Entypo
            name={addingTask ? "cross" : "plus"}
            size={sizes.h2 * 2}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
