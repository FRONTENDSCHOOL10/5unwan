// https://blog.logrocket.com/using-pocketbase-build-full-stack-app/
import PocketBase from "pocketbase";
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export type User = {
  id: string;
  collectionId: string;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  dob: string;
  gender: "" | "F" | "M";
  /** height은 무조건 0보다 커야 한다. default value가 0이라는 것은, 유저가 아직 입력을 하지 않았다는 것을 암시하며, special value로 취급된다. https://github.com/pocketbase/pocketbase/issues/122#issuecomment-1427510028 */
  height: number;
  /** weight은 무조건 0보다 커야 한다. default value가 0이라는 것은, 유저가 아직 입력을 하지 않았다는 것을 암시하며, special value로 취급된다. https://github.com/pocketbase/pocketbase/issues/122#issuecomment-1427510028 */
  weight: number;
  interests: string[];
};

export type NewUser = {
  username?: string;
  nickname?: string;
  email: string;
  avatar?: string;
  dob?: string;
  gender?: "" | "F" | "M";
  height?: number;
  weight?: number;
  interests?: string[];
  password: string;
  passwordConfirm: string;
};

export type UpdateUser = {
  username?: string;
  nickname?: string;
  email?: string;
  // User와 기본적으로는 똑같음, avatar는 업데이트 시 File로 줘야할듯,,,?
  avatar?: File;
  dob?: string;
  gender?: "" | "F" | "M";
  height?: number;
  weight?: number;
  interests?: string[];
};

export async function currentUser() {
  if (pb.authStore.isValid) {
    try {
      await pb.collection("users").authRefresh();

      return pb.authStore.model as User | null;
    } catch (error) {
      if ((error as any)?.response?.code === 401) {
        logout();
      } else {
        throw error;
      }
    }
  }
  return null;
}

export async function createUser(newUser: NewUser) {
  const createdUser = (await pb.collection("users").create(newUser)) as User;

  await pb
    .collection("users")
    .authWithPassword(newUser.email, newUser.password);

  // promise긴 한데 이메일 verfication을 하는 걸 기다릴 필요 없어서 await를 생략함.
  // pb.collection("users").requestVerification(newUser.email);

  return createdUser;
}

export async function updateCurrentUser({
  userId,
  userValues,
}: {
  userId: string;
  userValues: UpdateUser;
}) {
  const updatedUser = (await pb
    .collection("users")
    .update(userId, userValues)) as User;

  return updatedUser;
}

export type LoginInfo = {
  email: string;
  password: string;
};

export async function loginWithPassword({ email, password }: LoginInfo) {
  await pb.collection("users").authWithPassword(email, password);
}

export async function kakaoSignUpOrLogin() {
  await pb.collection("users").authWithOAuth2({ provider: "kakao" });
}

export function logout() {
  pb.authStore.clear();
}

export function getPb() {
  return pb;
}

export type PbItem = {
  collectionId: string;
  id: string;
};

export function getPbImageUrl(item: PbItem, fileName: string) {
  if (!fileName) {
    return null;
  }
  return `${import.meta.env.VITE_POCKETBASE_URL}api/files/${
    item.collectionId
  }/${item.id}/${fileName}`;
}

pb.autoCancellation(false);
export async function getExercises(): Promise<any> {
  try {
    const records = await pb.collection('exercises').getFullList();
    return records;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; 
  }
}

// 회원 탈퇴 기능 
export async function deleteUser(password: string) {
	try {
	  const user = pb.authStore.model as User | null;
	  if (!user) throw new Error("로그인된 사용자가 없습니다.");
  
	  if (!password) throw new Error("비밀번호가 입력되지 않았습니다.");
  
	  await pb.collection("users").authWithPassword(user.email, password);
	  await pb.collection("users").delete(user.id);
	} catch (error: any) {
	  console.error("회원 탈퇴 중 오류 발생:", error);
	  throw new Error("회원 탈퇴 중 오류가 발생했습니다.");
	}
  }

  export async function updateUserProfile(userId: string, userValues: UpdateUser) {
	const formData = new FormData();
	
	Object.entries(userValues).forEach(([key, value]) => {
	  if (value !== undefined && value !== null) {
		if (Array.isArray(value)) {
		  formData.append(key, value.join(',')); 
		} else {
		  formData.append(key, typeof value === "number" ? value.toString() : value);
		}
	  }
	});
  
	const updatedUser = await pb.collection("users").update(userId, formData);
	return updatedUser;
  }
  
  

