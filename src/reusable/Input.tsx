import { TextField, Box } from "@mui/material";
import { Status } from "../ManageMenu";
import { useState } from "react";

type InputProps = {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "password" | "email";
  value: string | number;
  error: string | undefined;
  status: Status;
  onBlur?: (event: any) => void;
};

export function Input({
  type = "text",
  error,
  status,
  onBlur,
  ...rest
}: InputProps) {
  const [touched, setTouched] = useState(false);
  return (
    <Box className="mt-2 mb-2">
      <TextField
        type={type}
        onBlur={(e) => {
          setTouched(true);
          onBlur && onBlur(e);
        }}
        error={(touched || status === "submitted") && Boolean(error)}
        helperText={(touched || status === "submitted") && error}
        {...rest}
      />
    </Box>
    // <div className="mb-4">
    //   <label className="block" htmlFor={id}>
    //     {label}
    //   </label>
    //   <input
    //     id={id}
    //     value={value}
    //     onChange={onChange}
    //     type={type}
    //     className="p-1 border border-black rounded-sm"
    //   />
    // </div>
  );
}
