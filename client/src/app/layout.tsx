// app/layout.tsx

import "./globals.css";
import { Lora, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/provider/index";



export const metadata = {
  title: "English Learning App",
  description: "Learn vocabulary daily with repetition",
};
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", dmSans.variable)}>
      <body
        className={`${lora.variable} bg-[#f7f5f0] 
        text-foreground 
        font-sans 
        antialiased
        min-h-screen `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}