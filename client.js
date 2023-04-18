import { createClient } from "@sanity/client";
import { createImageUrlBuilder, createCurrentUserHook } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === "production", // set to `true` to fetch from edge cache
  apiVersion: "2023-04-09", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN, // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
// export const useCurrentUser = createCurrentUserHook(client);
