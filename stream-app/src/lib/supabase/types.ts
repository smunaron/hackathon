export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      shows: {
        Row: {
          id: string;
          title: string;
          description: string;
          thumbnail: string;
          banner: string;
          category: string;
          genres: string[];
          year: number;
          rating: string;
          featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["shows"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["shows"]["Insert"]>;
      };
      episodes: {
        Row: {
          id: string;
          show_id: string;
          title: string;
          description: string;
          video_url: string;
          season: number;
          episode_number: number;
          duration: number;
          thumbnail: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["episodes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["episodes"]["Insert"]>;
      };
      watchlist: {
        Row: {
          id: string;
          user_id: string;
          show_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["watchlist"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["watchlist"]["Insert"]>;
      };
      watch_progress: {
        Row: {
          id: string;
          user_id: string;
          episode_id: string;
          progress: number;
          completed: boolean;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["watch_progress"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["watch_progress"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Show = Database["public"]["Tables"]["shows"]["Row"];
export type Episode = Database["public"]["Tables"]["episodes"]["Row"];
export type WatchlistItem = Database["public"]["Tables"]["watchlist"]["Row"];
export type WatchProgress = Database["public"]["Tables"]["watch_progress"]["Row"];
