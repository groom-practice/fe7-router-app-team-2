import { useEffect, useRef, useState } from "react"
import {
  deletePost,
  getAllPosts,
} from "../../../../react-router-dom-app/src/apis/posts"
import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
import "./index.css"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [openModal, setOpenModal] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [visibleCount, setVisibleCount] = useState(10)
  const sentinelRef = useRef(null)

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res)
    })
  }, [])

  useEffect(() => {
    if (!sentinelRef.current || visibleCount >= posts.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 10)
        } else {
          console.log(entries)
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    )

    observer.observe(sentinelRef.current)

    return () => observer.disconnect()
  }, [visibleCount, posts.length])

  const visiblePosts = posts.slice(0, visibleCount)

  const handleDelete = async () => {
    if (openModal === null) return

    setIsDeleting(true)

    try {
      await deletePost(openModal)
      setPosts((prev) => prev.filter((p) => p.id !== openModal))
    } catch (err) {
      console.log("Failed to delete post:", err)
    } finally {
      setIsDeleting(false)
      setOpenModal(null)
    }
  }

  return (
    <div>
      <h2>Post Lists</h2>
      <ul>
        {visiblePosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id}. {post.title}
            </Link>
            <button onClick={() => setOpenModal(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div ref={sentinelRef}></div>

      {openModal !== null &&
        createPortal(
          <div className="modal-background">
            <div className="modal-content">
              <strong>정말로 id={openModal} 포스트를 삭제하시겠습니까?</strong>
              <button onClick={handleDelete} disabled={isDeleting}>
                YES
              </button>
              <button onClick={() => setOpenModal(null)} disabled={isDeleting}>
                NO
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
