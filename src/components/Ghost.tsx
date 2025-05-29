export default function Ghost({ placeholder }: { placeholder: string }) {
	return (
		<div className='bg-black/50 backdrop-blur-lg border-dashed border-6 border-gray-800 flex items-center justify-center w-full text-slate-500 p-20 transition-all duration-200 hover:border-gray-600 hover:bg-black/10 hover:text-slate-100 cursor-pointer'>
			<h1 className='text-center text-xl'>{placeholder}</h1>
		</div>
	);
}
