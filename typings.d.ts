import { ParsedUrlQuery } from "querystring";

export interface Post {
  _id: string,
  _createdAt: string,
  title: string,
  author: {
    name: string,
    image: string,
  },
  description: string,
  mainImage:{
    asset:{
      url:string,
    },
  };
  comments:Comment[],
  slug:{
    current:string;
  };
  // body => tablica obiektów
  body:[object]

}

// Potrzebne aby moc uzyc sluga przy getStaticProps
interface Params extends ParsedUrlQuery {
  slug: string;
}

export interface Comment {
  approved: boolean;
  comment: string;
  email:string;
  name:string;
  post:{
    _ref: string;
    _type:string;
  };
  _createdAt:string;
  _id:string;
  _ref:string;
  _type:string;
  _updatedAt:string;
}