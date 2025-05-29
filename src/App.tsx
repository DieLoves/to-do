import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { TodoProvider } from './context/TodoContext';

function App() {
	return (
		<TodoProvider>
			<div className='bg-gray-900 text-gray-200 h-screen w-screen'>
				<Header />
				<Main />
				<Toaster
					position='bottom-right'
					toastOptions={{
						style: {
							background: '#1e293b',
							color: '#f1f5f9',
						},
					}}
				/>
			</div>
		</TodoProvider>
	);
}

export default App;
