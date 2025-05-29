import SearchAndFilter from './SearchAndFilter';
import TodoBoard from './TodoBoard';

export default function Main() {
	return (
		<main className='container mx-auto px-4 py-8'>
			<div className='space-y-8'>
				<SearchAndFilter />
				<TodoBoard />
			</div>
		</main>
	);
}
