import AsyncStorage from "@react-native-async-storage/async-storage"
import { storageKeys } from "../constants"

// Load todos from AsyncStorage.
export const loadTodos = async () => {
  try {
    const data = await AsyncStorage.getItem(storageKeys.KEY);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    return [];
  }
};

// Persist todos into AsyncStorage.
export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(storageKeys.KEY, JSON.stringify(todos));
  } catch(e) {
    // failed to save todos
  }
}