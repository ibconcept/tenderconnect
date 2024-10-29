// userStore.js
import { writable } from 'svelte/store';

export const userStore = writable(null); // Store user data
export const userTenders = writable([]); // Store user tenders or quotes
