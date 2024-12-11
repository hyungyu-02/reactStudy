import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Pick<Post, "title" | "content">>({
    title: "",
    content: "",
  });
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await fetch("http://localhost:8080/posts");
        const data: Post[] = await response.json();
        setPosts(data);
      }catch(error){
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async () => {
    try{
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if(!response.ok) throw new Error("Failed to add post");

      const createdPost: Post = await response.json();
      setPosts([...posts, createdPost]);
      setNewPost({title: "", content: ""});
    }catch(error){
      console.error("Error adding posts:", error);
    }
  };
  const deletePost = async (deletePostId: number) => {
    if(!deletePostId) return;
    try{
      const response = await fetch(`http://localhost:8080/posts/${deletePostId}`, {
        method: "DELETE",
      });

      if(!response.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((post) => post.id !== deletePostId));
    }catch(error){
      console.error("Error deleting posts:", error);
    }
  };

  const startEditing = (post: Post) => {
    setEditingPost(post);
  };

  const savePost = async () => {
    if(!editingPost) return;

    try{
      const response = await fetch(`http://localhost:8080/posts/${editingPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingPost),
      });

      if(!response.ok){
        throw new Error("Failed to update post");
      }

      const updatedPost: Post = await response.json();
      setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      setEditingPost(null);

    }catch (error){
      console.error("Error updating post:", error);
    }
  }

  return (
    <div style={{marginLeft:"20px"}}>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
            <br />
            <button
              style={{color:"red"}}
              onClick={() => deletePost(post.id)}
            >
              delete
            </button>
            <button
              style={{color:"blue", marginLeft:"10px"}}
              onClick={() => startEditing(post)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <h2>{editingPost ? "Edit Post" : "Add a new Post"}</h2>
      <input
        type='text'
        placeholder='Title'
        value={editingPost ? editingPost.title : newPost.title}
        onChange={(e) => 
          editingPost
            ? setEditingPost({ ...editingPost, title: e.target.value})
            : setNewPost({ ...newPost, title: e.target.value})
        }
      />
      <br />
      <textarea
        placeholder='Content'
        value={editingPost ? editingPost.content : newPost.content}
        onChange={(e) => 
          editingPost
            ? setEditingPost({...editingPost, content: e.target.value})
            : setNewPost({ ...newPost, content: e.target.value})
        }
      />
      <br />
      {editingPost
        ? <button onClick={savePost}>Save Changes</button>
        : <button onClick={addPost}>Add post</button>
      }
    </div>
  )
}

export default App;
