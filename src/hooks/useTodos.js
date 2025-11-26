import { useEffect, useReducer } from "react";
import { loadTodos, saveTodos } from '../services/storage';

// Initial state for reducer
const initialState = {
  todos: [],
}

const reducer = (state, action) => {
  switch(action.type) {
    // Set todos after loading from storage
    case "SET_TODOS":
      return {...state, todos: action.payload};
    // Add new todo at the top of the list  
    case "ADD_TODO":
      return {...state, todos: [action.payload, ... state.todos]};
    // Update an existing todo by ID  
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map(val => (val.id === action.payload.id ? {...val, ...action.payload} : val))
      };
    // Remove a todo by ID  
    case "DELETE_TODO":
      return {...state, todos: state.todos.filter(val => val.id !== action.payload)};
    default:
      return state;    
  }
}

const useTodos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load todos
  useEffect(() => {
    (async () => {
      const storedTasks = await loadTodos();
      dispatch({type: "SET_TODOS", payload: storedTasks});
    })();
  }, []);

  // Save todos to storage
  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  const addTodo = (todo) => {
    dispatch({type: "ADD_TODO", payload: todo})
  };
  const updateTodo = (payload) => {
    dispatch({type: "UPDATE_TODO", payload});
  }
  const deleteTodo = (id) => dispatch({type: "DELETE_TODO", payload: id});
  
  return {
    todos: state.todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useTodos;