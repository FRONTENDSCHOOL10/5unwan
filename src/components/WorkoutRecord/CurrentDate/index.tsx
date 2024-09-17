// import classNames from 'classnames';
// import styles from './currentDate.module.css';

export function getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// export function getCurrentDate(): string {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;

//     return (
//         <p className={classNames(styles.date, "body-lg-bold")}>
//             {formattedDate}
//         </p>
//     );
// }