// C:/Users/82107/Desktop/fp/5unwan/src/components/Modal/index.tsx
import React from "react";
import styles from "./modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
