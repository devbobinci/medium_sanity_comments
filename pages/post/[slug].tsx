import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

import { Post, Params } from "@/typings";
import { GetStaticProps } from "next";

import { client, urlFor } from "../../client";
import PortableText from "react-portable-text";

import { useForm, SubmitHandler } from "react-hook-form";

import Header from "@/components/Header";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  console.log(post);

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(true);
      });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <Header />

        <Image
          src={urlFor(post.mainImage).url()!}
          height={800}
          width={800}
          className="w-full h-40 object-cover"
          alt={post.title}
        />

        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-500 mb-2">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <Image
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
              className="h-10 w-10 rounded-full"
              width={30}
              height={30}
            />
            <p className="text-sm font-extralight">
              Blog post by{" "}
              <span className="text-green-600">{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: ({ children }: any) => (
                  <h1 className="text-5xl py-10 font-bold"> {children}</h1>
                ),
                h2: ({ children }: any) => (
                  <h2 className="text-4xl py-10 font-bold">{children}</h2>
                ),
                h3: ({ children }: any) => (
                  <h3 className="text-3xl py-10 font-bold">{children}</h3>
                ),
                h4: ({ children }: any) => (
                  <h4 className="text-2xl py-10 font-bold">{children}</h4>
                ),
                h5: ({ children }: any) => (
                  <h5 className="text-xl py-8 font-bold">{children}</h5>
                ),
                h6: ({ children }: any) => (
                  <h5 className="text-lg py-5 font-bold">{children}</h5>
                ),
                blockquote: ({ children }: any) => (
                  <blockquote className="border-l-4 border-yellow-500 pl-5 py-5 my-5">
                    {children}
                  </blockquote>
                ),
              }}
            />
          </div>
        </article>

        <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear on the site</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-10 my-10 max-w-2xl mx-auto"
          >
            <h3 className="text-sm text-yellow-500">Enjoy this article?</h3>
            <h4 className="text-3xl font-bold"> Leave a comment below!</h4>
            <hr className="py-3 mt-2" />

            <input
              type="hidden"
              // name="_id"
              value={post._id}
              {...register("_id")}
            />

            <label className="block mb-5">
              <span className="text-gray-700">Name</span>
              <input
                {...register("name", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                placeholder="John Appleseed"
                type="text"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Email</span>
              <input
                {...register("email", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                placeholder="john@appleseed.com"
                type="email"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Comments</span>
              <textarea
                {...register("comment", { required: true })}
                className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                placeholder="This is amazing!!"
                rows={8}
              />
            </label>

            {/* errors of form validation */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">The Name Field is required</span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  The Comment Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  The Email Field is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Submit
            </button>
          </form>
        )}

        {/* Comments */}

        <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />

          {post.comments.map((comment) => (
            <div key={comment._id} >
              <p>
                <span className="text-yellow-500">{comment.name}</span>:
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{
    _id,
    slug{
      current
    }
  }`;

  const posts = await client.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Params;

  const query = `*[_type == "post" && slug.current == '${slug}'][0]{
    _id,
    _createdAt,
    title,
    author->{
      name,
      image,
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`;

  /*
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true],
  ],
  */

  const post = await client.fetch(query);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60,
  };
};
