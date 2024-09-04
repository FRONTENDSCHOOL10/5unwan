import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import pocketbase from '../../api/pocketbase'; // pocketbase API 호출 부분

const DeleteAccountModal = ({ closeModal }: { closeModal: () => void }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleDeleteAccount = async () => {
        try {
            // 회원탈퇴 API 호출 (예시, 실제 구현에 맞게 수정 필요)
            await pocketbase.collection('users').delete('user-id', {password});
            history.push('/start'); // 탈퇴 후 시작 페이지로 이동
        } catch (err) {
            setError('Failed to delete account. Please check your password and try again.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Delete Account</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.passwordInput}
                />
                {error && <p className={styles.errorText}>{error}</p>}
                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                    <button className={styles.confirmButton} onClick={handleDeleteAccount}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
