import './global.css';
import styles from './App.module.css';
import imgEmpty from './assets/empty.svg';

import { Header } from './components/Header';
import { TopBar } from './components/TopBar';

import { ItemType } from './typedefs';
import { useState } from 'react';
import { generateId } from './utils/uuid';
import { TodoItem } from './TodoItem';


function App() {
  const [ todoList, setTodoList ] = useState<ItemType[]>([]);

  function onCreateNewTodo(newTodoText: string) {
     setTodoList([
      ...todoList,
      { id: generateId(), done: false, content: newTodoText }
    ])
  }
  function onDeleteItem(item: ItemType) {
     setTodoList([
      ...todoList.filter(i => i.id !== item.id),
    ])
  }

  function onToggleCheckItem(item: ItemType) {
     setTodoList([
      ...todoList.map(i => {
        if (i.id === item.id) {
          i.done = !i.done;
        }

        return i
      }),
    ])
  }

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <TopBar onCreateNewTodo={onCreateNewTodo} />

        <main>
          <header>
            <div className={styles.boxCountTodo}>
              <strong>Tarefas criadas</strong>
              <span className={styles.badge}>{todoList.length}</span>
            </div>
            <div className={styles.boxCountDone}>
              <strong>Concluídas</strong>
              <span className={styles.badge}>
                {todoList.length > 0 
                  ? `${todoList.filter(t => t.done).length} de ${todoList.length}`
                  : 0
                }
              </span>
            </div>
          </header>

          <footer>
            {todoList.length > 0 ? (
              <>
                {todoList.map(item => {
                  return (
                    <TodoItem 
                      key={item.id}
                      item={item}
                      onDeleteItem={onDeleteItem}
                      onToggleCheckItem={onToggleCheckItem}
                    />
                  )
                })}
              </>
            ) : (
              <div className={styles.boxEmpty}>
                <div>
                  <img src={imgEmpty} alt="Lista vazia" />
                </div>
                <div>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>

              </div>
            )}

          </footer>
        </main>
      </div>
      
    </>
  )
}

export default App
