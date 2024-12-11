import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Pick<Post, "title" | "content">>({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>("http://localhost:8080/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const addPost = () => {
    axios
      .post<Post>("http://localhost:8080/posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "" });
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const deletePost = (id: number) => {
    axios
      .delete(`http://localhost:8080/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post.id !== id)))
      .catch((error) => console.error("Error deleting post:", error));
  };

  const startEditing = (post: Post) => {
    setEditingPost(post);
  };

  const savePost = () => {
    if (!editingPost) return;
    axios
      .put<Post>(`http://localhost:8080/posts/${editingPost.id}`, editingPost)
      .then((response) => {
        setPosts(posts.map((post) => (post.id === editingPost.id ? response.data : post)));
        setEditingPost(null);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
            <br />
            <button onClick={() => deletePost(post.id)} style={{ color: "red", marginBottom: "10px" }}>
              삭제
            </button>
            <button onClick={() => startEditing(post)} style={{ marginLeft: "10px", color: "blue" }}>
              수정
            </button>
          </li>
        ))}
      </ul>

      <h2>{editingPost ? "Edit post" : "Add a new post"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={editingPost ? editingPost.title : newPost.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          editingPost
            ? setEditingPost({ ...editingPost, title: e.target.value })
            : setNewPost({ ...newPost, title: e.target.value })
        }
      />
      <br />
      <textarea
        placeholder="Content"
        value={editingPost ? editingPost.content : newPost.content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          editingPost
            ? setEditingPost({ ...editingPost, content: e.target.value })
            : setNewPost({ ...newPost, content: e.target.value })
        }
      />
      <br />
      <button onClick={editingPost ? savePost : addPost}>
        {editingPost ? "Save Changes" : "Add Post"}
      </button>
    </div>
  );
};

export default App;