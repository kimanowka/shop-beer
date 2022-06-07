import { DetailedHTMLProps } from "react";
import styles from "./Error.module.css";

interface ErrorProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}
export function Error({ children, ...props }: ErrorProps): JSX.Element {
  return (
    <div className={styles.error} {...props}>
      {children}
    </div>
  );
}
