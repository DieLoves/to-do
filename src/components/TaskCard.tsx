import { useTodo } from '@/context/TodoContext';
import type { Priority, Task } from '@/types/TodoTypes';
import { Calendar, Edit3, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/helpers';
import { Badge } from './ui/Badge';
import Button from './ui/Button';
import { Checkbox } from './ui/Checkbox';

const priorityColors: Record<Priority, string> = {
	low: 'bg-green-500',
	medium: 'bg-yellow-500',
	high: 'bg-red-500',
};

export default function TaskCard({ task }: { task: Task }) {
	const { dispatch } = useTodo();
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);

	const handleToggle = () => {
		dispatch({ type: 'TOGGLE_TASK', payload: { id: task.id } });
		toast.success(
			task.isCompleted ? 'Task marked as incomplete' : 'Task completed!'
		);
	};

	const handleDelete = () => {
		dispatch({
			type: 'DELETE_TASK',
			payload: {
				id: task.id,
			},
		});
		toast.success('Task deleted successfully!');
	};

	const handleEdit = () => {
		if (isEditing && editTitle.trim() !== task.title) {
			dispatch({
				type: 'UPDATE_TASK',
				payload: {
					id: task.id,
					updates: {
						title: editTitle.trim(),
					},
				},
			});
			toast.success('Task title edit success!');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleEdit();
		}
		if (e.key === 'Escape') {
			setEditTitle(task.title);
			setIsEditing(false);
		}
	};

	return (
		<div
			className={`bg-slate-700 rounded-lg p-4 transition-all duration-200
      ${task.isCompleted ? 'opacity-60' : ''}
      hover:bg-slate-600 flex justify-between`}
		>
			<div className='flex items-start gap-3'>
				<Checkbox
					checked={task.isCompleted}
					onChange={handleToggle}
					aria-label={`Mark "${task.title}" as ${
						task.isCompleted ? 'incomplete' : 'complete'
					}`}
				/>
				<div className='flex items-start flex-col gap-2'>
					{isEditing ? (
						<input
							type='text'
							value={editTitle}
							onChange={e => setEditTitle(e.target.value)}
							onBlur={handleEdit}
							onKeyDown={handleKeyPress}
							className='w-full bg-slate-600 text-white px-2 py-1 rounded border-none outline-none focus:ring-2 focus:ring-blue-500'
							autoFocus
						/>
					) : (
						<h3
							className={`font-medium break-words ${
								task.isCompleted ? 'line-through' : ''
							}`}
						>
							{task.title}
						</h3>
					)}
					<div className='flex gap-2'>
						<Badge className={priorityColors[task.priority]}>
							{task.priority}
						</Badge>
						<div className='flex items-center gap-1 text-slate-400 text-xs'>
							<Calendar className='w-5 h-5' />
							{formatDate(task.createdAt)}
						</div>
					</div>
				</div>
			</div>
			<div className='flex gap-1'>
				<Button
					onClick={() => {
						setIsEditing(prev => !prev);
						handleEdit();
					}}
					variant='ghost'
					size='sm'
				>
					<Edit3 className='w-4 h-4' />
				</Button>
				<Button onClick={handleDelete} variant='ghost' size='sm'>
					<Trash2 className='w-4 h-4' />
				</Button>
			</div>
		</div>
	);
}
