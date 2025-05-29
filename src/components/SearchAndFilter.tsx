import { Search } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import type { Filter } from '../types/TodoTypes';
import Button from './ui/Button';
import { Input } from './ui/Input';

type Filters = { type: Filter; value: string };

export default function SearchAndFilter() {
	const { state, dispatch } = useTodo();

	const filters: Filters[] = [
		{ type: 'all', value: 'All Tasks' },
		{ type: 'active', value: 'Active' },
		{ type: 'completed', value: 'Completed' },
	];

	return (
		<div className='flex flex-col sm:flex-row gap-4 items-center'>
			<div className='relative flex-1 max-w-md'>
				<Search className='absolute top-2 left-2 text-slate-400' size={20} />
				<Input
					value={state.searchQuery}
					className='pl-10'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						dispatch({
							type: 'SET_SEARCH_QUERY',
							payload: { query: e.target.value },
						});
					}}
					placeholder='Search...'
				/>
			</div>
			<div className='flex gap-2'>
				{filters.map(filter => (
					<Button
						size='md'
						variant={state.filter === filter.type ? 'default' : 'outline'}
						onClick={_ =>
							state.filter !== filter.type &&
							dispatch({ type: 'SET_FILTER', payload: { filter: filter.type } })
						}
					>
						{filter.value}
					</Button>
				))}
			</div>
		</div>
	);
}
