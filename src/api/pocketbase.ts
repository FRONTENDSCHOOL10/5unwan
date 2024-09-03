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
  height: number;
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
