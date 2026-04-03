// app/layout.tsx

import "./globals.css";
import { Lora, DM_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/provider/index";
import { Toaster } from "sonner";



export const metadata = {
  title: "English Learning App",
  description: "Learn vocabulary daily with repetition",
};

const lora = Lora({
  subsets: ['vietnamese'], // Quan trọng để hiển thị tiếng Việt chuẩn
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora', // Tạo biến CSS để dùng trong Tailwind
})
const inter = Inter({
  subsets: ['vietnamese'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${inter.variable} bg-[#ffffff] 
        text-foreground 
        font-sans 
        antialiased
        min-h-screen `}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}