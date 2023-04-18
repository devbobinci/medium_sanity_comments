import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/client";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full mt-10 mx-auto justify-center flex">
          <Image
            src={urlFor(value).url()}
            className="object-contain rounded-md"
            alt="Blog Post Image"
            width={600}
            height={600}
          />
        </div>
      );
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ul className="mt-lg list-decimal">{children}</ul>
      ),
    },

    block: {
      h1: (props: any) => (
        <h1 className="text-5xl py-10 font-bold">{...props}</h1>
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
    },

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-5 py-5 my-5">{children}</blockquote>
    ),
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;

        return (
          <Link
            href={value.href}
            rel={rel}
            className="underline decoration-[#F7AB0A] hover:decoration:black"
          >
            {children}
          </Link>
        );
      },
    },
  },
};
