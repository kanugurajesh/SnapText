"use client"; // Ensure this component is rendered on the client-side

import { signOut } from "next-auth/react"; // Ensure you import signIn correctly

export default function SignOut() {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await signOut({ redirectTo: "/" }); // Redirect to the home page after signing out
  };

  return (
    <form onSubmit={handleSignIn}>
      <button
        type="submit"
        className="bg-white text-black py-3 px-5 w-full font-semibold rounded-b-md hover:bg-black hover:text-white transition-all ease-in-out duration-300"
      >
        Sign Out
      </button>
    </form>
  );
}
