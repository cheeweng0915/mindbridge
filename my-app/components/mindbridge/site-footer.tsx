export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#010120] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-end">
          <div className="space-y-5">
            <p className="mindbridge-label text-white/60">MindBridge</p>
            <p className="max-w-2xl text-3xl font-medium leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl">
              One calm place for check-ins, reflection, breathing, and help.
            </p>
            <p className="max-w-xl text-base leading-[1.35] text-white/72">
              This version keeps data in the current browser and is meant to help
              users choose the next supportive step, not replace care.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-white/78 sm:grid-cols-2">
            <div className="mindbridge-dark-card p-4">
              <p className="mindbridge-label text-white/60">Urgent support</p>
              <p className="mt-3 text-base font-medium text-white">Emergency 999</p>
              <p className="mt-1 text-white/60">Immediate danger or crisis</p>
            </div>
            <div className="mindbridge-dark-card p-4">
              <p className="mindbridge-label text-white/60">Counselling</p>
              <p className="mt-3 text-base font-medium text-white">Talian HEAL 15555</p>
              <p className="mt-1 text-white/60">Daily mental health support</p>
            </div>
            <div className="mindbridge-dark-card p-4 sm:col-span-2">
              <p className="mindbridge-label text-white/60">Emotional support</p>
              <p className="mt-3 text-base font-medium text-white">
                Befrienders KL 03-7627 2929
              </p>
              <p className="mt-1 text-white/60">
                Free and confidential support, 24 hours every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
