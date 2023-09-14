import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const LIMIT = 10;

const fetchTodos = async (page) => {
	console.log(page);
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`
	);
	// console.log(data)
	return data;
};

const JsonPlaceholder = () => {
	// const { data } = useQuery({
	// 	queryKey: ['todos'],
	// 	queryFn: () => fetchTodos()
	// });
	const { data, fetchNextPage, isFetchingNextPage, isSuccess } =
		useInfiniteQuery({
			queryKey: ['todos'],
			queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam),
			getNextPageParam: (lastPage, allPages) => {
				// console.log(allPages);
				const nextPage =
					lastPage.length === LIMIT ? allPages.length + 1 : undefined;

				return nextPage;
			}
		});

	// data && console.log(data.pages);

	return (
		<div>
			<p className="text-2xl  font-medium mb-7">Todos: </p>
			{isSuccess &&
				data?.pages.map((page, i) => (
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
				Next
			</button>
		</div>
	);
};

export default JsonPlaceholder;
