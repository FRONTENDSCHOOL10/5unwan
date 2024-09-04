import { WorkoutRecordModal } from "@/components/WorkoutRecordModal";
import { RouteHandle } from "@/router";
import styles from "@/routes/SharedLayout/styles.module.css";
import { Link, Outlet, useMatches } from "react-router-dom";

export default function SharedLayout() {
  const matches = useMatches();
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );
  const hideGnb = matches.some(
    (match) => (match.handle as RouteHandle)?.hideGnb
  );
  const lastMatchWithTitle = matches
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
          <div>
            <Link to={"/"} type="button">
              <span>홈</span>
            </Link>
            <Link to={"/calendar"} type="button">
              <span>캘린더</span>
            </Link>
            <WorkoutRecordModal />
            <Link to={"/maps"} type="button">
              <span>지도</span>
            </Link>
            <Link to={"/my-page"} type="button">
              <span>마이페이지</span>
            </Link>
          </div>
        </nav>
      )}
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </div>
  );
}
