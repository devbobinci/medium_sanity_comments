import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";

import { client, urlFor } from "../client";

import { Post } from "../typings";
import author from "@/schemas/author";

interface Props {
  // posts: Post[] to samo co ponizej
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:p-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <Image
          className="hidden md:inline h-32 lg:h-full object-contain"
          src="/images/Medium-logo.png"
          alt="Medium Logo"
          width={400}
          height={400}
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:ga-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg coursor-pointer group overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()!}
                alt="Post Image"
                width={300}
                height={300}
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by{" "}
                    <span className="italic text-gray-500">
                      {post.author.name}
                    </span>
                  </p>
                </div>
                <Image
                  src={urlFor(post.author.image).url()!}
                  width={30}
                  height={30}
                  alt={author.name}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author->{
      image,
      name
    },
    description,
    mainImage,
  }`;

  const posts = await client.fetch(query);

  console.log(posts);

  return {
    props: { posts },
  };
}
