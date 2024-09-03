import MiniButton from "@/components/primaryButton/minibutton";
import MediumButton from "@/components/primaryButton/mdiumbutton";
import LargeButton from "@/components/primaryButton/largebutton";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";

export default function MyPage() {
  const { user } = useOutletContext<UserContext>();


  // handleClick 함수 정의
  const handleClick = () => {
    alert('Disabled Button Clicked!');
  };


  
  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>마이페이지</span>
      <br />

      <MiniButton onClick={() => alert('Mini Button Clicked!')}>
        버튼
      </MiniButton>


	<MediumButton onClick={() => alert('Medium Button Clicked!')}>
	버튼
	</MediumButton>

	<MediumButton onClick={handleClick} disabled={true}>
  		버튼
	</MediumButton>


	<LargeButton onClick={() => alert('Large Button Clicked!')}>
		버튼
	</LargeButton>
	
    </div>

  );
}
