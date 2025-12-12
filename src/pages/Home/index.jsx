import { useState } from "react"
import { createPortal } from "react-dom"
import PortalModalContainer from "../../components/PortalModalContainer"
import "./index.css"

export default function Home() {
  const [login, setLogin] = useState(false)

  return (
    <div className="home">
      <h3>Welcome to Main Page!</h3>
      <button onClick={() => setLogin(true)}>로그인</button>
      {login &&
        createPortal(
          <PortalModalContainer>
            <div className="loginModalInner">
              <input placeholder="test123" />
              <input type="password" placeholder="test123password" />

              <div className="btns">
                <button>로그인</button>
                <button onClick={() => setLogin(false)}>취소</button>
              </div>
            </div>
          </PortalModalContainer>,
          document.body
        )}
    </div>
  )
}
