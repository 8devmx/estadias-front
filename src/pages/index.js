import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to Next.js!</title>
        <meta name="description" content="A Next.js application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Next.js!</h1>
        <p>
          Get started by editing <code>pages/index.js</code>
        </p>
        <div>
          <Link href="/about">
            <a>Go to About Page</a>
          </Link>
        </div>
      </main>

      <footer>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}