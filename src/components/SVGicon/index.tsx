import { convertImageToWebP } from "@/utils/convertImageToWebP";
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
stroke?: string;
}

function SVGIcon({iconId, width, height, stroke='currentColor'}: SVGIconProps) {
    return (
      <svg className={styles.icon}
        width={width}
        height={height}
        stroke={stroke}
      >
        <use width={width} height={height} href={`${icons}#${iconId}`} stroke={stroke} />
      </svg>
      );

}

export default SVGIcon;
