import type { ReactNode } from "react";

type AuthPageShellProps = {
  children: ReactNode;
};

const featureList = [
  "Shape product plans into implementation-ready specs.",
  "Keep architecture decisions and progress visible.",
  "Move from auth-protected workspace to editor without ceremony.",
];

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="grid min-h-screen bg-base text-copy-primary lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
      <section className="hidden border-r border-surface-border bg-surface px-10 py-9 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-subtle-border bg-elevated text-sm font-semibold text-brand">
              AD
            </div>
            <span className="text-sm font-medium text-copy-primary">Arcdev</span>
          </div>
          <div className="mt-20 max-w-sm">
            <p className="text-sm font-medium text-brand">Design the system first.</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-copy-primary">
              A focused workspace for planning durable software.
            </h1>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-copy-secondary">
              {featureList.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="max-w-xs text-xs leading-5 text-copy-muted">
          Minimal by design, protected by Clerk, and ready for the editor flow.
        </p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:min-h-0">
        {children}
      </section>
    </main>
  );
}
