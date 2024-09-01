import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>이메일과 비밀번호를 입력해주세요.</h1>
      <RegisterForm
        onSuccess={() => {
          navigate("/onboarding");
        }}
      />
    </div>
  );
}
