import { useTodo } from '@/context/TodoContext';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Section, Task } from '../types/TodoTypes';
import AddTaskForm from './AddTaskForm';
import TaskCard from './TaskCard';
import Button from './ui/Button';

interface TodoSectionProps {
	section: Section;
	tasks: Task[];
}

export default function TodoSection({ section, tasks }: TodoSectionProps) {
	const { dispatch } = useTodo();
	const [addTaskModelView, setAddTaskModelView] = useState(false);

	const handleDelete = () => {
		dispatch({
			type: 'DELETE_SECTION',
			payload: {
				id: section.id,
			},
		});
		toast.success(`Section "${section.title}" deleted successfully!`);
	};

	const completedTasks = tasks.filter(task => task.isCompleted).length;

	return (
		<div className='bg-slate-800 rounded-lg p-6 space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center max-w-md gap-3'>
					<div
						className='w-4 h-4 rounded-full'
						style={{ backgroundColor: section.color }}
					></div>
					<h1 className='text-xl font-semibold'>{section.title}</h1>
					<span className='text-sm text-slate-400'>
						{completedTasks}/{tasks.length}
					</span>
				</div>
				<div className='flex gap-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => setAddTaskModelView(prev => !prev)}
						aria-label={`Add task to ${section.title}`}
					>
						<Plus className='w-4 h-4' />
					</Button>

					<Button
						disabled={!!tasks.length}
						onClick={handleDelete}
						variant='ghost'
						size='sm'
						aria-label={`Delete section "${section.title}"`}
					>
						<Trash2 className='w-4 h-4' />
					</Button>
				</div>
			</div>
			{addTaskModelView && (
				<AddTaskForm
					sectionId={section.id}
					onClose={() => setAddTaskModelView(prev => !prev)}
				/>
			)}
			<div className='space-y-2'>
				{tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
				{tasks.length === 0 && (
					<p className='text-slate-400 text-center py-8'>
						No tasks yet. Add one above!
					</p>
				)}
			</div>
		</div>
	);
}
