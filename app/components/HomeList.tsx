type Task = {
  id: string;
  title: string;
  subject: string | null;
  dueDate: Date | null;
  source: string;
};

function formatDue(dueDate: Date | null) {
  if (!dueDate) return "No due date";
  return `Due ${dueDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}`;
}

export default function HomeList({ tasks }: { tasks: Task[] }) {
  return (
    <main className="min-h-screen bg-[#FBF9F5] px-6 py-10">
      <div className="w-full max-w-xs mx-auto">
        <h1 className="text-xl font-bold text-[#1B2A4A] mb-1">This week</h1>
        <p className="text-sm text-[#8B8D98] mb-6">
          {tasks.length} tasks synced from Google Classroom
        </p>

        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl px-4 py-3 border border-[#EDEAE2]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#1B2A4A]">
                  {t.title}
                </span>
                {t.source === "gcr" && (
                  <span className="text-[10px] uppercase tracking-wide text-[#4C63D2] font-medium">
                    GCR
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8B8D98]">{t.subject}</p>
              <p className="text-xs text-[#B3B0A6] mt-1">
                {formatDue(t.dueDate)}
              </p>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-sm text-[#8B8D98] text-center mt-10">
            All clear for now.
          </p>
        )}
      </div>
    </main>
  );
}
