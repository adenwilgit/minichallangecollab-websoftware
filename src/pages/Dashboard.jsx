import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Flame,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";

const initialMissions = [
  {
    id: 1,
    title: "Pelajari konsep prompt engineering",
    category: "AI Fundamentals",
    due: "Hari ini",
    progress: 72,
    color: "mint",
    completed: false,
  },
  {
    id: 2,
    title: "Buat prototype landing page",
    category: "UI / UX Design",
    due: "Besok",
    progress: 45,
    color: "coral",
    completed: false,
  },
  {
    id: 3,
    title: "Review materi machine learning",
    category: "Data & Insight",
    due: "20 Sep",
    progress: 100,
    color: "gold",
    completed: true,
  },
];

const navItems = [
  { label: "Ringkasan", icon: LayoutDashboard },
  { label: "Misi Saya", icon: Target },
  { label: "Leaderboard", icon: Trophy },
  { label: "Komunitas", icon: Users },
];

function Dashboard({ user, darkMode, onToggleTheme, onLogout }) {
  const [missions, setMissions] = useState(initialMissions);
  const [activeNav, setActiveNav] = useState("Ringkasan");
  const [showForm, setShowForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [newMission, setNewMission] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const completedCount = missions.filter((mission) => mission.completed).length;
  const averageProgress = Math.round(
    missions.reduce((total, mission) => total + mission.progress, 0) /
      missions.length,
  );

  function toggleMission(id) {
    setMissions((current) =>
      current.map((mission) =>
        mission.id === id
          ? {
              ...mission,
              completed: !mission.completed,
              progress: mission.completed ? 72 : 100,
            }
          : mission,
      ),
    );
  }

  function addMission(event) {
    event.preventDefault();
    if (!newMission.trim()) return;
    setMissions((current) => [
      ...current,
      {
        id: Date.now(),
        title: newMission.trim(),
        category: "Personal Challenge",
        due: "Minggu ini",
        progress: 0,
        color: "lavender",
        completed: false,
      },
    ]);
    setNewMission("");
    setShowForm(false);
  }

  function confirmLogout() {
    setShowLogoutConfirm(true);
  }

  function completeLogout() {
    setShowLogoutConfirm(false);
    onLogout();
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "is-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <BrainCircuit size={21} strokeWidth={2.4} />
          </div>
          <div>
            <strong>
              mini<span>challenge</span>
            </strong>
            <small>AI learning space</small>
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Tutup menu"
          >
            <X size={19} />
          </button>
        </div>
        <nav className="main-nav" aria-label="Navigasi utama">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={`nav-item ${activeNav === label ? "active" : ""}`}
              key={label}
              onClick={() => {
                setActiveNav(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Ringkasan" && <span className="active-dot" />}
            </button>
          ))}
          <p className="nav-label nav-label-spaced">Lainnya</p>
          <button className="nav-item" onClick={() => setActiveNav("Insight")}>
            <BarChart3 size={18} />
            <span>Insight belajar</span>
          </button>
          <button
            className="nav-item"
            onClick={() => setActiveNav("Pengaturan")}
          >
            <Settings size={18} />
            <span>Pengaturan</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <CircleHelp size={17} />
            </div>
            <div>
              <strong>Butuh inspirasi?</strong>
              <p>Temukan misi baru hari ini.</p>
            </div>
            <ChevronRight size={16} />
          </div>
          <div className="profile-row">
            <div className="avatar">{user.role === "mentor" ? "MA" : "AW"}</div>
            <div className="profile-copy">
              <strong>{user.name}</strong>
              <span>
                {user.role === "mentor"
                  ? "Mentor workspace"
                  : "Explorer level 04"}
              </span>
            </div>
            <button
              className="icon-button"
              onClick={confirmLogout}
              aria-label="Keluar"
            >
              <span title="Keluar">↪</span>
            </button>
          </div>
        </div>
      </aside>
      {mobileMenu && (
        <button
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
          aria-label="Tutup navigasi"
        />
      )}
      {showLogoutConfirm && (
        <div className="modal-overlay" role="presentation">
          <section
            className="logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div className="logout-modal-icon">↪</div>
            <h2 id="logout-title">Keluar dari akun?</h2>
            <p>Anda perlu login kembali untuk mengakses dashboard.</p>
            <div className="logout-actions">
              <button
                className="cancel-button"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Batal
              </button>
              <button
                className="logout-confirm-button"
                onClick={completeLogout}
              >
                Ya, Logout
              </button>
            </div>
          </section>
        </div>
      )}
      <main className="main-content">
        <header className="topbar">
          <button
            className="icon-button menu-toggle"
            onClick={() => setMobileMenu(true)}
            aria-label="Buka menu"
          >
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{activeNav}</strong>
          </div>
          <div className="topbar-actions">
            <button className="icon-button search-button" aria-label="Cari">
              <Search size={19} />
            </button>
            <button
              className="icon-button notification-button"
              aria-label="Notifikasi"
            >
              <Bell size={19} />
              <i />
            </button>
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label="Ubah tema"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </header>
        <div className="content-wrap">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">
                <Sparkles size={15} /> MONDAY, 23 SEPTEMBER 2026
              </p>
              <h1>
                Selamat datang, {user.role === "mentor" ? "Mentor" : "Aden"}
                <span>.</span>
              </h1>
              <p className="welcome-copy">
                Satu tantangan kecil hari ini bisa jadi skill besar esok hari.
              </p>
            </div>
            <div className="streak-badge">
              <div className="flame">
                <Flame size={22} fill="currentColor" />
              </div>
              <div>
                <strong>12 hari</strong>
                <span>learning streak</span>
              </div>
            </div>
          </section>
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow light">
                <Lightbulb size={15} /> CHALLENGE OF THE DAY
              </p>
              <h2>
                Eksperimen dengan
                <br />
                <em>ide yang berbeda.</em>
              </h2>
              <p>
                Gunakan AI untuk mengubah satu ide sederhana menjadi sesuatu
                yang belum pernah Anda buat.
              </p>
              <button className="primary-button">
                Mulai challenge <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="hero-visual">
              <div className="orb orb-one" />
              <div className="orb orb-two" />
              <div className="visual-card">
                <Sparkles size={21} />
                <strong>
                  Think
                  <br />
                  forward
                </strong>
                <span>01 / 07</span>
              </div>
              <div className="orbit-line" />
            </div>
          </section>
          <section className="stats-grid">
            <StatCard
              icon={Target}
              label="Total misi"
              value={missions.length}
              detail="+2 minggu ini"
              tone="mint"
            />
            <StatCard
              icon={CheckCircle2}
              label="Misi selesai"
              value={completedCount}
              detail={`${Math.round((completedCount / missions.length) * 100) || 0}% dari total misi`}
              tone="coral"
            />
            <StatCard
              icon={Activity}
              label="Rata-rata progres"
              value={`${averageProgress}%`}
              detail="+8% dari minggu lalu"
              tone="gold"
            />
            <StatCard
              icon={Trophy}
              label="Total poin"
              value="2,480"
              detail="Top 18% explorer"
              tone="lavender"
            />
          </section>
          <div className="dashboard-grid">
            <section className="panel missions-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">YOUR FOCUS</p>
                  <h2>Misi yang sedang berjalan</h2>
                </div>
                <button
                  className="text-button"
                  onClick={() => setShowForm(true)}
                >
                  Lihat semua <ArrowUpRight size={15} />
                </button>
              </div>
              {showForm && (
                <form className="mission-form" onSubmit={addMission}>
                  <input
                    autoFocus
                    value={newMission}
                    onChange={(event) => setNewMission(event.target.value)}
                    placeholder="Tulis misi baru..."
                  />
                  <button className="primary-button" type="submit">
                    Tambah <Plus size={15} />
                  </button>
                </form>
              )}
              <div className="mission-list">
                {missions.map((mission) => (
                  <MissionRow
                    key={mission.id}
                    mission={mission}
                    onToggle={toggleMission}
                  />
                ))}
              </div>
              <button
                className="add-mission"
                onClick={() => setShowForm((current) => !current)}
              >
                <Plus size={16} /> Tambah misi baru
              </button>
            </section>
            <section className="panel activity-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">RECENT LOG</p>
                  <h2>Aktivitas terbaru</h2>
                </div>
                <button className="icon-button">
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="activity-list">
                <ActivityItem
                  icon={Check}
                  color="mint"
                  title="Menyelesaikan misi"
                  detail="Review materi machine learning"
                  time="2 jam lalu"
                />
                <ActivityItem
                  icon={Flame}
                  color="coral"
                  title="Streak bertambah"
                  detail="12 hari konsisten belajar"
                  time="Kemarin"
                />
                <ActivityItem
                  icon={Trophy}
                  color="gold"
                  title="Naik peringkat"
                  detail="Sekarang di posisi #184"
                  time="2 hari lalu"
                />
              </div>
              <div className="weekly-goal">
                <div className="goal-top">
                  <span>Weekly learning goal</span>
                  <strong>7 / 10 jam</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: "70%" }} />
                </div>
                <p>
                  <CalendarDays size={14} /> 3 jam lagi menuju target minggu ini
                </p>
              </div>
            </section>
          </div>
          <footer className="footer" aria-label="Informasi aplikasi">
            <span>© 2026 Mini Challenge AI</span>
            <span>
              Dibuat untuk terus bertumbuh{" "}
              <Sparkles className="footer-spark" size={13} aria-hidden="true" />
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, detail, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-icon">
        <Icon size={19} />
      </div>
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
function MissionRow({ mission, onToggle }) {
  return (
    <div className={`mission-row ${mission.completed ? "completed" : ""}`}>
      <button
        className={`check-button ${mission.completed ? "checked" : ""}`}
        onClick={() => onToggle(mission.id)}
        aria-label={`Tandai ${mission.title}`}
      >
        <Check size={14} />
      </button>
      <div className="mission-info">
        <div className="mission-title">
          <strong>{mission.title}</strong>
          <span>{mission.category}</span>
        </div>
        <div className="mission-progress">
          <div className="progress-track">
            <span
              className={mission.color}
              style={{ width: `${mission.progress}%` }}
            />
          </div>
          <span>{mission.progress}%</span>
        </div>
      </div>
      <span className="due-date">{mission.due}</span>
    </div>
  );
}
function ActivityItem({ icon: Icon, color, title, detail, time }) {
  return (
    <div className="activity-item">
      <div className={`activity-icon ${color}`}>
        <Icon size={15} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      <time>{time}</time>
    </div>
  );
}

export default Dashboard;
