import { useMemo, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import Ghost from './Ghost';
import TodoSection from './TodoSection';

export default function TodoBoard() {
	const [isCreatingSection, setIsCreatingSection] = useState(false);
	const { state } = useTodo();
	const filteredTasks = useFilteredTasks();

	const tasksBySection = useMemo(() => {
		return state.sections.reduce((acc, section) => {
			acc[section.id] = filteredTasks.filter(
				task => task.sectionId === section.id
			);
			return acc;
		}, {} as Record<string, typeof filteredTasks>);
	}, [filteredTasks, state.sections]);

	return (
		<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start'>
			{state.sections.map(section => (
				<TodoSection
					key={section.id}
					section={section}
					tasks={tasksBySection[section.id]}
				/>
			))}
			<div className='flex'>
				{isCreatingSection ? <div></div> : <Ghost placeholder='Add section' />}
			</div>
		</div>
	);
}
