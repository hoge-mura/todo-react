export const CompleteTodos = (props) => {
  const { todos, onClickBack } = props;
  return (
    <div className="complete-area">
      <p className="title">完了したTODO</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={`${todo}-${index}`}>
            <div className="list-row">
              <p className="todo-item done">{todo}</p>
              <button onClick={() => onClickBack(index)} aria-label="戻す">
                戻す
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
