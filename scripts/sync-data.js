/* Sync script in JS for Node without ts-node */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TEAM_PATH = path.join(ROOT, "public/data/team.json");
const PROJECTS_PATH = path.join(ROOT, "public/data/projects.json");
const RESEARCHERS_PATH = path.join(ROOT, "public/data/researchers.json");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function normalize(s) {
  return String(s || "").trim().toLowerCase();
}

// Remove common academic titles from the start for matching purposes only
function stripTitles(name) {
  return String(name || "")
    .replace(/^\s*(dr\.|prof\.|mr\.|ms\.|mrs\.)\s+/i, "")
    .trim();
}

function levenshtein(a, b) {
  a = a || ""; b = b || "";
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function tokens(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean);
}

function looksInitialName(name) {
  const t = tokens(name);
  if (t.length === 0) return false;
  // if first token is like 'P.' or single letter
  const first = t[0];
  return /(^[A-Za-z]\.$)|(^[A-Za-z]$)/.test(first);
}

function runSync() {
  if (!fs.existsSync(TEAM_PATH)) {
    console.error("team.json not found at:", TEAM_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error("projects.json not found at:", PROJECTS_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(RESEARCHERS_PATH)) {
    console.error("researchers.json not found at:", RESEARCHERS_PATH);
    process.exit(1);
  }

  const team = readJson(TEAM_PATH);
  const projectsFile = readJson(PROJECTS_PATH);
  const researchersFile = readJson(RESEARCHERS_PATH);

  const members = Array.isArray(team.members) ? team.members : [];
  const projects = Array.isArray(projectsFile.projects)
    ? projectsFile.projects
    : [];

  const projectByName = new Map();
  projects.forEach((p, idx) => projectByName.set(normalize(p.name), idx));

  // Note: team.json is the source of truth for CURRENT members' project assignments.
  // External/non-current names listed in projects.json will be preserved.

  // Names: team.json is the source of truth for CURRENT member display names.

  // We'll rebuild project->researchers sets strictly from CURRENT members' team.json assignments.
  // This removes duplicates/old variants and excludes previous/external names.
  const currentMembersList = members.filter((m) => m && m.status === "current" && m.name);
  const projResearchers = new Map();
  projects.forEach((p) => {
    projResearchers.set(normalize(p.name), new Set());
  });

  // Build a fast lookup of current members by normalized no-title name
  const currentMembersByNorm = new Map();
  for (const m of members) {
    if (m && m.status === "current" && m.name) {
      currentMembersByNorm.set(normalize(stripTitles(m.name)), m);
    }
  }

  // For each current member, use team.json name as-is and only team.json projects
  for (const m of members) {
    if (!m || m.status !== "current") continue; // only keep current members in sync
    // Use ONLY team-specified projects (source of truth). Filter to known projects.
    const assigned = new Set(
      (Array.isArray(m.projects) ? m.projects : [])
        .filter(Boolean)
        .filter((p) => projectByName.has(normalize(p)))
    );

    // Also make sure project.researchers includes this member for the assigned projects
    for (const projName of assigned) {
      const key = normalize(projName);
      const set = projResearchers.get(key) || new Set();
      set.add(m.name);
      projResearchers.set(key, set);
    }
  }

  projects.forEach((p) => {
    const key = normalize(p.name);
    const set = projResearchers.get(key) || new Set();
    p.researchers = Array.from(set).sort((a, b) => String(a).localeCompare(String(b)));
  });

  // Do NOT write back team.json; it is the source of truth and should not be modified by sync

  writeJson(PROJECTS_PATH, { projects });

  const existingIdByName = new Map();
  let maxId = 0;
  for (const r of (researchersFile.researchers || [])) {
    existingIdByName.set(r.name, r.id);
    if (r.id > maxId) maxId = r.id;
  }

  // Researchers.json should contain ONLY CURRENT team members (names as in team.json),
  // ordered by designation: Research Staff, then Research Scholar, then M.Tech, then others.
  const rankOf = (label) => {
    const l = String(label || "").toLowerCase();
    if (l.includes("research staff") || l.includes("lab head")) return 0;
    if (l.includes("research scholar")) return 1;
    if (l.includes("m.tech")) return 2;
    return 3;
  };

  const currentMembers = members.filter(
    (m) => m && m.status === "current" && m.name
  );

  // Sort as requested: group by designation rank, and within each group
  // preserve the visual order from team.json
  const teamIndexByRef = new Map();
  members.forEach((m, i) => teamIndexByRef.set(m, i));
  currentMembers.sort((a, b) => {
    const ra = rankOf(a.designationLabel);
    const rb = rankOf(b.designationLabel);
    if (ra !== rb) return ra - rb;
    const ia = teamIndexByRef.get(a) ?? 1e9;
    const ib = teamIndexByRef.get(b) ?? 1e9;
    return ia - ib;
  });

  const newResearchers = currentMembers.map((m) => {
    const name = m.name;
    const existing = existingIdByName.get(name);
    if (typeof existing === "number") return { id: existing, name };
    maxId += 1;
    return { id: maxId, name };
  });

  writeJson(RESEARCHERS_PATH, { researchers: newResearchers });

  console.log(
    `Sync complete: ${projects.length} projects and ${newResearchers.length} researchers updated (team.json is source for current members' project memberships).`
  );
}

// If started with --watch, watch team and projects files and re-run on change
if (process.argv.includes("--watch")) {
  const debounce = (fn, delay) => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, delay);
    };
  };

  const rerun = debounce(() => {
    try {
      runSync();
    } catch (e) {
      console.error("Sync failed:", e);
    }
  }, 200);

  runSync();
  try {
    fs.watch(TEAM_PATH, { persistent: true }, rerun);
    fs.watch(PROJECTS_PATH, { persistent: true }, rerun);
    console.log("Watching team.json and projects.json for changes...");
  } catch (e) {
    console.error("Failed to start file watchers:", e);
  }
} else {
  runSync();
}
