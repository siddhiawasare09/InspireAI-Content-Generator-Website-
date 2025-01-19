'use client';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const handleSignUpClick = () => {
    router.push('/sign-up');
  };

  return (
    <div className="p-4 shadow-sm border-bS">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
  <Image src="/logo.svg" width={30} height={30} alt="logo" />
  <a href="#" className="logo text-violet-700 font-bold text-xl">
    Inspire<span className="text-violet-700">AI</span>
  </a>
</div>


        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Button variant="outline" onClick={handleDashboardClick}>
              Dashboard
            </Button>
            <UserButton />
          </div>
        ) : (
          <Button onClick={handleSignUpClick}>Sign Up</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
