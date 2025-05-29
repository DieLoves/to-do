import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'default' | 'outline' | 'ghost';
	size: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, size, ...props }, ref) => {
		const baseClasses =
			'inline-flex items-center justify-center rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

		const variants = {
			default: 'bg-blue-600 text-white hover:bg-blue-700',
			outline: 'border border-slate-600 bg-transparent hover:bg-slate-700',
			ghost: 'hover:bg-slate-700',
		};

		const sizes = {
			sm: 'h-8 px-3 text-sm',
			md: 'h-10 px-4',
			lg: 'h-12 px-6 text-lg',
		};

		return (
			<button
				className={cn(baseClasses, variants[variant], sizes[size])}
				ref={ref}
				{...props}
			></button>
		);
	}
);

export default Button;
