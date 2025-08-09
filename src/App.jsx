import { useEffect, useState } from "react";
import Navbar from "./My components/Navbar";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo !== "") {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
      setTodo("");
    }
  };

  const handleEdit = (id) => {
    if (todo !== "") {
      alert("Save the existing todo first");
      return;
    }
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-3 sm:px-6 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className="font-bold text-center text-lg sm:text-xl mb-4">
          PrioriTask - Manage your todos at one place
        </h1>

        <div className="addTodo mb-4">
          <h2 className="text-base sm:text-lg font-bold mb-2">Add a todo</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full sm:w-1/2 focus:bg-violet-200 transition-colors duration-200 p-2 rounded"
              placeholder="Enter your task..."
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 text-white p-2 px-4 rounded-2xl hover:bg-violet-950 font-bold"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center space-x-2">
            <input
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
            />
            <span>Show Finished</span>
          </label>
        </div>

        <h2 className="text-lg sm:text-xl font-bold mb-2">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-3/4 bg-white p-3 rounded mb-3 shadow-md gap-2"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div
                      className={`break-words ${
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 text-white px-4 py-1 rounded-2xl hover:bg-violet-950 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 text-white px-4 py-1 rounded-2xl hover:bg-violet-950 font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
