import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In - Best AI Tools Free',
  description: 'Sign in to your Best AI Tools Free account to manage your submitted tools and saved favorites.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md flex justify-center">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm',
              card: 'shadow-xl border border-gray-100 rounded-2xl',
            }
          }}
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}
