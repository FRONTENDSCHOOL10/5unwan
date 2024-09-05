import { useCurrentUserQuery } from "@/hooks/user"; 
import { useNavigate } from "react-router-dom";  
import { logout } from "@/api/pocketbase";  
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import LargeButtonT from "@/components/Buttons/TertiaryButton/largeButton";


export default function MyPage() {
	const { user, isLoading, isError } = useCurrentUserQuery(); 
	const navigate = useNavigate(); 
	const queryClient = useQueryClient(); 
  

	const logoutMutation = useMutation({
		mutationFn: async () => {
			await logout();
		},
		onSuccess: () => {
			queryClient.clear(); 
			navigate("/login");  
		},
	});
  
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
      <button onClick={() => logoutMutation.mutate()}>로그아웃</button> {/* 로그아웃 버튼 클릭 시 mutate 호출 */}
	  <br />


<LargeButtonT onClick={() => {}}>
  버튼 (클릭)
</LargeButtonT>

<LargeButtonT disabled={true}>
  버튼 (비활성화)
</LargeButtonT>

<LargeButtonT to="/home">
  홈으로 이동
</LargeButtonT>


    </div>
  );
}
