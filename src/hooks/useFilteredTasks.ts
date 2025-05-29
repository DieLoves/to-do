import { useMemo } from 'react';
import { useTodo } from '../context/TodoContext';
import type { Priority } from '../types/TodoTypes';

export function useFilteredTasks() {
	const { state } = useTodo();

	return useMemo(() => {
		let filtered = state.tasks;
		// Поиск по searchQuery
		if (state.searchQuery) {
			const query = state.searchQuery.toLowerCase();
			filtered = filtered.filter(task =>
				task.title.toLowerCase().includes(query)
			);
		}

		// Применение фильтров
		switch (state.filter) {
			case 'active':
				filtered = filtered.filter(task => !task.isCompleted);
				break;
			case 'completed':
				filtered = filtered.filter(task => task.isCompleted);
				break;
			default:
				break;
		}

		// Сортировка по приоритету и дате создания
		return filtered.sort((a, b) => {
			const priorityOrder: Record<Priority, number> = {
				high: 1,
				medium: 2,
				low: 3,
			};
			const priorityDiff =
				priorityOrder[b.priority] - priorityOrder[a.priority];

			if (priorityDiff !== 0) {
				return priorityDiff;
			}

			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	}, [state.searchQuery, state.tasks, state.filter]);
}
