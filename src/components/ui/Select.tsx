'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
	return (
		<div className='relative'>
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				className={cn(
					'flex h-10 w-full cursor-pointer appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500',
					className
				)}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none' />
		</div>
	);
}
