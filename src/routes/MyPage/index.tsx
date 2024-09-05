import { useCurrentUserQuery } from "@/hooks/user"; 
import { useNavigate } from "react-router-dom";  
import { logout, deleteUser } from "@/api/pocketbase";  
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { useState } from "react"; 
import styles from "./myPageModal.module.css"; 
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";


export default function MyPage() {
	const { user, isLoading, isError } = useCurrentUserQuery(); 
	const navigate = useNavigate(); 
	const queryClient = useQueryClient(); 
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [password, setPassword] = useState(""); 

	const logoutMutation = useMutation({
		mutationFn: async () => {
			await logout();
		},
		onSuccess: () => {
			queryClient.clear(); 
			navigate("/login");  
		},
	});
  
	const deleteUserMutation = useMutation({
		mutationFn: async () => {
		  await deleteUser(password);  
		},
		onSuccess: () => {
		  queryClient.clear();
		  navigate("/start");
		},
		onError: (error) => {
		  console.error(error); 
		  alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
		},
	  });
	  
  
  const showConfirmDeleteModal = () => {
    setShowConfirmModal(true); // 
  };

  const handleConfirmDelete = () => {
    deleteUserMutation.mutate();
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };


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
      <button onClick={() => logoutMutation.mutate()}>로그아웃</button> 
	  <br />
	  <button onClick={() => setShowDeleteModal(true)}>회원 탈퇴</button>
      
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
		  <h1>
  			<span className={styles["nickname"]}>{user?.nickname}</span>
  			<span className={styles["message"]}>님 회원탈퇴를 위해<br></br>
  			비밀번호를 입력해주세요.</span>
		  </h1>
	
        	<Input
              status="text"
              isDark={false}
  			  label="비밀번호"  
              placeholder="8문자 이상, 특수 문자 포함해주세요."
			  type="password"
			  value={password} 
			  onChange={(e) => setPassword(e.target.value)} 
            />
	
		  <LargeButton onClick={showConfirmDeleteModal} >
  			확인
		  </LargeButton>
		  <LargeButton 
  			onClick={() => setShowDeleteModal(false)}
  			className={styles["cancel-button"]}>
 			 취소
		  </LargeButton>

          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className={styles.modal}>
          <div className={styles["confirmation-modal-content"]}>
            <h2>정말 탈퇴하시겠습니까?</h2>
            <div className={styles["confirmation-buttons"]}>
              <button
                className={`${styles["confirmation-button"]} ${styles["confirmation-button-confirm"]}`}
                onClick={handleConfirmDelete}
              >
                확인
              </button>
              <button
                className={`${styles["confirmation-button"]} ${styles["confirmation-button-cancel"]}`}
                onClick={handleCancelDelete}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
