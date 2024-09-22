import { createBrowserRouter, Navigate } from "react-router-dom";
import SharedLayout from "@/routes/SharedLayout";

export type RouteHandle = {
  hideHeader?: boolean;
  hideGnb?: boolean;
  title?: string;
};

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      element: <SharedLayout />,
      children: [
        {
          path: "/start",
          lazy: () => import("@/routes/Start"),
          handle: {
            hideHeader: true,
            hideGnb: true,
          } satisfies RouteHandle,
        },
        {
          path: "/register",
          lazy: () => import("@/routes/Register"),
          handle: {
            hideHeader: false,
            hideGnb: true,
            title: "회원가입",
          } satisfies RouteHandle,
        },
        {
          path: "/login",
          lazy: () => import("@/routes/Login"),
          handle: {
            hideHeader: false,
            hideGnb: true,
            title: "로그인",
          } satisfies RouteHandle,
        },
        {
          path: "/*",
          lazy: () => import("@/routes/NotFound"),
          handle: {
            hideGnb: true,
            hideHeader: true,
          } satisfies RouteHandle,
        },
        {
          path: "/",
          lazy: () => import("@/routes/PrivateRoute"),
          children: [
            {
              lazy: () => import("@/routes/OnboardedRoute"),
              children: [
                { index: true, element: <Navigate to="home" replace /> },
                {
                  path: "home",
                  lazy: () => import("@/routes/Home"),
                  handle: {
                    title: "홈",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "calendar",
                  lazy: () => import("@/routes/Calendar"),
                  handle: {
                    title: "캘린더",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "maps",
                  lazy: () => import("@/routes/Maps"),
                  handle: {
                    title: "지도",
                    hideHeader: true,
                    hideGnb: false,
                  } satisfies RouteHandle,
                },
                {
                  path: "my-page",
                  lazy: () => import("@/routes/MyPage"),
                  handle: {
                    title: "마이페이지",
                    hideHeader: false,
                  } satisfies RouteHandle,
                },
                {
                  path: "logout-complete",
                  lazy: () => import("@/routes/LogoutComplete"),
                  handle: {
                    title: "로그아웃 완료",
                    hideHeader: true,
                    hideGnb: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "/delete-account",
                  lazy: () => import("@/routes/DeleteAccount"),
                  handle: {
                    title: "회원 탈퇴",
                    hideHeader: true,
                    hideGnb: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "/delete-complete",
                  lazy: () => import("@/routes/DeleteComplete"),
                  handle: {
                    title: "회원탈퇴 완료",
                    hideHeader: true,
                    hideGnb: true,
                  } satisfies RouteHandle,
                },
              ],
            },
            {
              path: "onboarding",
              lazy: () => import("@/routes/Onboarding"),
              handle: {
                hideHeader: false,
                hideGnb: true,
                title: "회원가입",
              } satisfies RouteHandle,
              children: [
                { index: true, element: <Navigate to="basic" replace /> },
                {
                  path: "basic",
                  lazy: () => import("@/routes/Onboarding/OnboardingBasic"),
                },
                {
                  path: "dob",
                  lazy: () => import("@/routes/Onboarding/OnboardingDob"),
                },
                {
                  path: "height",
                  lazy: () => import("@/routes/Onboarding/OnboardingHeight"),
                },
                {
                  path: "weight",
                  lazy: () => import("@/routes/Onboarding/OnboardingWeight"),
                },
                {
                  path: "interests",
                  lazy: () => import("@/routes/Onboarding/OnboardingInterests"),
                },
                {
                  path: "done",
                  lazy: () => import("@/routes/Onboarding/OnboardingDone"),
                  handle: {
                    hideHeader: true,
                  },
                },
                {
                  path: "resume",
                  lazy: () => import("@/routes/Onboarding/OnboardingResume"),
                  handle: {
                    hideHeader: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
