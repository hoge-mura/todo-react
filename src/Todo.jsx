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

  // 編集中の情報（未完了リストの index と入力値）
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

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
    // 編集中に削除されたら編集モード解除
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
    const next = [...incompleteTodos];
    next.splice(index, 1);
    setIncompleteTodos(next);
  };

  const onClickComplete = (index) => {
    // 編集中に完了されたら編集モード解除
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

  // 編集開始
  const onStartEdit = (index) => {
    setEditingIndex(index);
    setEditingText(incompleteTodos[index]);
  };

  // 編集キャンセル
  const onCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  // 編集保存
  const onSaveEdit = () => {
    const value = editingText.trim();
    if (!value) return; // 空は保存しない
    const next = [...incompleteTodos];
    next[editingIndex] = value;
    setIncompleteTodos(next);
    setEditingIndex(null);
    setEditingText("");
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
        editingIndex={editingIndex}
        editingText={editingText}
        onStartEdit={onStartEdit}
        onChangeEdit={(e) => setEditingText(e.target.value)}
        onCancelEdit={onCancelEdit}
        onSaveEdit={onSaveEdit}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
