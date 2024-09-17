// https://codesandbox.io/p/devbox/drawer-without-scale-forked-kxh9j5?file=%2Fapp%2Fmy-drawer.tsx%3A14%2C22

import { Drawer } from "vaul";
import { useState } from "react";
import { WorkoutRecordForm } from "@/components/WorkoutRecord/WorkoutRecordForm";
import styles from "@/components/WorkoutRecord/WorkoutRecordModal/workoutRecordModal.module.css";

import SVGIcon from "@/components/SVGicon";
import iconstyles from "@/components/SVGicon/styles.module.css";

<<<<<<< Updated upstream
=======
import CurrentDate from "./CurrentDate";

>>>>>>> Stashed changes
export function WorkoutRecordModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <Drawer.Root dismissible={false} open={modalOpen}>
      <Drawer.Trigger asChild>
        <button onClick={handleOpen} type="button" className={iconstyles["gnb-icon-edit"]}>
          <SVGIcon iconId="iconSignatureSmall" width={20} height={20} color="var(--white)"/>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.outer}>
          <div className={styles.inner}>
            <span className={styles.handle}></span>
              <Drawer.Title>
                <p className="body-xl-bold">득근 기록하기</p>
                <CurrentDate/>
                <br />
              </Drawer.Title>
                <WorkoutRecordForm
                  onSuccess={handleClose}
                  onCancel={handleClose}
                />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

