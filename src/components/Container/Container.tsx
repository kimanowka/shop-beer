import { DetailedHTMLProps } from "react";
import styles from "./Container.module.css";

interface ContainerProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export function Container({ children, ...props }: ContainerProps): JSX.Element {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
}
