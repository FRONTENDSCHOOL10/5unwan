import styles from "@/components/SVGicon/styles.module.css";
import icons from "./svgSprites.svg";

export type SvgIconId =
  | "iconHome"
  | "iconCalendar"
  | "iconMap"
  | "iconMyPage"
  | "iconSignatureSmall"
  | "iconArrowsLeft"
  | "iconEdit"
  | "iconCheck"
  | "iconArrowsRight"
  | "iconSearch"
  | "iconAdd"
  | "iconKakao"
  | "iconEllipse";

interface SVGIconProps {
  iconId?: SvgIconId | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  name?: string;
  to?: string;
  onClick?: () => void;
  onChange?: () => void;
}

function SVGIcon({
  iconId,
  width,
  height,
  color = "currentColor",
  name,
  to,
  onClick,
  onChange,
}: SVGIconProps) {
  return (
    <svg
      className={styles.icon}
      width={width}
      height={height}
      href={`${icons}#${iconId}`}
      color={color}
      name={name}
      to={to}
      onClick={onClick}
      onChange={onChange}
    >
      <use
        width={width}
        height={height}
        href={`${icons}#${iconId}`}
        color={color}
      />
    </svg>
  );
}

export default SVGIcon;
