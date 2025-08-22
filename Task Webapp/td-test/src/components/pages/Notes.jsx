import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { supabase } from "../../supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { FaTrashArrowUp } from "react-icons/fa6";
import { SiExcalidraw } from "react-icons/si";
import { FaNotesMedical } from "react-icons/fa6";

const Excalidraw = React.lazy(() =>
  import("@excalidraw/excalidraw").then((m) => ({ default: m.Excalidraw }))
);
import "@excalidraw/excalidraw/index.css";

const BOARD_TITLE = "Whiteboard";

const normalizeScene = (scene) => {
  if (!scene) return undefined;
  const elements = Array.isArray(scene.elements) ? scene.elements : [];
  const files = scene.files ?? {};
  const incomingAppState = scene.appState ?? {};
  const appState = { ...incomingAppState, collaborators: [] };
  return { elements, appState, files };
};

const Notes = () => {
  const { session } = UserAuth();
  const userId = session?.user?.id;
  const [showBoard, setShowBoard] = useState(true);
  // Whiteboard state
  const [boardRow, setBoardRow] = useState(null);
  const [boardScene, setBoardScene] = useState(undefined);
  const [boardLoading, setBoardLoading] = useState(true);
  const excaliRef = useRef(null);
  const saveTimer = useRef(null);

  // Text notes state
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ title: "", content: "", labels: "" });
  const [notesLoading, setNotesLoading] = useState(true);

  // Load or create whiteboard
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setBoardLoading(true);

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .eq("title", BOARD_TITLE)
        .limit(1);

      if (error) console.error("load whiteboard error:", error);

      if (data && data[0]) {
        setBoardRow(data[0]);
        try {
          const parsed = data[0].content ? JSON.parse(data[0].content) : null;
          setBoardScene(normalizeScene(parsed));
        } catch {
          setBoardScene(undefined);
        }
      } else {
        const { data: created, error: cErr } = await supabase
          .from("notes")
          .insert({
            user_id: userId,
            title: BOARD_TITLE,
            content: "",
            labels: ["board", "excalidraw"],
            pinned: true,
          })
          .select()
          .single();
        if (cErr) console.error("create whiteboard error:", cErr);
        setBoardRow(created || null);
        setBoardScene(undefined);
      }

      setBoardLoading(false);
    })();
  }, [userId]);

  const saveScene = useCallback(
    async (scene) => {
      if (!boardRow) return;
      try {
        await supabase
          .from("notes")
          .update({
            content: JSON.stringify(scene ?? {}),
            updated_at: new Date().toISOString(),
          })
          .eq("id", boardRow.id)
          .eq("user_id", userId);
      } catch (e) {
        console.error("save scene error:", e);
      }
    },
    [boardRow, userId]
  );

  const onBoardChange = useCallback(
    (elements, appState, files) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);

      const clean = {
        elements,
        appState: { ...(appState || {}), collaborators: [] },
        files: files || {},
      };

      saveTimer.current = setTimeout(() => {
        setBoardScene(normalizeScene(clean));
        saveScene(clean);
      }, 600);
    },
    [saveScene]
  );

  // Exports
  const exportPNG = async () => {
    const api = excaliRef.current;
    if (!api || typeof api.getSceneAsPng !== "function") return;
    const blob = await api.getSceneAsPng({
      background: "#ffffff",
      exportBackground: true,
      pixelRatio: 2,
      quality: 1,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${BOARD_TITLE}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportSVG = async () => {
    const api = excaliRef.current;
    if (!api || typeof api.getSceneAsSvg !== "function") return;
    const svg = await api.getSceneAsSvg({
      exportBackground: true,
      background: "#ffffff",
    });
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${BOARD_TITLE}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Notes CRUD
  const loadNotes = useCallback(async () => {
    if (!userId) return;
    setNotesLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .neq("title", BOARD_TITLE)
      .order("pinned", { ascending: false })
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("load notes error:", error);
      setNotes([]);
    } else {
      setNotes(data || []);
    }
    setNotesLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    loadNotes();
  }, [userId, loadNotes]);

  const createNote = async (e) => {
    e.preventDefault();
    const labels = (form.labels || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    await supabase.from("notes").insert({
      user_id: userId,
      title: form.title.trim(),
      content: form.content.trim(),
      labels,
    });

    setForm({ title: "", content: "", labels: "" });
    loadNotes();
  };

  const togglePin = async (id, pinned) => {
    await supabase.from("notes").update({ pinned: !pinned }).eq("id", id);
    loadNotes();
  };

  const remove = async (id) => {
    if (!confirm("Delete this note?")) return;
    await supabase.from("notes").delete().eq("id", id);
    loadNotes();
  };

  const filtered = useMemo(() => {
    if (!q.trim()) return notes;
    const k = q.toLowerCase();
    return notes.filter(
      (n) =>
        (n.title || "").toLowerCase().includes(k) ||
        (n.content || "").toLowerCase().includes(k) ||
        (n.labels || []).some((l) => (l || "").toLowerCase().includes(k))
    );
  }, [notes, q]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-10">
      {/* ── Whiteboard section ─────────────────────────────────────────────── */}
      {showBoard && (
        <>
          {/* Whiteboard header */}
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg sm:text-xl font-semibold">{BOARD_TITLE}</h1>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportPNG}
                className="px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50 text-sm"
              >
                Export PNG
              </button>
              <button
                onClick={exportSVG}
                className="px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50 text-sm"
              >
                Export SVG
              </button>
            </div>
          </div>

          {/* Whiteboard canvas */}
          <div className="relative h-[60vh] sm:h-[70vh] lg:h-[78vh] w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {boardLoading ? (
              <div className="absolute inset-0 grid place-items-center text-slate-500">
                Loading board…
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-items-center text-slate-500">
                    Initializing canvas…
                  </div>
                }
              >
                <Excalidraw
                  ref={excaliRef}
                  initialData={boardScene}
                  onChange={onBoardChange}
                  theme="light"
                  UIOptions={{
                    canvasActions: {
                      loadScene: false,
                      saveToActiveFile: false,
                    },
                  }}
                />
              </Suspense>
            )}
          </div>
        </>
      )}

      {/* ── Notes section ──────────────────────────────────────────────────── */}
      {!showBoard && (
        <>
          {/* Text Notes header */}
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base sm:text-lg font-semibold">Notes</h2>
            <div className="w-full sm:w-auto">
              <input
                className="border rounded px-3 py-2 w-full sm:w-64"
                placeholder="Search notes…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          {/* Create text note */}
          <form
            onSubmit={createNote}
            className="bg-white/95 backdrop-blur rounded-xl shadow-md p-5 mb-6 grid gap-4 sm:grid-cols-2 transition-all duration-300"
          >
            {/* Title */}
            <input
              className="border border-slate-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />

            {/* Labels */}
            <input
              className="border border-slate-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Labels (comma)"
              value={form.labels}
              onChange={(e) =>
                setForm((f) => ({ ...f, labels: e.target.value }))
              }
            />

            {/* Content */}
            <textarea
              className="border border-slate-300 rounded-lg px-4 py-2.5 sm:col-span-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              rows={4}
              placeholder="Write something…"
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              required
            />

            {/* Submit */}
            <div className="sm:col-span-2 flex justify-end">
              <button
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm 
                 hover:bg-blue-700 active:scale-95 transition-all duration-200"
              >
                Add Note
              </button>
            </div>
          </form>

          {/* Text notes list */}
          {notesLoading ? (
            <div className="text-gray-600">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="text-gray-600">No notes yet.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className="mb-4 break-inside-avoid rounded-xl shadow bg-white p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {n.title || "(untitled)"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePin(n.id, n.pinned)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                        title={n.pinned ? "Unpin" : "Pin"}
                      >
                        {n.pinned ? (
                          <TiPin className="w-5 h-5" />
                        ) : (
                          <TiPinOutline className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => remove(n.id)}
                        className="p-1 rounded hover:bg-gray-100 text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrashArrowUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {n.content}
                  </p>

                  {(n.labels || []).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {n.labels.map((l, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 rounded bg-purple-100 text-purple-800"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    Updated{" "}
                    {new Date(n.updated_at || n.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Floating toggle (bottom-right) ─────────────────────────────────── */}
      <button
        onClick={() => setShowBoard((v) => !v)}
        aria-label={showBoard ? "Hide whiteboard" : "Show whiteboard"}
        className={`fixed bottom-6 right-6 z-50 grid place-items-center w-14 h-14 rounded-full shadow-lg focus:outline-none focus:ring-4
        transition-all duration-300 ease-out active:scale-95 hover:scale-110 hover:rotate-6
        ${
          showBoard
            ? "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-300"
            : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 focus:ring-slate-300"
        }`}
        title={showBoard ? "Hide whiteboard" : "Show whiteboard"}
      >
        <div
          className="transition-all duration-300 ease-in-out transform"
          key={showBoard ? "excalidraw" : "notes"}
        >
          {showBoard ? (
            <SiExcalidraw className="w-6 h-6 animate-fadeInScale" />
          ) : (
            <FaNotesMedical className="w-6 h-6 animate-fadeInScale" />
          )}
        </div>
      </button>
    </div>
  );
};

export default Notes;
