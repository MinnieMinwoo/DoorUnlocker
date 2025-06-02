import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "door unlocker",
  description: "オートロック対策",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
