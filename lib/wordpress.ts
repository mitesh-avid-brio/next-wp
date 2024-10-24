// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from 'query-string'
import axios from 'axios';

import {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

// WordPress Config


const baseUrl = process.env.WORDPRESS_URL || "https://arrangespy.s3-tastewp.com";

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;

  console.log("baseUrl", baseUrl);

  return `${baseUrl}${path}${params ? `?${params}` : ""}`; 
}



// Define a PaymentGateway interface based on the expected API response structure
interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  supported_currencies: string[];
  enabled: boolean;
}

// Function to get all payment gateway information
export async function getAllPaymentInfo(): Promise<PaymentGateway[]> {
  const url = getUrl("/wp-json/wc/v3/payment_gateways");

  console.log("URL",url)

  const response = await fetch(url);
  
  console.log(response,"respons")

  // Ensure the response is valid JSON
  if (!response.ok) {
    throw new Error(`Error fetching payment gateways: ${response.statusText}`);
  }

  const paymentGateways: PaymentGateway[] = await response.json();
  return paymentGateways;
}





// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Post[]> {  
  const url = getUrl("/wp-json/wp/v2/posts", { author: filterParams?.author, tags: filterParams?.tag, categories: filterParams?.category });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  console.log("response 1",posts)

  return posts;
}


// ACF

export async function getAllMovies(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<any[]> {
  // Construct the URL for the movie API, you can add filters for author, tags, or categories if needed.
  const url = getUrl("/wp-json/wp/v2/movies", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });

  // Fetch the movie data from the API.
  const response = await fetch(url);

  // Parse the response as JSON.
  const movies: any[] = await response.json();
  
  // Log the response to the console.
  console.log("Movies Data:", movies);

  // Return the movies data.
  return movies;
}



export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  const response = await fetch(url);
  console.log("response 2",response)
  const post: Post = await response.json();
  return post;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const response = await fetch(url);

  const post: Post[] = await response.json();
  console.log("post 2",post[0])


  return post[0];
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  const response = await fetch(url);
  const categories: Category[] = await response.json();
  return categories;
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  const response = await fetch(url);
  const category: Category = await response.json();
  return category;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await fetch(url);
  const category: Category[] = await response.json();
  return category[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories:  categoryId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags:  tagId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post:  postId });
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  const response = await fetch(url);
  const tag: Tag = await response.json();
  return tag;
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await fetch(url);
  const tag: Tag[] = await response.json();
  return tag[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  const response = await fetch(url);
  console.log("response",response)
  const pages: Page[] = await response.json();
  return pages;
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  const response = await fetch(url);
  console.log("response",response)

  const page: Page = await response.json();
  return page;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await fetch(url);

  const page: Page[] = await response.json();
  // console.log("response",page[0])

  return page[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  const response = await fetch(url);
  const authors: Author[] = await response.json();
  return authors;
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  const response = await fetch(url);
  const author: Author = await response.json();
  return author;
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await fetch(url);
  const author: Author[] = await response.json();
  return author[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  const response = await fetch(url);
  const featuredMedia: FeaturedMedia = await response.json();
  return featuredMedia;
}



