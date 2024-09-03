import MiniButton from "@/components/primaryButton/minibutton";
import MediumButton from "@/components/primaryButton/mediumbutton";
import LargeButton from "@/components/primaryButton/largebutton";
import { useCurrentUserQuery } from "@/hooks/user"; 
import MiniButtonS from "@/components/secondaryButton/minibutton";
import MediumButtonS from "@/components/secondaryButton/mediumbutton";
import LargeButtonS from "@/components/secondaryButton/largebutton";
import MiniButtonT from "@/components/tertiaryButton/minibutton";
import MediumButtonT from "@/components/tertiaryButton/mediumbutton";
import LargeButtonT from "@/components/tertiaryButton/largebutton";

export default function MyPage() {
  const { user, isLoading, isError } = useCurrentUserQuery(); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      <p>현재 사용자: {user?.nickname || "알 수 없음"}</p>
      <br />
      <span>마이페이지</span>
      <br />
      <button onClick={handleLogout}>로그아웃</button>

      <MiniButton onClick={() => alert('Mini Button Clicked!')}>
        버튼
      </MiniButton>

      <MediumButton onClick={() => {}}>
        버튼
      </MediumButton>

      <MediumButton disabled={true}>
        버튼
      </MediumButton>

      <LargeButton onClick={() => {}}>
        버튼
      </LargeButton>

      <MiniButtonS onClick={() => {}}>
        버튼
      </MiniButtonS>

      <MediumButtonS onClick={() => {}}>
        버튼
      </MediumButtonS>

      <LargeButtonS onClick={() => {}}>
        버튼
      </LargeButtonS>

      <LargeButtonS disabled={true}>
        버튼
      </LargeButtonS>

      <MiniButtonT onClick={() => {}}>
        버튼
      </MiniButtonT>

      <MediumButtonT onClick={() => {}}>
        버튼
      </MediumButtonT>

      <LargeButtonT onClick={() => {}}>
        버튼
      </LargeButtonT>

      <LargeButtonT disabled={true}>
        버튼
      </LargeButtonT>
    </div>
  );

  function handleLogout() {
    // 로그아웃 기능을 구현하려면 추가적인 훅 또는 메소드를 사용해야 합니다.
    console.log("로그아웃 기능이 구현되어야 합니다.");
  }
}
