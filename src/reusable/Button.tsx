import clsx from "clsx";

export const buttonTypes = ["button", "submit"] as const;

type ButtonType = typeof buttonTypes[number];

// Extending so all valid props are accepted,
// But specifying a few that we always want to require.
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  type: ButtonType;
  bgColor?: str;
}

export function Button({ children, className, bgColor = "sky", ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(`text-white border bg-${bgColor}-600`, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
