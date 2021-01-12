import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
    return (
        <>
            <Link href="/weather">
                <button className="bg-white p-1 mt-3 border-2 border-gray-400 rounded dark:bg-gray-600 dark:text-gray-200">Weather Detail</button>
            </Link>

            <Image
                src="/BlackIcon.png"
                alt="Picture of the author"
                width={200}
                height={200}
            />
        </>
    )
}