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
  // ★ 初期値を localStorage からロード（遅延初期化）
  const [incompleteTodos, setIncompleteTodos] = useState(() =>
    loadArray("incompleteTodos")
  );
  const [completeTodos, setCompleteTodos] = useState(() =>
    loadArray("completeTodos")
  );

  // 配列が変わるたびに保存（復元は初期化時点で完了している）
  useEffect(() => {
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
  }, [incompleteTodos]);

  useEffect(() => {
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    const value = todoText.trim();
    if (!value) return;
    setIncompleteTodos((prev) => [...prev, value]);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncomplete = [...incompleteTodos];
    const target = newIncomplete.splice(index, 1)[0];
    setIncompleteTodos(newIncomplete);
    setCompleteTodos((prev) => [...prev, target]);
  };

  const onClickBack = (index) => {
    const newComplete = [...completeTodos];
    const target = newComplete.splice(index, 1)[0];
    setCompleteTodos(newComplete);
    setIncompleteTodos((prev) => [...prev, target]);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
