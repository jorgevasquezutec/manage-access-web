import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function exclude<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const clonedObj = { ...obj };
    for (let key of keys) {
        delete clonedObj[key];
    }
    return clonedObj;
}