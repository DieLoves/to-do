import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateRandomId() {
	return `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

	if (diffInHours < 1) {
		return 'Just now';
	} else if (diffInHours < 24) {
		return `${Math.floor(diffInHours)}h ago`;
	} else if (diffInHours < 48) {
		return 'Yesterday';
	} else {
		return date.toLocaleDateString();
	}
}
