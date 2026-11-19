// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace Search {
		interface Data {
			query: string;
			number_of_results: number;
			results: Result[];
		}
		interface Result {
			url: string;
			title: string;
			title_highlights: string[];
			content: string;
			content_highlights: string[];
			engine: string;
			score: number;
		}
	}
}

export {};
