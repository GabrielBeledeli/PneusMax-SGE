import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({src, alt, className, width = 800, height = 400}: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  );
}
