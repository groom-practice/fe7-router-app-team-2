import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getPostById, updatePost } from "../../apis/posts-api";
import "./index.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 데이터 가져오기
  useEffect(() => {
    getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setBody(post.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // 저장 중 모달 표시

    try {
      await updatePost(id, { title, body });
      // 저장 완료 후 잠깐 대기 (모달 보여주기 위해)
      setTimeout(() => {
        navigate(`/posts/${id}`); // 상세 페이지로 이동
      }, 500);
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("수정 실패!");
    } finally {
      setIsSaving(false); // finally로 이동
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="postFormContainer">
      <h2>Edit Post ID : {id}</h2>
      <p className="lastEditPostIdText">마지막으로 수정한 post id : {id}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit" disabled={isSaving}>
          submit
        </button>
      </form>

      {isSaving &&
        createPortal(
          <div className="modal-background">
            <div className="modal-content">
              <strong>저장 중...</strong>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
