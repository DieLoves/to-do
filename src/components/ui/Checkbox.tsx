'use client';

import { Check } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface CheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
	'aria-label'?: string;
}

export function Checkbox({
	checked,
	onChange,
	className,
	...props
}: CheckboxProps) {
	return (
		<button
			type='button'
			role='checkbox'
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			className={cn(
				'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
				checked
					? 'bg-blue-600 border-blue-600 text-white'
					: 'border-slate-400 hover:border-slate-300',
				className
			)}
			{...props}
		>
			{checked && <Check className='h-3 w-3' />}
		</button>
	);
}
