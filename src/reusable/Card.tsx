type CardProps = {
  /** Content to display inside the Card  */
  children: React.ReactNode;
};

/** Styled wrapper element */
export function Card(props: CardProps) {
  return (
    <div className="max-w-sm p-4 m-2 transition-colors border border-gray-400 rounded-lg shadow-lg">
      {props.children}
    </div>
  );
}
