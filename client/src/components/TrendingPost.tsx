import { useEffect, useState } from "react";
import { Post } from "../types/types";

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/trending-posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="bg-white shadow p-4 rounded-xl">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">{post.commentCount} comments</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
