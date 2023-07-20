import "./App.css";
import TodoList from "./TodoList";
import "./Todo.css";
function App() {
  return (
    <div className='App'>
      <div className='todo-label'>
        <label>Todo List</label>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
