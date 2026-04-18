export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#010120] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="mindbridge-label text-white/60">MindBridge</p>
          <p className="max-w-2xl text-lg leading-[1.3] text-white/80">
            A gentle check-in for stress, reflection, and support. This tool
            helps you choose a next step, but it does not replace professional
            care.
          </p>
          <p className="text-sm text-white/60">
            Data stays local to the current browser for this version.
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
    </footer>
  );
}
