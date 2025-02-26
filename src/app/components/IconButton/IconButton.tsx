import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

type Props = {
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  src: string;
  alt: string;
};

export default function IconButton({ buttonProps, src, alt }: Props) {
  return (
    <button {...buttonProps}>
      <Image src={src} alt={alt} width={24} height={24} />
    </button>
  );
}
