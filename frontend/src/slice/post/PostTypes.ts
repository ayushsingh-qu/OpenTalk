// Shape returned by GET /api/v1/blog/blogs and GET /api/v1/blog/:id
export interface BlogAuthor {
  name: string;
}

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  author: BlogAuthor;
  _count: {
    likes: number;
  };
}

// Shape returned by GET /api/v1/blog/me (inside user.blogs)
export interface MyBlogItem {
  id: string;
  title: string;
  content: string;
}

// Payload for creating a post
export interface CreatePostPayload {
  title: string;
  content: string;
}

// Payload for updating a post
export interface UpdatePostPayload {
  id: string;
  title: string;
  content: string;
}

// Search result user
export interface SearchUser {
  id: string;
  name: string;
  email: string;
}

// Redux state for posts
export interface PostState {
  blogs: BlogItem[];
  currentBlog: BlogItem | null;
  loading: boolean;
  deleteLoading: boolean;
  error: string | null;
}
