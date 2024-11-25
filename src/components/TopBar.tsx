import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import styles from './TopBar.module.css'
import { PlusCircle } from 'phosphor-react';

interface TopBarProps {
    onCreateNewTodo: (newTodoText: string) => void
}

export function TopBar(props: TopBarProps) {
    const [newTodoText, setNewTodoText] = useState('');

    function handleCreateNewTodo(event: FormEvent) {
        event.preventDefault();
        props.onCreateNewTodo(newTodoText)
        setNewTodoText('');
    }

    function handleNewTodoChange(event: ChangeEvent<HTMLInputElement> ) {
        const { value } = event.target;
        event.target.setCustomValidity('');
        setNewTodoText(value);
    }

    function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    const isNewTodoEmpty = newTodoText.trim().length === 0;

    return (
        <div className={styles.topbar}>

            <form onSubmit={handleCreateNewTodo} className={styles.form}>
                <input 
                    type='text'
                    required
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewTodoChange}
                    value={newTodoText}
                    onInvalid={handleNewTodoInvalid}
                />

                <button type='submit' disabled={isNewTodoEmpty}>
                    Criar <PlusCircle size={16} weight='bold' />
                </button>
            </form>
            
        </div>
    );
}