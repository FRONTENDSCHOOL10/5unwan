import { WorkoutRecordModal } from "@/components/WorkoutRecord/WorkoutRecordModal";
import { RouteHandle } from "@/router";
import { Link, Outlet, useMatches } from "react-router-dom";
import styles from "@/routes/SharedLayout/styles.module.css";
import SVGIcon from "@/components/SVGicon";
import classNames from "classnames";
import { useSetupPocketBaseUser } from "@/hooks/user";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";
// import Header from "@/components/Header"

export default function SharedLayout() {
  const { isDark } = useDarkMode(); // 다크모드

  useSetupPocketBaseUser();

  const matches = useMatches();
  console.log({ matches });
  // const hideHeader = matches.some(
  //   (match) => (match.handle as RouteHandle)?.hideHeader
  // );
  const hideGnb = matches.some(
    (match) => (match.handle as RouteHandle)?.hideGnb
  );
  // const lastMatchWithTitle = [...matches]
  //   .reverse()
  //   .find((match) => (match.handle as RouteHandle)?.title);
  // const title = (lastMatchWithTitle?.handle as RouteHandle)?.title || "";

  // const navigate = useNavigate();

  // const handleGoBack = () => {
  //   navigate(-1); // 이전 페이지로 돌아감
  // };
  
  return (
    <div className={classNames(styles.container, { [styles["is-dark"]]: isDark })}>
    {/* header */}
      {/* {!hideHeader && 
        <Header
          className={styles.header}
          leftIconId={"iconArrowsLeft"}
          leftIconVisible
          leftonClick={handleGoBack}
          // rightIconId={"iconArrowsRight"}
          rightIconVisible
        />} */}
      {/* this is the global navigation bar */}
      {!hideGnb && (
        <nav className={styles["gnb-nav"]}>
          <ul>
            <li>
              <Link to={"/home"} type="button">
                <figure className={styles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconHome"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/home")
                        ? isDark ? "#ffffff" : "#212121"
                        : isDark ? "#757575" : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
            <li>
              <Link to={"/calendar"} type="button">
                <figure className={styles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconCalendar"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/calendar")
                        ? isDark ? "#ffffff" : "#212121"
                        : isDark ? "#757575" : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
            <li>
              <WorkoutRecordModal />
            </li>
            <li>
              <Link to={"/maps"} type="button">
                <figure className={styles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconMap"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/maps")
                        ? isDark ? "#ffffff" : "#212121"
                        : isDark ? "#757575" : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
            <li>
              <Link to={"/my-page"} type="button">
                <figure className={styles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconMyPage"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/my-page")
                        ? isDark ? "#ffffff" : "#212121"
                        : isDark ? "#757575" : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main className={`${styles.outlet} no-scroll`}>
        <Outlet />
      </main>
    </div>
  );
}
