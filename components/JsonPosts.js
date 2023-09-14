import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const LIMIT = 5;

const postsData = `https://jsonplaceholder.typicode.com/posts`;

const fetchPosts = async (page) => {
	const { data } = await axios.get(postsData);

	const posts = data.slice((page - 1) * LIMIT, page * LIMIT);

	return posts;
};

const JsonPosts = () => {
	const { data, fetchNextPage, isFetchingNextPage, isSuccess } =
		useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
			getNextPageParam: (lastPage, allPages) => {
				// console.log(allPages);
				const nextPage =
					lastPage.length === LIMIT ? allPages.length + 1 : undefined;

				return nextPage;
			}
		});

	data && console.log(data);

	return (
		<div>
			<p className="text-2xl font-medium mb-7">Posts: </p>
			{isSuccess &&
				data?.pages.map((page, i) => (
					<div key={i}>
						{page.map(({ title, id, body }) => (
							<div key={id} className="mb-5">
								<p className="text-lg">{title}</p>
								<p className="text-md">{body}</p>
							</div>
						))}
					</div>
				))}
			<button
				onClick={fetchNextPage}
				disabled={isFetchingNextPage}
				className="bg-green-600 text-white p-3 mt-7 rounded-md"
			>
				Next
			</button>
		</div>
	);
};

export default JsonPosts;
