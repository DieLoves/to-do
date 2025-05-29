import { createContext, useContext, useEffect, useReducer } from 'react';
import todoReducer, { initialState } from '../store/todoReducer';
import type { TodoAction, TodoState } from '../types/TodoTypes';
import { getFromStorage, setToStorage } from '../utils/storage';

interface TodoContextProps {
	state: TodoState;
	dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, initialState, init => {
		const store = getFromStorage<TodoState>('todoState');
		return store || init;
	});

	useEffect(() => {
		setToStorage<TodoState>('todoState', state);
	});

	return (
		<TodoContext.Provider value={{ state, dispatch }}>
			{children}
		</TodoContext.Provider>
	);
}

export function useTodo(): TodoContextProps {
	const context = useContext(TodoContext);
	if (context === undefined) {
		throw new Error('useTodo must be not undefined');
	}
	return context;
}
