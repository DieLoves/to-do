export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'active' | 'completed';

export interface Task {
	id: string;
	title: string;
	sectionId: string;
	isCompleted: boolean;
	createdAt: string;
	priority: Priority;
	description?: string;
	dueDate?: string;
}

export interface Section {
	id: string;
	title: string;
	color: string;
}

export interface TodoState {
	tasks: Task[];
	sections: Section[];
	filter: Filter;
	searchQuery: string;
}

export type TodoAction =
	| {
			type: 'ADD_TASK';
			payload: { title: string; sectionId: string; priority?: Priority };
	  }
	| { type: 'TOGGLE_TASK'; payload: { id: string } }
	| { type: 'DELETE_TASK'; payload: { id: string } }
	| { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
	| { type: 'ADD_SECTION'; payload: { title: string; color: string } }
	| { type: 'DELETE_SECTION'; payload: { id: string } }
	| { type: 'SET_FILTER'; payload: { filter: Filter } }
	| { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
	| { type: 'REORDER_TASKS'; payload: { tasks: Task[] } };
