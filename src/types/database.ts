export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      workout_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          exercise_name: string;
          sets: number;
          weight: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          exercise_name: string;
          sets: number;
          weight?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          exercise_name?: string;
          sets?: number;
          weight?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
};

export type WorkoutLog = Database["public"]["Tables"]["workout_logs"]["Row"];
