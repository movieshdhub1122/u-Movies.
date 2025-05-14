import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - uMovies',
  description: 'Manage uMovies content and settings.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      {children}
    </div>
  );
}
