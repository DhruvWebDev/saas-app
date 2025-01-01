import "./globals.css";
import { Wrapper } from "@/components/wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
