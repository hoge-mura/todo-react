export const IncompleteTodos = (props) => {
  const {
    todos,
    onClickComplete,
    onClickDelete,
    editingIndex,
    editingText,
    onStartEdit,
    onChangeEdit,
    onCancelEdit,
    onSaveEdit,
  } = props;

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={`${todo}-${index}`}>
            <div className="list-row">
              {editingIndex === index ? (
                <>
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={onChangeEdit}
                    placeholder="編集内容を入力"
                    aria-label="TODO編集入力"
                  />
                  <button onClick={onSaveEdit} aria-label="編集を保存">
                    保存
                  </button>
                  <button onClick={onCancelEdit} aria-label="編集をキャンセル">
                    キャンセル
                  </button>
                </>
              ) : (
                <>
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onStartEdit(index)} aria-label="編集">
                    編集
                  </button>
                  <button
                    onClick={() => onClickComplete(index)}
                    aria-label="完了"
                  >
                    完了
                  </button>
                  <button
                    onClick={() => onClickDelete(index)}
                    aria-label="削除"
                  >
                    削除
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
