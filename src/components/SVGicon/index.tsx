import styles from "@/components/SVGicon/styles.module.css";
import icons from "./svgSprites.svg";

export type SvgIconId =
  | 'iconHome'
  | 'iconCalendar'
  | 'iconMap'
  | 'iconMyPage'
  | 'iconSignatureSmall'
  | 'iconArrowsLeft'
  | 'iconEdit'
  | 'iconCheck'
  | 'iconArrowsRight'
  | 'iconSearch'
  | 'iconAdd'

interface SVGIconProps {
iconId: SvgIconId | string;
width?: number | string;
height?: number | string;
color?: string;
}

function SVGIcon({iconId, width, height, color='currentColor'}: SVGIconProps) {
    return (
      <svg className={styles.icon}
        width={width}
        height={height}
        color={color}
      >
        <use width={width} height={height} href={`${icons}#${iconId}`} color={color} />
      </svg>
      );

}

export default SVGIcon;
