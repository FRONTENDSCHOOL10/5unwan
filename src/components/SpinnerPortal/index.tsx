import { createPortal } from "react-dom";
import { Spinner } from "../Spinner";

export const SpinnerPortal = () => {
  return createPortal(<Spinner />, document.getElementById("spinner-portal")!);
};
