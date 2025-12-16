import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col">
        <p>Landing Page</p>
        
        <Link className="bg-white px-4 py-2 text-black font-bold text-lg rounded-lg mt-10" href="/login">Ir al Login</Link>
      </main>
    </div>
  );
}
