import './globals.css';

export const metadata = {
  title: 'NBA ALL STAR LINEUP Builder',
  description: 'Build your own NBA All-Star lineup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-brand-dark text-white">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
