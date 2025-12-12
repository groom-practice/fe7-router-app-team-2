import { useEffect, useState } from "react";
import style from "./index.module.css";
import { fetchDetailData } from "../../apis/posts-api";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetail() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const navi = useNavigate();

  useEffect(() => {
    let isCurrent = true;
    async function fetchData() {
      try {
        if (!id) return;

        const response = await fetchDetailData(id);
        console.log(response);

        if (isCurrent) setPost(response);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    fetchData();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  function handleBookmark() {
    const bookmark = JSON.parse(localStorage.getItem("bookmark") || "[]");

    if (!bookmark.includes(id)) {
      const updated = [...bookmark, id];
      localStorage.setItem("bookmark", JSON.stringify(updated));
    } else {
      alert("이미 즐겨찾기 중 입니다!");
    }
  }

  return (
    <div className={style.container}>
      <h1 className={style.id}>Post Id : {id}</h1>
      <h3 className={style.title}>{post?.title}</h3>
      <p className={style.body}>{post?.body}</p>

      <div className={style.button_conatiner}>
        <button
          className={style.button}
          onClick={() => navi(`/posts/${id}/edit`)}
        >
          Edit
        </button>
        <button onClick={handleBookmark}>즐겨찾기</button>
      </div>
    </div>
  );
}
