import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// @todo re-enable notifications
// import Notifications from 'components/Notifications';

export default function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <Navigation />
      <div className="p-4">{children}</div>
      <Footer />
    </div>
  );
}
