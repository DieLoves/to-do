import { CircleCheckBig } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

export default function Header() {
	const { state } = useTodo();

	const totalTasks = state.tasks.length;
	const completedTasks = state.tasks.filter(x => x.isCompleted).length;
	const completionRate =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

	return (
		<header className='bg-slate-800 border-b border-gray-500'>
			<div className='container mx-auto py-6 px-4'>
				<div className='flex justify-between'>
					<div className='flex gap-5 items-center'>
						<CircleCheckBig width={40} height={40} className='text-blue-400' />
						<div>
							<h1 className='text-2xl text-bol font-bold'>To Do App</h1>
							<h2 className='text-slate-400'>TOO DOOO</h2>
						</div>
					</div>
					<div className='text-right'>
						<h1 className='text-blue-500 text-3xl font-bold'>
							{completionRate}%
						</h1>
						<h2 className='text-sm text-slate-400'>
							{completedTasks} of {totalTasks} task done
						</h2>
					</div>
				</div>
			</div>
		</header>
	);
}
