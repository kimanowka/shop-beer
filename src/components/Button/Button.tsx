import { DetailedHTMLProps } from "react";
import styles from "./Button.module.css";
interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}
export function Button({ children, ...props }: ButtonProps): JSX.Element {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
}
