// src/components/pages/TaskGraph.jsx
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { HiMiniMap } from "react-icons/hi2";
import { MdFilterAltOff } from "react-icons/md";
import { supabase } from "../../supabaseClient";
import { UserAuth } from "../../context/AuthContext";

const NAV_HEIGHT = 0;

const PRI_META = {
  "Priority & Important": { color: "#ef4444", bg: "#fee2e2", short: "P & I" },
  "Not Priority & Important": { color: "#3b82f6", bg: "#dbeafe", short: "I" },
  "Priority & Not Important": { color: "#f59e0b", bg: "#fef3c7", short: "P" },
  "Not Priority & Not Important": {
    color: "#6b7280",
    bg: "#e5e7eb",
    short: "-",
  },
  Default: { color: "#6b7280", bg: "#e5e7eb", short: "-" },
};

const RING = { groupR: 240, taskR: 420 };

/* ---- helpers ---- */
const polar = (r, thetaDeg) => {
  const t = (thetaDeg * Math.PI) / 180;
  return { x: Math.cos(t) * r, y: Math.sin(t) * r };
};

// Approximate box for side-center handle picking
const BOX = { w: 220, h: 56 };
const centerOf = (pos) => ({ cx: pos.x + BOX.w / 2, cy: pos.y + BOX.h / 2 });

/** pick closest side-center handle id between A -> B */
const pickSide = (aPos, bPos) => {
  const a = centerOf(aPos);
  const b = centerOf(bPos);
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "right" : "left";
  }
  return dy > 0 ? "bottom" : "top";
};

/* ---- Custom node: 4 side-center handles ---- */
const SidedNode = ({ data }) => {
  const {
    label,
    border = "#cbd5e1",
    bg = "#ffffff",
    text = "#111827",
    bold = false,
    maxWidth = 260,
  } = data || {};
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        padding: 8,
        background: bg,
        border: `1px solid ${border}`,
        color: text,
        fontWeight: bold ? 700 : 600,
        maxWidth,
        width: BOX.w,
        minHeight: BOX.h,
        lineHeight: 1.2,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* top */}
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
      {/* right */}
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      {/* bottom */}
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
      {/* left */}
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />

      {label}
    </div>
  );
};

const nodeTypes = { center: SidedNode };

const TaskGraph = () => {
  const { session } = UserAuth();
  const userId = session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [q, setQ] = useState("");
  const [activePri, setActivePri] = useState(
    () => new Set(Object.keys(PRI_META).filter((k) => k !== "Default"))
  );
  const [showMiniMap, setShowMiniMap] = useState(false);

  useEffect(() => {
    // enable on >= md screens by default
    const onDesktop = window.matchMedia("(min-width: 768px)").matches;
    setShowMiniMap(onDesktop);
  }, []);
  const rfInstanceRef = React.useRef(null);

  // fetch tasks
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("id,title,priority,labels,start_date,end_date")
        .eq("user_id", userId)
        .limit(500);
      if (!error) setTasks(data || []);
    })();
  }, [userId]);

  // filter + search
  const visibleTasks = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (tasks || []).filter((t) => {
      const pri = t.priority || "Default";
      if (!activePri.has(pri)) return false;
      if (!term) return true;
      return (
        (t.title || "").toLowerCase().includes(term) ||
        (t.labels || []).some((l) => (l || "").toLowerCase().includes(term))
      );
    });
  }, [tasks, q, activePri]);

  // build nodes/edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const centerId = "root";
    const centerNode = {
      id: centerId,
      type: "center",
      position: { x: 0, y: 0 },
      data: {
        label: "All Tasks",
        border: "#cbd5e1",
        bg: "#ffffff",
        text: "#111827",
        bold: true,
        maxWidth: 260,
      },
      draggable: true,
    };

    const priList = Array.from(
      new Set(visibleTasks.map((t) => t.priority || "Default"))
    ).filter((p) => p !== "Default");

    // Priority nodes
    const groupNodes = priList.map((pri, i) => {
      const step = 360 / Math.max(1, priList.length);
      const { x, y } = polar(RING.groupR, i * step - 90);
      const meta = PRI_META[pri] || PRI_META.Default;
      return {
        id: `group:${pri}`,
        type: "center",
        position: { x, y },
        data: {
          label: pri,
          border: meta.color,
          bg: meta.bg,
          text: "#111827",
          bold: true,
          maxWidth: 260,
        },
        draggable: true,
      };
    });

    // group tasks by priority
    const grouped = priList.reduce((acc, pri) => {
      acc[pri] = visibleTasks.filter((t) => (t.priority || "Default") === pri);
      return acc;
    }, {});

    const taskNodes = [];
    const edges = [];

    const nodeById = {};
    [centerNode, ...groupNodes].forEach((n) => (nodeById[n.id] = n));

    // Center → Group
    for (const pri of priList) {
      const meta = PRI_META[pri] || PRI_META.Default;
      const gid = `group:${pri}`;
      edges.push({
        id: `e:${centerId}->${gid}`,
        source: centerId,
        target: gid,
        sourceHandle: pickSide(centerNode.position, nodeById[gid].position),
        targetHandle: pickSide(nodeById[gid].position, centerNode.position),
        style: { stroke: meta.color, strokeWidth: 1.5 },
        type: "bezier",
      });
    }

    // Group → Task
    priList.forEach((pri, i) => {
      const meta = PRI_META[pri] || PRI_META.Default;
      const baseTheta = (360 / priList.length) * i - 90;
      const list = grouped[pri] || [];
      const count = Math.max(1, list.length);
      const arc = Math.min(120, Math.max(30, count * 12));
      const start = baseTheta - arc / 2;
      const step = arc / count;

      list.forEach((t, idx) => {
        const angle = start + step * idx;
        const { x, y } = polar(RING.taskR, angle);

        const tid = `task:${t.id}`;
        const tNode = {
          id: tid,
          type: "center",
          position: { x, y },
          data: {
            label: t.title || "(untitled)",
            border: meta.color,
            bg: "#ffffff",
            text: "#111827",
            bold: false,
            maxWidth: 260,
          },
          draggable: true,
        };
        taskNodes.push(tNode);
        nodeById[tid] = tNode;

        const gid = `group:${pri}`;
        edges.push({
          id: `e:${gid}->${tid}`,
          source: gid,
          target: tid,
          sourceHandle: pickSide(
            nodeById[gid].position,
            nodeById[tid].position
          ),
          targetHandle: pickSide(
            nodeById[tid].position,
            nodeById[gid].position
          ),
          style: { stroke: meta.color, strokeWidth: 1.2 },
          type: "bezier",
        });
      });
    });

    return {
      initialNodes: [centerNode, ...groupNodes, ...taskNodes],
      initialEdges: edges,
    };
  }, [visibleTasks]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Auto-fit on load & whenever layout changes
  const fitNow = useCallback(() => {
    const inst = rfInstanceRef.current;
    if (!inst) return;
    inst.fitView({ padding: 0.2, includeHiddenNodes: true, duration: 300 });
  }, []);
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);
  useEffect(() => {
    // after nodes/edges reset, wait a tick and fit
    const id = requestAnimationFrame(fitNow);
    return () => cancelAnimationFrame(id);
  }, [nodes.length, edges.length, fitNow]);

  const togglePri = (key) => {
    setActivePri((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next.size
        ? next
        : new Set(Object.keys(PRI_META).filter((k) => k !== "Default"));
    });
  };
  const resetPri = () =>
    setActivePri(new Set(Object.keys(PRI_META).filter((k) => k !== "Default")));

  const onNodeClick = useCallback(
    (_, node) => {
      if (!node.id.startsWith("task:")) return;
      const id = node.id.replace("task:", "");
      const t = tasks.find((x) => String(x.id) === String(id));
      if (!t) return;
      alert(
        `${t.title}\nPriority: ${t.priority || "Default"}${
          t.labels?.length ? `\nLabels: ${t.labels.join(", ")}` : ""
        }${
          t.start_date
            ? `\nStart: ${new Date(t.start_date).toLocaleString()}`
            : ""
        }${t.end_date ? `\nEnd: ${new Date(t.end_date).toLocaleString()}` : ""}`
      );
    },
    [tasks]
  );

  useEffect(() => {
    if (!rfInstanceRef.current) return;
    const inst = rfInstanceRef.current;
    // small timeout so DOM has applied new nodes before fit
    const t = setTimeout(() => {
      inst.fitView({ padding: 0.2, includeHiddenNodes: true, duration: 250 });
      requestAnimationFrame(() => inst.focus());
    }, 0);
    return () => clearTimeout(t);
  }, [nodes.length, edges.length]);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 bg-white mt-16"
      style={{ top: NAV_HEIGHT }}
    >
      {/* overlay controls */}
      <div className="absolute top-3 left-3 z-10 items-center justify-center">
        <div className="flex flex-col gap-2 p-3 rounded-xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-800">Task Mind Map</span>

            <div className="flex items-center gap-2">
              {/* Reset button */}
              <button
                onClick={resetPri}
                className="px-2.5 py-1.5 rounded-full border text-xs transition 
               bg-white hover:bg-red-50 hover:text-red-600 
               active:bg-red-100"
                style={{ borderColor: "#cbd5e1" }}
                title="Show all"
              >
                <MdFilterAltOff className="text-base align-middle" />
              </button>

              {/* MiniMap toggle button */}
              <button
                onClick={() => setShowMiniMap((s) => !s)}
                className={`px-2.5 py-1.5 rounded-full border text-xs transition 
      ${
        showMiniMap
          ? "bg-green-50 text-green-700 hover:bg-green-100 active:bg-green-200"
          : "bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
      }`}
                style={{ borderColor: "#cbd5e1" }}
                aria-pressed={showMiniMap}
                title="Toggle MiniMap"
              >
                <HiMiniMap className="text-base align-middle" />
              </button>
            </div>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks…"
            className="w-64 max-w-[70vw] px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.keys(PRI_META)
              .filter((k) => k !== "Default")
              .map((k) => {
                const meta = PRI_META[k];
                const active = activePri.has(k);

                return (
                  <button
                    key={k}
                    onClick={() => togglePri(k)}
                    className={`px-2.5 py-1.5 rounded-full border text-xs transition 
            ${
              active
                ? "bg-white hover:bg-opacity-80"
                : "bg-slate-50 opacity-70 hover:opacity-100"
            }`}
                    style={{
                      borderColor: meta.color,
                      // subtle hover tint based on priority color
                      boxShadow: active ? `0 0 0 2px ${meta.bg}` : "none",
                    }}
                    aria-pressed={active}
                    title={`Toggle ${k}`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="align-middle font-medium text-slate-700">
                      {meta.short}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* full-viewport canvas */}
      <div className="absolute inset-0">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={(inst) => {
            rfInstanceRef.current = inst;
            inst.fitView({
              padding: 0.2,
              includeHiddenNodes: true,
              duration: 300,
            });
            requestAnimationFrame(() => inst.focus());
          }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          onNodeClick={onNodeClick}
        >
          {showMiniMap && (
            <MiniMap
              position="bottom-right"
              pannable
              zoomable
              style={{
                width: 200,
                height: 120,
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                margin: 8,
              }}
            />
          )}
          <Controls showInteractive />
          <Background gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TaskGraph;
