import type React from 'react';
import { cn } from '../../utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'secondary';
}

export function Badge({
	className,
	variant = 'default',
	...props
}: BadgeProps) {
	const variants = {
		default: 'bg-blue-600 text-white',
		secondary: 'bg-slate-600 text-white',
	};

	return (
		<div
			className={cn(
				'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
				variants[variant],
				className
			)}
			{...props}
		/>
	);
}
