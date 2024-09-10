import { useContext } from 'react';
import { WorkoutRecordModal } from "@/components/WorkoutRecordModal";
import { RouteHandle } from "@/router";
import styles from "@/routes/SharedLayout/styles.module.css";
import { Link, Outlet, useMatches } from "react-router-dom";

import SVGIcon from "@/components/SVGicon";
import "@/components/SVGicon/styles.module.css";
import { useSetupPocketBaseUser } from "@/hooks/user";

import { ThemeContext } from '@/main';
import { Theme } from '@/theme';
import styled from 'styled-components';


interface Props {
  theme: Theme;
}

const GnbContainer = styled('div')<Props>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const Gnb = styled('ul')<Props>`
  flex-shrink: 0;
  z-index: 50;
  order: 9999;
  height: var(--space-15);
  flex-shrink: 0;
  flex-grow: 0;
  box-shadow: var(--gnb-shadow);
  background: ${({ theme }) => theme.gnbBar};
  & > ul{
    display: flex;
    justify-content: space-between;
    height: var(--space-15);
    padding: var(--space-none) var(--space-5);
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
  }
`;

const HeaderContainer = styled('header')<Props>`
  height: var(--space-12-half);;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  border-bottom: 0.125rem solid;
  background: ${({ theme }) => theme.gnbBar};
  color: ${({ theme }) => theme.text};
`;

const IconHoverFrame = styled('figure')<Props>`
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: var(--rounded-full);
  transition: 0.3s;
`;


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

  const { theme } = useContext(ThemeContext);

  return (
    <GnbContainer theme={theme}>
      {/* header */}
      {!hideHeader && <HeaderContainer>{title}</HeaderContainer>}
      {/* global navigation bar */}
      {!hideGnb && (
        <Gnb theme={theme}>
          <ul>
            <li>
              <Link to={"/home"} type="button">
                <IconHoverFrame>
                  <SVGIcon
                    iconId="iconHome"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/home")
                        ? theme.gnbIconAcive
                        : theme.gnbIconDefault
                    }
                  />
                </IconHoverFrame>
              </Link>
            </li>
            <li>
              <Link to={"/calendar"} type="button">
                <IconHoverFrame>
                  <SVGIcon
                    iconId="iconCalendar"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/calendar")
                      ? theme.gnbIconAcive
                      : theme.gnbIconDefault
                    }
                  />
                </IconHoverFrame>
              </Link>
            </li>
            <li>
              <WorkoutRecordModal />
            </li>
            <li>
              <Link to={"/maps"} type="button">
                <IconHoverFrame>
                  <SVGIcon
                    iconId="iconMap"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/maps")
                      ? theme.gnbIconAcive
                      : theme.gnbIconDefault
                    }
                  />
                </IconHoverFrame>
              </Link>
            </li>
            <li>
              <Link to={"/my-page"} type="button">
                <IconHoverFrame>
                  <SVGIcon
                    iconId="iconMyPage"
                    width={20}
                    height={20}
                    color={
                      matches.some((match) => match.pathname === "/my-page")
                      ? theme.gnbIconAcive
                      : theme.gnbIconDefault
                    }
                  />
                </IconHoverFrame>
              </Link>
            </li>
          </ul>
        </Gnb>
      )}
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </GnbContainer>
  );
}
