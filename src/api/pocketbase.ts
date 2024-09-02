import PocketBase from "pocketbase";
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export type User = {
  id: string;
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
  userValues: Partial<User>;
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
