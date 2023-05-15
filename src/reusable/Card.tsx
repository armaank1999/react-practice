import clsx from "clsx";

type CardProps = {
  /** Content to display inside the Card  */
  children: React.ReactNode;
  className?: string;
};

/** Styled wrapper element */
export function Card(props: CardProps) {
  return (
    <div className={clsx("p-4 m-2 transition-colors border border-gray-400 rounded-lg shadow-lg", props.className)} style={{width: "24rem"}}>
      {props.children}
    </div>
  );
}
