import { useState } from "react";
import { createPortal } from "react-dom";
import PortalModalContainer from "../../components/PortalModalContainer";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navi = useNavigate();

  const Login = () => {
    if (id === "test123" && pw === "test123password") {
      alert("로그인 성공했습니다.");
      setLogin(false);
      clearLogin();
      navi("/posts");
    } else {
      alert("로그인 실패했습니다.");
      clearLogin();
    }
  };

  const clearLogin = () => {
    setId("");
    setPw("");
  };

  return (
    <div className="home">
      <h3>Welcome to Main Page!</h3>
      <button onClick={() => setLogin(true)}>로그인</button>

      {login &&
        createPortal(
          <PortalModalContainer>
            <div className="loginModalInner">
              <input
                placeholder="test123"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="password"
                placeholder="test123password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Login();
                  }
                }}
              />

              <div className="btns">
                <button onClick={Login}>로그인</button>
                <button onClick={() => setLogin(false)}>취소</button>
              </div>
            </div>
          </PortalModalContainer>,
          document.body
        )}
    </div>
  );
}
