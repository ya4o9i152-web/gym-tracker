"use client";

import type { WorkoutLog } from "@/types/database";
import { createClient } from "@/lib/supabase";

type Props = {
  logs: WorkoutLog[];
  onDeleted: () => void;
};

export default function WorkoutList({ logs, onDeleted }: Props) {
  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("workout_logs").delete().eq("id", id);
    onDeleted();
  };

  if (logs.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        この日の記録はありません
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {logs.map((log) => (
        <li
          key={log.id}
          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5"
        >
          <div>
            <p className="text-sm font-medium text-gray-800">
              {log.exercise_name}
            </p>
            <p className="text-xs text-gray-500">
              {log.sets} セット{log.weight ? ` · ${log.weight} kg` : ""}
            </p>
          </div>
          <button
            onClick={() => handleDelete(log.id)}
            className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
