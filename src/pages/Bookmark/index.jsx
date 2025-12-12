import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../apis/posts-api";

export default function Bookmark() {
  const [posts, setPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState(
    JSON.parse(localStorage.getItem("bookmark") || "[]")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPosts();
        const filteredPosts = response.filter((item) =>
          bookmarkIds.includes(item.id.toString())
        );
        setPosts(filteredPosts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [bookmarkIds]);

  function handleDeleteBookmark(id) {
    if (!id) return;
    const deleted_bookmarks = bookmarkIds.filter((item) => item !== id);
    localStorage.setItem("bookmark", JSON.stringify(deleted_bookmarks));
    setBookmarkIds(deleted_bookmarks);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }

  return (
    <div>
      <h1 style={{ paddingLeft: 40 }}>즐겨찾기</h1>

      {posts.length === 0 && <p>즐겨찾기한 게시물이 없습니다.</p>}

      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-container"
            onClick={() => navigate(`/posts/${post.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div>
              {post.id}. {post.title}
            </div>

            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#eeeeee",
                color: "red",
                fontWeight: 500,
                borderRadius: 8,
                border: "none",

                cursor: "pointer",
                marginLeft: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBookmark(post.id.toString());
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
