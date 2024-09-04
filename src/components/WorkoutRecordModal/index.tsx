// https://codesandbox.io/p/devbox/drawer-without-scale-forked-kxh9j5?file=%2Fapp%2Fmy-drawer.tsx%3A14%2C22

import { Drawer } from "vaul";
import { useState } from "react";
import { WorkoutRecordForm } from "@/components/WorkoutRecordForm";
import styles from "@/components/WorkoutRecordModal/workoutRecordModal.module.css";

import SVGIcon from "@/components/SVGicon"
import iconstyles from "@/components/SVGicon/styles.module.css"

export function WorkoutRecordModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <Drawer.Root dismissible={false} open={modalOpen}>
      <Drawer.Trigger asChild>
        <button onClick={handleOpen} type="button" className={iconstyles["gnb-icon-edit"]}>
          <SVGIcon iconId="iconSignatureSmall" width={20} height={20} color="#ffffff"/>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <div className={styles.inner}>
            <div className={styles.handle} />
            <div>
              <Drawer.Title>
                <span>득근 기록하기</span>
                <br />
                {/* TODO: 오늘 날짜 가져오기 */}
                <WorkoutRecordForm
                  onSuccess={handleClose}
                  onCancel={handleClose}
                />
              </Drawer.Title>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
