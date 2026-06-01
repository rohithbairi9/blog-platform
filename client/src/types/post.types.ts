export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;

  coverImage?: string;

  published: boolean;

  views: number;

  category?: string;

  tags: string[];

  author: Author;

  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  success: boolean;
  posts: Post[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SinglePostResponse {
  success: boolean;
  post: Post;
}

export interface CreatePostData {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}

export interface Comment {
  id: string;
  content: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  createdAt: string;
}

export interface CommentsResponse {
  success: boolean;
  comments: Comment[];
}

export interface LikesResponse {
  success: boolean;
  likesCount: number;
}