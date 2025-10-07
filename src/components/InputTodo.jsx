export const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;

  return (
    <div className="input-area">
      <input
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onClick();
        }}
        aria-label="TODO入力"
      />
      <button onClick={onClick}>追加</button>
    </div>
  );
};
