import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div>
      <h1>시작하기</h1>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
    </div>
  );
}
