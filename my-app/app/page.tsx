import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          MindBridge
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
          Admin panel template has been mounted into this app.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          You can now use the imported TailAdmin dashboard as the starting point
          for your management backend, while keeping this page as your public
          frontend entry.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Open Admin Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Public Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
