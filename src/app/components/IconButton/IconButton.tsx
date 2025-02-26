import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: MouseEventHandler<HTMLButtonElement>;
  src: string;
  alt: string;
};

export default function IconButton({ type, onClick, src, alt }: Props) {
  return (
    <button type={type} onClick={onClick}>
      <Image src={src} alt={alt} width={24} height={24} />
    </button>
  );
}
