import JsonPlaceholder from '@/components/JsonPlaceholder';
import JsonPosts from '@/components/JsonPosts';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main
			className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<p className="text-3xl font-medium">
				NextJS TanStack Query Infinite Scrolling With Button
			</p>

			<br />

			<JsonPosts />
			<br />
			<JsonPlaceholder />
		</main>
	);
}
