import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

type Props = {
  text?: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  src: string;
  alt: string;
};

export default function IconButton({ text, buttonProps, src, alt }: Props) {
  return (
    <button {...buttonProps}>
      {text || null}
      <Image src={src} alt={alt} width={16} height={16} />
    </button>
  );
}
