import { Trash } from 'phosphor-react';
import styles from './TodoItem.module.css';

import { ItemType } from './typedefs';

interface TodoItemProps {
  item: ItemType;
  onDeleteItem: (item: ItemType) => void
  onToggleCheckItem: (item: ItemType) => void
}
export function TodoItem(props: TodoItemProps) {
  const { item, onDeleteItem, onToggleCheckItem } = props;
  const { content, done } = item;

  function handleDeleteItem() {
    onDeleteItem(item)
  }
  function handleToggleCheckItem() {
    onToggleCheckItem(item)
  }

  return (
    <article className={styles.todoItem}>
      <div className={styles.boxInput}>
        <input type="checkbox" checked={done} name={`checked${done}`} onChange={handleToggleCheckItem}/>
      </div>
      {/* {done ? (
        <button className={styles.checked} onClick={handleToggleCheckItem} title="Deletar ToDo" data-checked={done}>
          <Check size={17} />
        </button>
      ) : (
        <button className={styles.notChecked} onClick={handleToggleCheckItem} title="Deletar ToDo" data-checked={done}>
          <Circle size={17} />
        </button>
      )} */}
      <p className={done ? styles.checked : ''}>
        {content}
      </p>
      <button className={styles.delete} onClick={handleDeleteItem} title="Deletar ToDo">
        <Trash size={14} />
      </button>
    </article>
  )
}