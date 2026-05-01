import './globals.css';

export const metadata = {
  title: 'GigLens — Profit & Expense Tracker',
  description: 'Track every rupee from every gig. Real-time profit and expense tracking for Uber, Etsy, Upwork, DoorDash and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5F7] dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}