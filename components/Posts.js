import { useInfiniteQuery } from '@tanstack/react-query';

const posts = [
	{ id: 1, title: 'post 1' },
	{ id: 2, title: 'post 2' },
	{ id: 3, title: 'post 3' },
	{ id: 4, title: 'post 4' },
	{ id: 5, title: 'post 5' },
	{ id: 6, title: 'post 6' }
];

// sample fetching data from database or api
const fetchPosts = async (page) => {
	console.log(page);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return posts.slice((page - 1) * 2, page * 2);
};

const Posts = () => {
	const { data, error, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: ['posts'],

		queryFn: async ({ pageParam = 1 }) => {
			// console.log(pageParam);
			const response = await fetchPosts(pageParam);
			// console.log(response);
			return response;
		},
		getNextPageParam: (lastPage, pages) => {
			// console.log(lastPage);
			// console.log(pages.length);
			return pages.length + 1;
		},
		// * initial data is to put the response of starting data from queryFn to data
		initialData: {
			pages: [posts.slice(0, 2)],
			pageParams: [1]
		}
	});

	// data && console.log(data.pages);

	return (
		<div>
			<p className="text-xl mb-7">Posts: </p>
			{data.pages.map((page, i) => (
				<div key={i}>
					{page.map(({ title, id }) => (
						<p className="text-lg" key={id}>
							{title}
						</p>
					))}
				</div>
			))}
			<button
				onClick={fetchNextPage}
				disabled={isFetchingNextPage}
				className="bg-green-600 text-white p-3 mt-7 rounded-md"
			>
				{isFetchingNextPage
					? 'Loading More...'
					: (data?.pages.length ?? 0) < 3
					? 'Load More...'
					: 'Nothing more to load'}
			</button>
		</div>
	);
};

export default Posts;
