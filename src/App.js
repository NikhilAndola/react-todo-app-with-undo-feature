import React, { useReducer } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// Reducer function to handle state transitions
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        pastStates: [...state.pastStates, state.todos], // Add current state to history
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        pastStates: [...state.pastStates, state.todos],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        pastStates: [...state.pastStates, state.todos],
      };
    case 'UNDO':
      const previousState = state.pastStates[state.pastStates.length - 1];
      return {
        ...state,
        todos: previousState || state.todos,
        pastStates: state.pastStates.slice(0, -1), // Remove the last state from history
      };
    default:
      return state;
  }
};

export default function App() {
  const initialState = {
    todos: [],
    pastStates: [], // History of past states for undo
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Add Todo
  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  // Delete Todo
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  // Update Todo
  const updateTodo = (updatedTodo) => {
    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
  };

  // Undo last action
  const undoLastAction = () => {
    dispatch({ type: 'UNDO' });
  };

  return (
    <div className="App">
      <h1>Todo App with Undo</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={state.todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <button onClick={undoLastAction} disabled={state.pastStates.length === 0}>
        Undo
      </button>
    </div>
  );
}

// export default function App() {
//   return (
//     <div>
//       <h1>Hello StackBlitz!</h1>
//       <p>Start editing to see some magic happen :)</p>
//     </div>
//   );
// }

// export default App;
