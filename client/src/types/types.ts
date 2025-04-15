export interface User {
    id: string;
    name: string;
    postCount: number;
  }
  
  export interface Post {
    id: string;
    userId: string;
    content: string;
    commentCount: number;
    timestamp: string;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    content: string;
  }
  