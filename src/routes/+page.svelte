<main class="flex h-dvh w-dvw place-content-center place-items-center">
	<form class="flex w-full max-w-4xl flex-col gap-8" method="get" action="/search">
		<label for="Search" class="text-center font-mono text-8xl">Svearch</label>
		<span class="join join-horizontal">
			<input
				id="Search"
				class="input join-item flex-1 input-xl"
				name="query"
				type="text"
				placeholder="Search here..."
			/>
			<button type="submit" class="btn join-item btn-primary btn-xl">Search</button>
		</span>
	</form>
</main>
