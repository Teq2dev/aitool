import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up - Best AI Tools Free',
  description: 'Create a free account on Best AI Tools Free to submit AI tools, write blog posts, and access developer tools.',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md flex justify-center">
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm',
              card: 'shadow-xl border border-gray-100 rounded-2xl',
            }
          }}
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}
