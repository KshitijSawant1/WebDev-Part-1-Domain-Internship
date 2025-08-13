// src/services/taskService.js
import { supabase } from "../supabaseClient";

/** Get tasks for a user */
export async function fetchTasks(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Create a task (no status/progress columns) */
export async function createTask(userId, payload) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ user_id: userId, ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Delete a task */
export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
  return true;
}

/**
 * Mark complete WITHOUT status/progress columns:
 * - set end_date = now (so time-based progress becomes 100%)
 * Optionally, add a completed_at column in your schema if you want an explicit marker.
 */
export async function markComplete(taskId) {
  const nowISO = new Date().toISOString();
  const { data, error } = await supabase
    .from("tasks")
    .update({ end_date: nowISO, updated_at: nowISO })
    .eq("id", taskId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
