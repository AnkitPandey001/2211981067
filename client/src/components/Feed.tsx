import { useEffect, useState } from "react";
import { Post } from "../types/types";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:5000/api/feed");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="bg-white shadow p-4 rounded-xl">
            <p>{post.content}</p>
            <p className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
