import SVGIcon from "@/components/SVGicon";
import { useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import classNames from 'classnames'; // Make sure you have this package installed
import styles from './header.module.css';
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

interface HeaderProps {
  className?: string;
  leftIconId?: string;
  leftIconVisible?: boolean;
  rightIconId?: string;
  rightIconVisible?: boolean;
  to?: string;
  leftonClick?: () => void;
  rightonClick?: () => void;
  hideTitle?: boolean;
  background?: string;
}

export default function Header({
  className = '',
  leftIconId = '',
  leftIconVisible = false,
  rightIconId = '',
  rightIconVisible = false,
  to,
  leftonClick,
  rightonClick,
  hideTitle = false,
  background= '',
}: HeaderProps) {
  const { isDark } = useDarkMode();
  const matches = useMatches();

  const lastMatchWithTitle = [...matches]
    .reverse()
    .find((match) => (match.handle as RouteHandle)?.title);

  const title = (lastMatchWithTitle?.handle as RouteHandle)?.title || "";

  return (
    <div className={classNames(styles.container, { [styles["is-dark"]]: isDark })}>
      <header
        style={{ background }} // Apply the background as an inline style
        className={`${styles["header"]} ${className}`}
      >
        {leftIconVisible && (
          <SVGIcon
            width={20}
            height={20}
            name="left-icon"
            iconId={leftIconId}
            onClick={leftonClick}
            to={to}
          />
        )}
        <h1 className={classNames("body-md-bold", styles["title"], { 'sr-only': hideTitle })}>
          {title}
        </h1>
        {rightIconVisible && (
          <SVGIcon
            width={20}
            height={20}
            name="right-icon"
            iconId={rightIconId}
            onClick={rightonClick}
          />
        )}
      </header>
    </div>
  );
}
