import { WorkoutRecordModal } from "@/components/WorkoutRecordModal";
import { RouteHandle } from "@/router";
import styles from "@/routes/SharedLayout/styles.module.css";
import { Link, Outlet, useMatches } from "react-router-dom";

import SVGIcon from "@/components/SVGicon";
import iconstyles from "@/components/SVGicon/styles.module.css";
import { useSetupPocketBaseUser } from "@/hooks/user";

export default function SharedLayout() {
  useSetupPocketBaseUser();

  const matches = useMatches();
  console.log({ matches });
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );
  const hideGnb = matches.some(
    (match) => (match.handle as RouteHandle)?.hideGnb
  );
  const lastMatchWithTitle = [...matches]
    .reverse()
    .find((match) => (match.handle as RouteHandle)?.title);
  const title = (lastMatchWithTitle?.handle as RouteHandle)?.title || "";

  return (
    <div className={styles.container}>
      {/* header */}
      {!hideHeader && <header className={styles.header}>{title}</header>}
      {/* global navigation bar */}
      {!hideGnb && (
        <nav className={styles["gnb-nav"]}>
          <ul>
            <li>
              <Link to={"/home"} type="button">
                <figure className={iconstyles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconHome"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/home")
                        ? "#212121"
                        : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
            <li>
              <Link to={"/calendar"} type="button">
                <figure className={iconstyles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconCalendar"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/calendar")
                        ? "#212121"
                        : "#9E9E9E"
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
                <figure className={iconstyles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconMap"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/maps")
                        ? "#212121"
                        : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
            <li>
              <Link to={"/my-page"} type="button">
                <figure className={iconstyles["gnb-icon-frame"]}>
                  <SVGIcon
                    iconId="iconMyPage"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/my-page")
                        ? "#212121"
                        : "#9E9E9E"
                    }
                  />
                </figure>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </div>
  );
}
