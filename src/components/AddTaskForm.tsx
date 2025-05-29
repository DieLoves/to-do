import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTodo } from '../context/TodoContext';
import type { Priority } from '../types/TodoTypes';
import Button from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface AddTaskFormProps {
	sectionId: string;
	onClose: () => void;
}

export default function AddTaskForm({ sectionId, onClose }: AddTaskFormProps) {
	const { dispatch } = useTodo();

	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState<Priority>('medium');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			toast.error('Title is void');
			return;
		}

		dispatch({
			type: 'ADD_TASK',
			payload: {
				sectionId,
				title: title.trim(),
				priority,
			},
		});

		toast.success('Task added successfully!');
		setTitle('');
		onClose();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-5 p-5 bg-slate-700 rounded-lg'
		>
			<div className='flex items-center justify-between'>
				<h1 className='font-medium'>Add New Task</h1>
				<Button variant='ghost' size='sm'>
					<X className='w-4 h-4' />
				</Button>
			</div>
			<Input
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder='Enter task title...'
			/>
			<div className='relative'>
				<Select
					onChange={value => setPriority(value as Priority)}
					value={priority}
					options={[
						{ value: 'low', label: 'Low Priority' },
						{ value: 'medium', label: 'Medium Priority' },
						{ value: 'high', label: 'High Priority' },
					]}
				/>
			</div>
			<div className='flex gap-2'>
				<Button type='submit' variant='default' size='md'>
					+ Add Task
				</Button>
				<Button type='reset' variant='outline' size='md'>
					Cancel
				</Button>
			</div>
		</form>
	);
}
