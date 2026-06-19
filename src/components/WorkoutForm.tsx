"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

const EXERCISE_PRESETS = [
  "ベンチプレス",
  "スクワット",
  "デッドリフト",
  "ショルダープレス",
  "ラットプルダウン",
  "ダンベルカール",
  "トライセプスプレスダウン",
  "レッグプレス",
];

type Props = {
  date: string;
  onSaved: () => void;
};

export default function WorkoutForm({ date, onSaved }: Props) {
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("workout_logs").insert({
      user_id: user.id,
      date,
      exercise_name: exerciseName,
      sets: parseInt(sets),
      weight: weight ? parseFloat(weight) : null,
    });

    setExerciseName("");
    setSets("");
    setWeight("");
    setLoading(false);
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          種目
        </label>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
          placeholder="例：ベンチプレス"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          list="exercise-presets"
        />
        <datalist id="exercise-presets">
          {EXERCISE_PRESETS.map((ex) => (
            <option key={ex} value={ex} />
          ))}
        </datalist>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            セット数
          </label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            required
            min={1}
            placeholder="3"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            重量 (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min={0}
            step={0.5}
            placeholder="60"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
      >
        {loading ? "保存中..." : "+ 記録を追加"}
      </button>
    </form>
  );
}
