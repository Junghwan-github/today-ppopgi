import styles from "./modal.module.css";

const Modal = ({show, children}) => {
    
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    );

}

export default Modal;