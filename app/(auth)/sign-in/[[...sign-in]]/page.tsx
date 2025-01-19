import Header from '@/app/_components/Header';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Sign-In Section */}
      <div className="flex items-center justify-center h-screen">
        <div>
          <SignIn forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}
