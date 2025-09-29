import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(searchParams: {
  callbackUrl: string | undefined;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/"; // Fallback to "/" if undefined
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="p-8 rounded-lg shadow-lg flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {/* Credentials Form */}
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="email" className="flex flex-col">
            Email
            <input
              name="email"
              id="email"
              className="border rounded p-2"
              type="email"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              name="password"
              id="password"
              className="border rounded p-2"
              type="password"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        {/* Provider Buttons */}
        {Object.values(await providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: callbackUrl,
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Sign in with {provider.name}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
