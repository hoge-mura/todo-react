import { useState, useEffect } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

const loadArray = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(() =>
    loadArray("incompleteTodos")
  );
  const [completeTodos, setCompleteTodos] = useState(() =>
    loadArray("completeTodos")
  );

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
  }, [incompleteTodos]);
  useEffect(() => {
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onClickAdd = () => {
    const value = todoText.trim();
    if (!value) return;
    setIncompleteTodos((prev) => [...prev, value]);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
    const next = [...incompleteTodos];
    next.splice(index, 1);
    setIncompleteTodos(next);
  };

  const onClickComplete = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
    const nextIncomplete = [...incompleteTodos];
    const target = nextIncomplete.splice(index, 1)[0];
    setIncompleteTodos(nextIncomplete);
    setCompleteTodos((prev) => [...prev, target]);
  };

  const onClickBack = (index) => {
    const nextComplete = [...completeTodos];
    const target = nextComplete.splice(index, 1)[0];
    setCompleteTodos(nextComplete);
    setIncompleteTodos((prev) => [...prev, target]);
  };

  const onStartEdit = (index) => {
    setEditingIndex(index);
    setEditingText(incompleteTodos[index]);
  };
  const onCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };
  const onSaveEdit = () => {
    const value = editingText.trim();
    if (!value) return;
    const next = [...incompleteTodos];
    next[editingIndex] = value;
    setIncompleteTodos(next);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <main className="app">
      <h1 className="app-title">React TODO</h1>

      <div className="summary">
        <span className="badge active">未完了 {incompleteTodos.length}</span>
        <span className="badge done">完了 {completeTodos.length}</span>
      </div>

      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <div className="columns">
        <IncompleteTodos
          todos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
          editingIndex={editingIndex}
          editingText={editingText}
          onStartEdit={onStartEdit}
          onChangeEdit={(e) => setEditingText(e.target.value)}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
        />
        <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      </div>
    </main>
  );
};
