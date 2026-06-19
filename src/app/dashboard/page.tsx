"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createClient } from "@/lib/supabase";
import type { WorkoutLog } from "@/types/database";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [gymDates, setGymDates] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState("");

  const dateStr = (d: Date) => d.toLocaleDateString("sv-SE");

  const fetchLogs = useCallback(async (date: Date) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("date", dateStr(date))
      .order("created_at");
    setLogs(data ?? []);
  }, []);

  const fetchGymDates = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("workout_logs").select("date");
    const dates = [...new Set((data ?? []).map((d) => d.date as string))];
    setGymDates(dates);
  }, []);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }
      setUserEmail(user.email ?? "");
      fetchLogs(selectedDate);
      fetchGymDates();
    };
    init();
  }, [router, selectedDate, fetchLogs, fetchGymDates]);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      fetchLogs(value);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const refresh = () => {
    fetchLogs(selectedDate);
    fetchGymDates();
  };

  const tileClassName = ({ date }: { date: Date }) => {
    return gymDates.includes(dateStr(date)) ? "gym-day" : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏋️</span>
          <h1 className="font-bold text-gray-900">Gym Tracker</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5"
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* カレンダー */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            📅 トレーニングカレンダー
          </h2>
          <style>{`
            .react-calendar { width: 100%; border: none; font-family: inherit; }
            .react-calendar__tile { border-radius: 8px; padding: 8px 4px; }
            .react-calendar__tile--active { background: #3b82f6 !important; color: white !important; }
            .react-calendar__tile:hover { background: #eff6ff; }
            .gym-day { background: #dbeafe; color: #1d4ed8; font-weight: 600; }
            .gym-day.react-calendar__tile--active { background: #3b82f6 !important; color: white !important; }
            .react-calendar__navigation button { border-radius: 8px; }
            .react-calendar__navigation button:hover { background: #eff6ff; }
          `}</style>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            locale="ja-JP"
          />
          <p className="text-xs text-center text-gray-400 mt-2">
            🔵 ジムに行った日
          </p>
        </div>

        {/* 選択日の記録 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            📝{" "}
            {selectedDate.toLocaleDateString("ja-JP", {
              month: "long",
              day: "numeric",
            })}{" "}
            の記録
          </h2>
          <WorkoutList logs={logs} onDeleted={refresh} />
        </div>

        {/* 記録フォーム */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            ➕ メニューを追加
          </h2>
          <WorkoutForm date={dateStr(selectedDate)} onSaved={refresh} />
        </div>
      </main>
    </div>
  );
}
