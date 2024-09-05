import { useCurrentUser } from "@/hooks/user"; 

export default function MyPage() {
	const { user, isLoading, isError, logout } = useCurrentUser(); 
  
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
      <button onClick={logout}>로그아웃</button> {/* 로그아웃 버튼 클릭 시 mutate 호출 */}
	  <br />


    </div>
  );
}
