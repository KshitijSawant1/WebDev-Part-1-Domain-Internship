import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase } from "../../supabaseClient";
import { UserAuth } from "../../context/AuthContext";

const PRI = {
  "Priority & Important": { bg: "#fecaca", dot: "#ef4444", label: "P & I" },
  "Not Priority & Important": { bg: "#bfdbfe", dot: "#3b82f6", label: "I" },
  "Priority & Not Important": { bg: "#fde68a", dot: "#f59e0b", label: "P" },
  "Not Priority & Not Important": { bg: "#e5e7eb", dot: "#6b7280", label: "-" },
  Default: { bg: "#e5e7eb", dot: "#6b7280", label: "-" },
};

// Static list of selectable priorities (outside the component is fine)
const ALL_PRI_KEYS = Object.keys(PRI).filter((k) => k !== "Default");

const CalendarPage = () => {
  const { session } = UserAuth();
  const userId = session?.user?.id;

  const [rawTasks, setRawTasks] = useState([]);
  const [view, setView] = useState("dayGridMonth"); // "dayGridMonth" | "timeGridWeek"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const calendarRef = useRef(null);

  // ✅ hooks must be inside the component
  const [activePri, setActivePri] = useState(new Set(ALL_PRI_KEYS));
  const togglePri = (key) => {
    setActivePri((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next.size ? next : new Set(ALL_PRI_KEYS);
    });
  };
  const clearPri = () => setActivePri(new Set(ALL_PRI_KEYS));

  // Fetch tasks
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, start_date, end_date, priority, labels")
        .eq("user_id", userId)
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Load tasks error:", error);
        setRawTasks([]);
      } else {
        setRawTasks(data || []);
      }
      setLoading(false);
    })();
  }, [userId]);

  // Map -> FullCalendar events (and filter by active priorities)
  const events = useMemo(() => {
    return (rawTasks || [])
      .filter((t) => t.start_date)
      .filter((t) => activePri.has(t.priority || "Default"))
      .map((t) => {
        const meta = PRI[t.priority] || PRI.Default;
        return {
          id: String(t.id),
          title: t.title || "Untitled",
          start: t.start_date,
          end: t.end_date || undefined,
          backgroundColor: meta.bg,
          borderColor: "transparent",
          textColor: "#0f172a",
          extendedProps: {
            priority: t.priority,
            dot: meta.dot,
            labels: t.labels || [],
          },
        };
      });
  }, [rawTasks, activePri]);

  // Change view without remounting
  useEffect(() => {
    const api = calendarRef.current?.getApi?.();
    if (api) api.changeView(view);
  }, [view]);

  // Supabase writes
  const updateTaskDates = async (id, startISO, endISO) => {
    setSaving(true);
    const { error } = await supabase
      .from("tasks")
      .update({ start_date: startISO, end_date: endISO })
      .eq("id", id)
      .eq("user_id", userId);
    setSaving(false);
    if (error) {
      console.error("Update dates error:", error);
      alert("Failed to update event dates.");
      return false;
    }
    setRawTasks((prev) =>
      prev.map((t) =>
        String(t.id) === String(id)
          ? { ...t, start_date: startISO, end_date: endISO }
          : t
      )
    );
    return true;
  };

  const createQuickTask = async (title, startISO, endISO) => {
    setSaving(true);
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: userId,
        title: title || "New Task",
        start_date: startISO,
        end_date: endISO,
        priority: "Default",
      })
      .select();
    setSaving(false);
    if (error) {
      console.error("Create task error:", error);
      alert("Failed to create event.");
      return null;
    }
    if (data?.[0]) {
      setRawTasks((prev) => [data[0], ...prev]);
      return data[0];
    }
    return null;
  };

  // Renderers
  const renderEventContent = (arg) => {
    const dot = arg.event.extendedProps?.dot || PRI.Default.dot;
    return (
      <div className="flex items-center gap-1">
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 9999,
            backgroundColor: dot,
          }}
        />
        <span className="truncate">{arg.event.title}</span>
      </div>
    );
  };

  const eventDidMount = (info) => {
    const start = info.event.start ? info.event.start.toLocaleString() : "n/a";
    const end = info.event.end ? info.event.end.toLocaleString() : "";
    info.el.title = `${info.event.title}\n${start}${end ? ` → ${end}` : ""}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10 ">
      {/* Controls Container */}
      <div
        className="
    rounded-xl border border-slate-200 shadow-sm mb-6
 bg-white 
    p-4
  "
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Calendar</h1>

          {/* View buttons pinned right */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setView("dayGridMonth")}
              className={`px-3 py-1.5 rounded-md border transition
          ${
            view === "dayGridMonth"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("timeGridWeek")}
              className={`px-3 py-1.5 rounded-md border transition
          ${
            view === "timeGridWeek"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
            >
              Week
            </button>
          </div>
        </div>
        {/* Legend (click to filter) */}
        <div className="mt-4 rounded-lg p-3 ">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(PRI).map(([name, v]) =>
              name === "Default" ? null : (
                <button
                  key={name}
                  type="button"
                  onClick={() => togglePri(name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition
            ${
              activePri.has(name)
                ? "bg-white shadow hover:shadow-md"
                : "bg-slate-50 opacity-70 hover:opacity-90"
            }`}
                  style={{ borderColor: v.dot }}
                  aria-pressed={activePri.has(name)}
                  title={`Toggle ${name}`}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: v.dot }}
                    aria-hidden
                  />
                  <span className="font-medium text-slate-700">{v.label}</span>
                  <span className="text-slate-500 hidden sm:inline">
                    ({name})
                  </span>
                </button>
              )
            )}

            {/* Reset filter */}
            <button
              type="button"
              onClick={clearPri}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs bg-white hover:shadow-md transition"
              style={{ borderColor: "#cbd5e1" }}
              title="Show all priorities"
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"
                aria-hidden
              />
              <span className="font-medium text-slate-600">All</span>
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="text-gray-600">Loading…</div>
      ) : events.length === 0 ? (
        <div className="text-gray-600">
          No scheduled tasks yet. Click and drag on the calendar to create one.
        </div>
      ) : null}

      {/* Calendar */}
      <div className={`${saving ? "opacity-60 pointer-events-none" : ""}`}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          firstDay={1}
          height="auto"
          events={events}
          eventContent={renderEventContent}
          eventDidMount={eventDidMount}
          selectable
          selectMirror
          selectOverlap
          editable
          eventDrop={async (info) => {
            const ok = await updateTaskDates(
              info.event.id,
              info.event.start?.toISOString(),
              info.event.end?.toISOString() || null
            );
            if (!ok) info.revert();
          }}
          eventResize={async (info) => {
            const ok = await updateTaskDates(
              info.event.id,
              info.event.start?.toISOString(),
              info.event.end?.toISOString() || null
            );
            if (!ok) info.revert();
          }}
          dayMaxEvents={3}
          nowIndicator
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          expandRows
        />
      </div>
    </div>
  );
};

export default CalendarPage;
