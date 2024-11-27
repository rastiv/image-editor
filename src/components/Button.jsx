import { forwardRef } from "react";

const Button = forwardRef(({ icon, children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className="inline-flex items-center gap-1 p-1 text-sm text-white/50 hover:text-white"
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
