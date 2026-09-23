import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

// Wraps children with a scroll-reveal transition.
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, style }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

// A linked reveal block for grid items.
export function RevealLink({ to, className = "", delay = 0, children }) {
  const [ref, visible] = useReveal();
  return (
    <Link
      to={to}
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Link>
  );
}