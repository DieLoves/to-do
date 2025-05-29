export function getFromStorage<T>(key: string): T | null {
	try {
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : null;
	} catch (error) {
		console.error(
			`Error retrieving item from localStorage with key "${key}":`,
			error
		);
		return null;
	}
}

export function setToStorage<T>(key: string, value: T): T | null {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return value;
	} catch (error) {
		console.error(
			`Error setting item in localStorage with key "${key}":`,
			error
		);
		return null;
	}
}
