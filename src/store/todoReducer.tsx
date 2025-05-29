import type { Task, TodoAction, TodoState } from '../types/TodoTypes';
import { generateRandomId } from '../utils/helpers';

export const initialState: TodoState = {
	tasks: [
		// Example task
		{
			id: '1',
			title: 'Sample Task',
			sectionId: '1',
			isCompleted: false,
			createdAt: new Date().toISOString(),
			priority: 'medium',
		},
		{
			id: '2',
			title: 'Complete Project Report',
			sectionId: '2',
			isCompleted: false,
			createdAt: new Date().toISOString(),
			priority: 'high',
		},
		{
			id: '3',
			title: 'Buy Groceries',
			sectionId: '3',
			isCompleted: true,
			createdAt: new Date().toISOString(),
			priority: 'low',
		},
	],
	sections: [
		// Example section
		{
			id: '1',
			title: 'Home',
			color: '#3b82f6',
			sort: 100,
		},
		{
			id: '2',
			title: 'Work',
			color: '#10b981',
			sort: 200,
		},
		{
			id: '3',
			title: 'Personal',
			color: '#f59e0b',
			sort: 300,
		},
	],
	filter: 'all',
	searchQuery: '',
};

export default function todoReducer(
	state: TodoState = initialState,
	action: TodoAction
): TodoState {
	switch (action.type) {
		case 'ADD_TASK': {
			const newTask: Task = {
				id: generateRandomId(),
				title: action.payload.title,
				sectionId: action.payload.sectionId,
				isCompleted: false,
				createdAt: new Date().toISOString(),
				priority: action.payload.priority || 'medium',
			};
			return {
				...state,
				tasks: [...state.tasks, newTask],
			};
		}
		case 'TOGGLE_TASK': {
			const updatedTasks = state.tasks.map((task: Task) =>
				task.id === action.payload.id
					? { ...task, isCompleted: !task.isCompleted }
					: task
			);
			return {
				...state,
				tasks: updatedTasks,
			};
		}
		case 'DELETE_TASK': {
			return {
				...state,
				tasks: state.tasks.filter(
					(task: Task) => task.id !== action.payload.id
				),
			};
		}
		case 'UPDATE_TASK': {
			const updatedTasks = state.tasks.map((task: Task) =>
				task.id === action.payload.id
					? { ...task, ...action.payload.updates }
					: task
			);
			return {
				...state,
				tasks: updatedTasks,
			};
		}
		case 'ADD_SECTION': {
			const newSection = {
				id: generateRandomId(),
				title: action.payload.title,
				color: action.payload.color,
				sort: action.payload.sort,
			};
			return {
				...state,
				sections: [...state.sections, newSection],
			};
		}
		case 'DELETE_SECTION': {
			return {
				...state,
				sections: state.sections.filter(
					section => section.id !== action.payload.id
				),
				tasks: state.tasks.filter(task => task.sectionId !== action.payload.id),
			};
		}
		case 'SET_FILTER': {
			return {
				...state,
				filter: action.payload.filter,
			};
		}
		case 'SET_SEARCH_QUERY': {
			return {
				...state,
				searchQuery: action.payload.query,
			};
		}
		case 'REORDER_TASKS': {
			return {
				...state,
				tasks: action.payload.tasks,
			};
		}
		default:
			return state;
	}
}
