// TaskNest - Production Quality Productivity Web Application
// "Tasks → Focus → Grow 🌱"

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============================================================================
// AUDIO SYNTHESIZER (Pure Web Audio API - Zero External Dependencies)
// ============================================================================
function playZenChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Pleasant multi-tone harmonic chime (Singing bowl / zen bell)
    const frequencies = [528, 660, 792, 1056]; // Solfeggio 528Hz harmonious chord
    const now = ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Delicate envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + idx * 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 3.5);
    });
  } catch (e) {
    console.warn('Web Audio note chime error:', e);
  }
}

// Subtle click feedback tone
function playSoftTick() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {}
}

// ============================================================================
// VECTOR SVG GRAPHICS (Mascot, Plants, Terrarium, Icons)
// ============================================================================

// Cute Cartoon Cat Mascot Companion
function MascotCat({ mood = 'happy', size = 80 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 120 108" fill="none" xmlns="http://www.w3.org/2000/svg" className="mascot-svg">
      {/* Soft Drop Shadow */}
      <ellipse cx="60" cy="100" rx="44" ry="7" fill="currentColor" opacity="0.12" />

      {/* Cat Tail */}
      <path d="M96 74C108 72 116 62 114 50C112 40 102 38 98 44C94 50 100 58 92 68" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />

      {/* Cat Body */}
      <ellipse cx="60" cy="74" rx="42" ry="28" fill="#FDE68A" />
      <ellipse cx="60" cy="76" rx="26" ry="18" fill="#FFFBEB" />

      {/* Left Ear */}
      <path d="M30 40L16 14C24 16 38 24 42 34Z" fill="#F59E0B" />
      <path d="M28 36L20 18C25 20 34 26 37 32Z" fill="#FCA5A5" />

      {/* Right Ear */}
      <path d="M90 40L104 14C96 16 82 24 78 34Z" fill="#F59E0B" />
      <path d="M92 36L100 18C95 20 86 26 83 32Z" fill="#FCA5A5" />

      {/* Sprout on Head 🌱 */}
      <path d="M60 22C60 14 54 8 46 8C46 16 54 18 60 22Z" fill="#10B981" />
      <path d="M60 22C60 12 68 6 76 7C75 15 67 18 60 22Z" fill="#34D399" />
      <path d="M60 22V28" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cat Head */}
      <circle cx="60" cy="46" r="34" fill="#FDE68A" />

      {/* Orange Head Patch */}
      <path d="M42 22C50 20 70 20 78 22C80 28 82 34 76 38C70 40 50 40 44 38C38 34 40 28 42 22Z" fill="#F59E0B" opacity="0.35" />

      {/* Cheeks / Blush */}
      <circle cx="38" cy="56" r="6" fill="#F87171" opacity="0.55" />
      <circle cx="82" cy="56" r="6" fill="#F87171" opacity="0.55" />

      {/* Eyes based on mood */}
      {mood === 'happy' && (
        <>
          <ellipse cx="44" cy="46" rx="4.5" ry="5.5" fill="#1F2937" />
          <circle cx="46" cy="44" r="1.8" fill="white" />
          <ellipse cx="76" cy="46" rx="4.5" ry="5.5" fill="#1F2937" />
          <circle cx="78" cy="44" r="1.8" fill="white" />
        </>
      )}
      {mood === 'sleepy' && (
        <>
          <path d="M40 48C43 45 47 45 50 48" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 48C73 45 77 45 80 48" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {mood === 'celebrate' && (
        <>
          <path d="M38 48C42 42 46 42 50 48" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M70 48C74 42 78 42 82 48" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}

      {/* Nose */}
      <polygon points="60,53 57,50 63,50" fill="#F87171" />

      {/* Mouth */}
      <path d="M55 55C57 58 60 58 60 56C60 58 63 58 65 55" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cute Whiskers */}
      <path d="M26 50L12 48M26 55L14 56" stroke="#D97706" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M94 50L108 48M94 55L106 56" stroke="#D97706" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Front Paws */}
      <ellipse cx="48" cy="88" rx="8" ry="6" fill="#FFFBEB" />
      <ellipse cx="72" cy="88" rx="8" ry="6" fill="#FFFBEB" />
    </svg>
  );
}

// Progressive Terrarium Plant Visual based on Timer percentage (0% -> 100%)
function TerrariumPlant({ progress = 0 }) {
  // Clamp progress between 0 and 100
  const p = Math.min(100, Math.max(0, progress));

  // Determine Growth Stage
  // Stage 1: 0% - 20% (Tiny seed sprout)
  // Stage 2: 21% - 50% (Two leafy shoots)
  // Stage 3: 51% - 85% (Lush young plant with branch leaves)
  // Stage 4: 86% - 100% (Full blooming tree with magical flowers/sparkles)
  const isStage1 = p <= 20;
  const isStage2 = p > 20 && p <= 50;
  const isStage3 = p > 50 && p <= 85;
  const isStage4 = p > 85;

  return (
    <div className="plant-visual-stage" style={{ transform: `scale(${0.85 + (p / 100) * 0.35})` }}>
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="leafGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A16207" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>
          <filter id="bloomGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Plant Base / Roots */}
        <path d="M85 148Q90 152 95 148" stroke="#5C3514" strokeWidth="4" strokeLinecap="round" />

        {/* STAGE 1: Sprout (0 - 20%) */}
        {isStage1 && (
          <g className="stage-sprout">
            {/* Tiny Stem */}
            <path d="M90 148C88 135 91 125 90 115" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
            {/* Cute Smiling Seed Mound */}
            <circle cx="90" cy="142" r="10" fill="#92400E" />
            <circle cx="87" cy="141" r="1.5" fill="#FEF3C7" />
            <circle cx="93" cy="141" r="1.5" fill="#FEF3C7" />
            <path d="M88 145C89 147 91 147 92 145" stroke="#FEF3C7" strokeWidth="1.2" strokeLinecap="round" />
            {/* Left baby leaf */}
            <path d="M90 120C80 118 72 108 80 102C88 102 90 112 90 120Z" fill="url(#leafGradMain)" />
            {/* Right baby leaf */}
            <path d="M90 116C98 114 106 104 98 98C90 98 89 108 90 116Z" fill="#34D399" />
          </g>
        )}

        {/* STAGE 2: Growing Sapling (21 - 50%) */}
        {isStage2 && (
          <g className="stage-sapling">
            {/* Flexible Stem */}
            <path d="M90 148C86 130 94 110 88 88" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
            {/* Lower Left Leaf */}
            <path d="M88 126C74 124 64 112 74 104C84 104 88 116 88 126Z" fill="url(#leafGradMain)" />
            {/* Lower Right Leaf */}
            <path d="M91 120C104 118 114 106 104 98C94 98 90 110 91 120Z" fill="#10B981" />
            {/* Upper Left Leaf */}
            <path d="M88 102C76 96 70 82 82 78C90 80 89 92 88 102Z" fill="#34D399" />
            {/* Upper Right Leaf */}
            <path d="M90 98C102 92 108 78 96 74C88 76 89 88 90 98Z" fill="url(#leafGradMain)" />
            {/* Top Tender Bud */}
            <circle cx="88" cy="84" r="5.5" fill="#6EE7B7" />
          </g>
        )}

        {/* STAGE 3: Lush Plant with Buds (51 - 85%) */}
        {isStage3 && (
          <g className="stage-lush">
            {/* Strong Trunk */}
            <path d="M90 148C87 125 93 105 88 75" stroke="url(#trunkGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Side Branches */}
            <path d="M89 122C72 118 58 104 68 94C80 94 88 110 89 122Z" fill="url(#leafGradMain)" />
            <path d="M90 114C106 110 120 96 110 86C98 86 91 102 90 114Z" fill="#10B981" />
            {/* Mid Canopy */}
            <path d="M88 94C68 86 64 68 78 62C92 64 89 82 88 94Z" fill="#34D399" />
            <path d="M89 88C108 80 112 62 98 56C86 58 88 76 89 88Z" fill="url(#leafGradMain)" />
            {/* Golden Flower Buds */}
            <circle cx="78" cy="62" r="6" fill="#FBBF24" />
            <circle cx="98" cy="56" r="6" fill="#FBBF24" />
            {/* Top Foliage */}
            <circle cx="88" cy="68" r="14" fill="#10B981" />
            <circle cx="88" cy="64" r="10" fill="#34D399" />
          </g>
        )}

        {/* STAGE 4: Full Magnificent Blooming Tree (86 - 100%) */}
        {isStage4 && (
          <g className="stage-tree" filter="url(#bloomGlow)">
            {/* Sturdy Bonsai Trunk */}
            <path d="M90 148C84 125 96 100 88 65" stroke="url(#trunkGrad)" strokeWidth="9" strokeLinecap="round" />
            <path d="M89 110C108 95 125 90 130 84" stroke="url(#trunkGrad)" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M88 100C68 86 52 82 46 76" stroke="url(#trunkGrad)" strokeWidth="5.5" strokeLinecap="round" />

            {/* Cloud Foliage Left */}
            <ellipse cx="50" cy="74" rx="22" ry="16" fill="url(#leafGradMain)" />
            <circle cx="42" cy="70" r="12" fill="#34D399" />
            <circle cx="58" cy="72" r="10" fill="#10B981" />

            {/* Cloud Foliage Right */}
            <ellipse cx="126" cy="80" rx="22" ry="16" fill="url(#leafGradMain)" />
            <circle cx="134" cy="76" r="12" fill="#34D399" />
            <circle cx="118" cy="78" r="10" fill="#10B981" />

            {/* Lush Crown Foliage Center */}
            <ellipse cx="88" cy="54" rx="34" ry="24" fill="#059669" />
            <circle cx="74" cy="48" r="18" fill="#10B981" />
            <circle cx="102" cy="48" r="18" fill="#10B981" />
            <circle cx="88" cy="42" r="20" fill="#34D399" />
            <circle cx="88" cy="38" r="14" fill="#6EE7B7" opacity="0.8" />

            {/* Blossoming Flowers / Sparkles */}
            <circle cx="68" cy="42" r="5" fill="#F43F5E" />
            <circle cx="68" cy="42" r="2.5" fill="#FEF08A" />

            <circle cx="106" cy="44" r="5" fill="#F43F5E" />
            <circle cx="106" cy="44" r="2.5" fill="#FEF08A" />

            <circle cx="88" cy="26" r="6" fill="#FBBF24" />
            <circle cx="88" cy="26" r="3" fill="#FFFBEB" />

            <circle cx="48" cy="66" r="4.5" fill="#F43F5E" />
            <circle cx="48" cy="66" r="2" fill="#FEF08A" />

            <circle cx="128" cy="72" r="4.5" fill="#F43F5E" />
            <circle cx="128" cy="72" r="2" fill="#FEF08A" />

            {/* Fluttering Magical Leaf Particles */}
            <path d="M125 42C130 40 134 44 132 48C128 48 124 45 125 42Z" fill="#34D399" />
            <path d="M48 40C44 38 40 42 42 46C46 46 49 43 48 40Z" fill="#6EE7B7" />
          </g>
        )}
      </svg>
    </div>
  );
}

// Banner Backdrop Hills Illustration
function HeaderHillsIllustration() {
  return (
    <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 80C260 20 480 120 740 60C1000 0 1220 90 1440 40V220H0V80Z" fill="url(#hillGrad1)" opacity="0.45" />
      <path d="M0 110C320 60 560 140 860 80C1140 20 1320 100 1440 70V220H0V110Z" fill="url(#hillGrad2)" opacity="0.65" />
      <path d="M0 140C220 100 480 170 780 120C1080 70 1280 130 1440 110V220H0V140Z" fill="url(#hillGrad3)" opacity="0.85" />
      <defs>
        <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3D0" />
          <stop offset="1" stopColor="#34D399" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7B7" />
          <stop offset="1" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hillGrad3" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================================
// LOCAL STORAGE DATA REPOSITORY
// ============================================================================
const STORAGE_KEYS = {
  TASKS: 'tasknest_tasks_v1',
  THEME: 'tasknest_theme_v1',
  STATS: 'tasknest_focus_stats_v1',
  TIMER: 'tasknest_timer_state_v1'
};

const DEFAULT_SAMPLE_TASKS = [
  { id: '1', title: 'Study Machine Learning', priority: 'high', dueDate: 'Today', completed: false, createdAt: Date.now() - 3600000 },
  { id: '2', title: 'Practice Pandas', priority: 'med', dueDate: '16 Sep 2026', completed: false, createdAt: Date.now() - 7200000 },
  { id: '3', title: 'Build Portfolio Project', priority: 'low', dueDate: '18 Sep 2026', completed: false, createdAt: Date.now() - 10800000 },
  { id: '4', title: 'Morning Workout', priority: 'med', dueDate: '14 Sep 2026', completed: true, createdAt: Date.now() - 86400000 },
  { id: '5', title: 'Read a Book', priority: 'low', dueDate: '14 Sep 2026', completed: true, createdAt: Date.now() - 90000000 }
];

function loadStoredTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_SAMPLE_TASKS));
      return DEFAULT_SAMPLE_TASKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading tasks from localStorage:', e);
    return DEFAULT_SAMPLE_TASKS;
  }
}

function loadStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (e) {
    return 'light';
  }
}

function loadStoredStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return { sessionsCompleted: 3, totalMinutes: 75, recentHistory: [25, 25, 25] };
    return JSON.parse(raw);
  } catch (e) {
    return { sessionsCompleted: 3, totalMinutes: 75, recentHistory: [25, 25, 25] };
  }
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
function App() {
  // Navigation: 'tasks' | 'focus' (Strictly two pages)
  const [activePage, setActivePage] = useState('tasks');

  // Theme: 'light' | 'dark'
  const [theme, setTheme] = useState(loadStoredTheme);

  // Tasks State
  const [tasks, setTasks] = useState(loadStoredTasks);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Focus Stats State
  const [focusStats, setFocusStats] = useState(loadStoredStats);

  // Apply Theme to root document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {}
  }, [theme]);

  // Persist Tasks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  // Persist Focus Stats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(focusStats));
    } catch (e) {}
  }, [focusStats]);

  const toggleTheme = () => {
    playSoftTick();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Task Actions
  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    playSoftTick();
  };

  const handleToggleTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) playSoftTick();
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    playSoftTick();
  };

  const handleEditTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updatedData } : t));
    playSoftTick();
  };

  const handleSessionComplete = (sessionMinutes) => {
    playZenChime();
    setFocusStats(prev => {
      const newSessions = prev.sessionsCompleted + 1;
      const newTotal = prev.totalMinutes + sessionMinutes;
      const newHistory = [...(prev.recentHistory || []), sessionMinutes].slice(-7);
      return {
        sessionsCompleted: newSessions,
        totalMinutes: newTotal,
        recentHistory: newHistory
      };
    });
  };

  // Filtered Task Calculations
  const counts = useMemo(() => {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    return { total, active, completed };
  }, [tasks]);

  return (
    <div className="app-layout">
      {/* Desktop Left Sidebar Navigation */}
      <aside className="sidebar">
        <a href="#tasks" className="brand" onClick={(e) => { e.preventDefault(); setActivePage('tasks'); }}>
          <div className="brand-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1>TaskNest</h1>
            <p>Small Steps, Big Progress</p>
          </div>
        </a>

        <nav className="sidebar-nav">
          <button 
            className={`nav-link ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => { playSoftTick(); setActivePage('tasks'); }}
          >
            <span className="nav-icon">🌱</span>
            <span>Tasks</span>
            <span className="nav-badge">{counts.active}</span>
          </button>

          <button 
            className={`nav-link ${activePage === 'focus' ? 'active' : ''}`}
            onClick={() => { playSoftTick(); setActivePage('focus'); }}
          >
            <span className="nav-icon">🌿</span>
            <span>Focus</span>
          </button>
        </nav>

        {/* Sidebar Companion Mascot */}
        <div className="sidebar-mascot-card">
          <div className="mascot-speech-bubble">
            {activePage === 'tasks' ? '"A focused mind can do amazing things!"' : '"Good focus grows a better you!"'}
          </div>
          <MascotCat mood={activePage === 'tasks' ? 'happy' : 'celebrate'} size={88} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-wrapper">
        <div className="header-backdrop">
          <HeaderHillsIllustration />
        </div>

        <div className="content-container">
          {/* Top Bar with Dynamic Universal Greeting and Theme Toggle */}
          <header className="top-bar">
            <div className="greeting-block">
              <DynamicGreeting page={activePage} />
            </div>

            <div className="top-bar-actions">
              <DatePill />
              <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            </div>
          </header>

          {/* PAGE 1: TASKS */}
          {activePage === 'tasks' && (
            <TasksPage 
              tasks={tasks}
              filter={filter}
              counts={counts}
              onFilterChange={setFilter}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          )}

          {/* PAGE 2: FOCUS */}
          {activePage === 'focus' && (
            <FocusPage 
              focusStats={focusStats}
              onSessionComplete={handleSessionComplete}
            />
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${activePage === 'tasks' ? 'active' : ''}`}
          onClick={() => { playSoftTick(); setActivePage('tasks'); }}
        >
          <span style={{ fontSize: '20px' }}>🌱</span>
          <span>Tasks</span>
        </button>

        <button 
          className={`mobile-nav-item ${activePage === 'focus' ? 'active' : ''}`}
          onClick={() => { playSoftTick(); setActivePage('focus'); }}
        >
          <span style={{ fontSize: '20px' }}>🌿</span>
          <span>Focus</span>
        </button>
      </nav>
    </div>
  );
}

// ============================================================================
// DYNAMIC GREETING COMPONENT
// ============================================================================
function DynamicGreeting({ page }) {
  const [greetingInfo, setGreetingInfo] = useState({ title: 'Good Morning! 👋', subtitle: "Let's make today productive." });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let title = "Good Morning! 👋";
      if (hour >= 12 && hour < 17) {
        title = "Good Afternoon! ☀️";
      } else if (hour >= 17 && hour < 21) {
        title = "Good Evening! 🌙";
      } else if (hour >= 21 || hour < 5) {
        title = "Good Night! 🌙";
      }
      setGreetingInfo({
        title,
        subtitle: "Let's make today productive."
      });
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  if (page === 'focus') {
    return (
      <>
        <h2>Focus Mode 🌿</h2>
        <p>Take a deep breath. Stay focused. 🌱</p>
      </>
    );
  }

  return (
    <>
      <h2>{greetingInfo.title}</h2>
      <p>{greetingInfo.subtitle}</p>
    </>
  );
}

// Date Pill with real formatted date
function DatePill() {
  const dateStr = useMemo(() => {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return now.toLocaleDateString('en-GB', options);
  }, []);

  return (
    <div className="date-pill">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <span>{dateStr}</span>
    </div>
  );
}

// Light/Dark Theme Toggle Button
function ThemeToggleButton({ theme, onToggle }) {
  return (
    <button 
      className="theme-toggle-btn" 
      onClick={onToggle}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle Theme"
    >
      <div className="theme-icons-bg">
        <span>☀️</span>
        <span>🌙</span>
      </div>
      <div className="toggle-slider">
        {theme === 'light' ? '☀️' : '🌙'}
      </div>
    </button>
  );
}

// ============================================================================
// PAGE 1: TASKS COMPONENTS
// ============================================================================
function TasksPage({ tasks, filter, counts, onFilterChange, onAddTask, onToggleTask, onDeleteTask, onEditTask }) {
  // Separate tasks into active and completed
  const activeTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);

  // Overall completion percentage
  const progressPercent = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;

  return (
    <div className="tasks-page-view">
      {/* Task Input Creation Bar */}
      <TaskInput onAddTask={onAddTask} />

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => { playSoftTick(); onFilterChange('all'); }}
        >
          <span>All</span>
          <span className="filter-count">({counts.total})</span>
        </button>
        <button 
          className={`filter-tab-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => { playSoftTick(); onFilterChange('active'); }}
        >
          <span>Active</span>
          <span className="filter-count">({counts.active})</span>
        </button>
        <button 
          className={`filter-tab-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => { playSoftTick(); onFilterChange('completed'); }}
        >
          <span>Completed</span>
          <span className="filter-count">({counts.completed})</span>
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="tasks-grid">
        {/* Left Column: Active Tasks (Shown when filter is 'all' or 'active') */}
        {(filter === 'all' || filter === 'active') && (
          <div className="tasks-column">
            <div className="column-header">
              <h3 className="column-title">
                <span>Active Tasks</span>
                <span className="column-badge badge-active">{counts.active}</span>
              </h3>
            </div>

            {activeTasks.length === 0 ? (
              <div className="empty-state-card">
                <div className="empty-state-art">
                  <MascotCat mood={counts.completed > 0 ? "celebrate" : "happy"} size={70} />
                </div>
                <h4 className="empty-state-title">
                  {counts.completed > 0 ? "Everything is done! 🌳" : "No tasks yet 🌱"}
                </h4>
                <p className="empty-state-subtitle">
                  {counts.completed > 0 ? "Great work today." : "Let's grow something today."}
                </p>
              </div>
            ) : (
              <div className="task-card-list">
                {activeTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onToggle={onToggleTask}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right Column: Completed Tasks & Progress Card (Shown when filter is 'all' or 'completed') */}
        <div className="tasks-column">
          {(filter === 'all' || filter === 'completed') && (
            <>
              <div className="column-header">
                <h3 className="column-title">
                  <span>Completed Tasks</span>
                  <span className="column-badge badge-completed">{counts.completed}</span>
                </h3>
              </div>

              {completedTasks.length === 0 ? (
                <div className="empty-state-card" style={{ padding: '24px 16px' }}>
                  <p className="empty-state-subtitle">No completed tasks yet. Finish a task to see it grow here! 🌱</p>
                </div>
              ) : (
                <div className="task-card-list">
                  {completedTasks.map(task => (
                    <TaskCard 
                      key={task.id}
                      task={task}
                      onToggle={onToggleTask}
                      onDelete={onDeleteTask}
                      onEdit={onEditTask}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Today's Progress Card */}
          <div className="progress-card">
            <div className="progress-info-block">
              <h4 className="progress-card-title">Today's Progress</h4>
              <div className="progress-stats-row">
                <span>{counts.completed} / {counts.total} completed</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{progressPercent}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            <div className="progress-plant-illustration">
              <div className="progress-plant-svg">
                {progressPercent === 100 ? (
                  <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                    <circle cx="30" cy="24" r="18" fill="#10B981" />
                    <circle cx="24" cy="20" r="10" fill="#34D399" />
                    <rect x="27" y="36" width="6" height="14" rx="2" fill="#78350F" />
                    <circle cx="30" cy="18" r="4" fill="#F43F5E" />
                    <circle cx="22" cy="26" r="3" fill="#FBBF24" />
                    <circle cx="38" cy="24" r="3" fill="#FBBF24" />
                  </svg>
                ) : progressPercent >= 50 ? (
                  <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                    <path d="M30 48V28" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                    <path d="M30 36C22 34 16 26 24 20C32 20 30 30 30 36Z" fill="#34D399" />
                    <path d="M30 30C38 28 44 20 36 14C28 14 30 24 30 30Z" fill="#10B981" />
                    <circle cx="30" cy="22" r="3.5" fill="#FBBF24" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                    <ellipse cx="30" cy="48" rx="14" ry="5" fill="#855328" />
                    <path d="M30 48V36" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                    <path d="M30 38C24 36 20 30 26 26C31 26 30 32 30 38Z" fill="#34D399" />
                    <path d="M30 36C36 34 40 28 34 24C29 24 30 30 30 36Z" fill="#10B981" />
                  </svg>
                )}
              </div>
              <span className="progress-plant-caption">
                {progressPercent === 100 
                  ? "Everything is done! 🌳" 
                  : progressPercent >= 50 
                  ? "More than halfway! 🌿" 
                  : "Keep going! 🌱"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="quote-banner">
        <span className="quote-leaf-icon">🌱</span>
        <span>"Discipline today creates the freedom tomorrow."</span>
      </div>
    </div>
  );
}

// Task Creation Input Component
function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('med'); // 'low' | 'med' | 'high'
  const [dueDate, setDueDate] = useState('');
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const dateInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      alert('Please enter a task title first! 🌱');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: cleanTitle,
      priority,
      dueDate: dueDate || 'Today',
      completed: false,
      createdAt: Date.now()
    };

    onAddTask(newTask);
    setTitle('');
    setDueDate('');
    setShowPriorityMenu(false);
  };

  const handleDateChange = (e) => {
    if (e.target.value) {
      const parts = e.target.value.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        setDueDate(formatted);
      }
    }
  };

  return (
    <form className="task-creator-card" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="task-input-field"
        placeholder="What do you want to do today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="creator-controls">
        {/* Date Selector Button */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button" 
            className="creator-btn-control"
            onClick={() => {
              if (dateInputRef.current) {
                if (dateInputRef.current.showPicker) {
                  dateInputRef.current.showPicker();
                } else {
                  dateInputRef.current.focus();
                }
              }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{dueDate || 'Due Date'}</span>
          </button>
          <input 
            type="date" 
            ref={dateInputRef} 
            className="date-input-hidden" 
            onChange={handleDateChange} 
          />
        </div>

        {/* Priority Selector Menu */}
        <div className="priority-selector-wrap">
          <button 
            type="button" 
            className="creator-btn-control"
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
          >
            <span style={{ fontSize: '14px' }}>
              {priority === 'high' ? '🚩' : priority === 'med' ? '🟡' : '🟢'}
            </span>
            <span style={{ textTransform: 'capitalize' }}>{priority === 'med' ? 'Medium' : priority}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {showPriorityMenu && (
            <div className="priority-dropdown-menu">
              <button 
                type="button" 
                className="priority-option-btn priority-high" 
                onClick={() => { setPriority('high'); setShowPriorityMenu(false); }}
              >
                <span>🚩 High Priority</span>
              </button>
              <button 
                type="button" 
                className="priority-option-btn priority-med" 
                onClick={() => { setPriority('med'); setShowPriorityMenu(false); }}
              >
                <span>🟡 Medium Priority</span>
              </button>
              <button 
                type="button" 
                className="priority-option-btn priority-low" 
                onClick={() => { setPriority('low'); setShowPriorityMenu(false); }}
              >
                <span>🟢 Low Priority</span>
              </button>
            </div>
          )}
        </div>

        {/* Add Task Primary Button */}
        <button type="submit" className="add-task-btn">
          <span>Add Task</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </form>
  );
}

// Single Task Card with Checkbox, Priority Badge, Due Date, and Edit/Delete Actions
function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || 'Today');

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      priority: editPriority,
      dueDate: editDueDate
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card">
        <div className="task-edit-box">
          <input 
            type="text" 
            className="task-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <div className="task-edit-footer">
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={editPriority} 
                onChange={(e) => setEditPriority(e.target.value)}
                className="creator-btn-control"
              >
                <option value="low">Low Priority</option>
                <option value="med">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input 
                type="text" 
                placeholder="Due Date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="creator-btn-control"
                style={{ width: '110px' }}
              />
            </div>
            <div className="edit-btn-group">
              <button className="edit-save-btn" onClick={handleSaveEdit}>Save</button>
              <button className="edit-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      {/* Animated Checkbox */}
      <button 
        className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>

      {/* Task Content */}
      <div className="task-content-block">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          {task.dueDate && (
            <span className="task-date-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
              </svg>
              <span>{task.dueDate}</span>
            </span>
          )}

          <span className={`priority-badge-pill priority-${task.priority}`}>
            {task.priority === 'med' ? 'Medium' : task.priority}
          </span>
        </div>
      </div>

      {/* Action Buttons: Edit and Delete */}
      <div className="task-actions">
        <button 
          className="task-action-btn"
          onClick={() => setIsEditing(true)}
          title="Edit Task"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </button>

        <button 
          className="task-action-btn delete"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 2: FOCUS MODE COMPONENTS
// ============================================================================
function FocusPage({ focusStats, onSessionComplete }) {
  // Preset options in seconds: 25 min (1500s), 5 min (300s), 50 min (3000s)
  const [duration, setDuration] = useState(1500);
  const [selectedPreset, setSelectedPreset] = useState('25'); // '25' | '5' | '50' | 'custom'
  const [remainingSeconds, setRemainingSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // High precision target timestamp ref
  const targetEndTimeRef = useRef(null);

  // Timer Tick & Real-time sync with Date.now() to guarantee background accuracy
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      // Calculate target end timestamp
      if (!targetEndTimeRef.current) {
        targetEndTimeRef.current = Date.now() + remainingSeconds * 1000;
      }

      interval = setInterval(() => {
        const now = Date.now();
        const diffMs = targetEndTimeRef.current - now;
        const nextSec = Math.max(0, Math.ceil(diffMs / 1000));

        setRemainingSeconds(nextSec);

        if (nextSec <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          targetEndTimeRef.current = null;
          setShowCompletionModal(true);
          const sessionMins = Math.round(duration / 60);
          onSessionComplete(sessionMins);
        }
      }, 250); // fast polling for ultra-smooth UI updates
    } else {
      targetEndTimeRef.current = null;
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, duration, onSessionComplete]);

  // Resync immediately when tab becomes visible after being backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning && targetEndTimeRef.current) {
        const now = Date.now();
        const diffMs = targetEndTimeRef.current - now;
        const nextSec = Math.max(0, Math.ceil(diffMs / 1000));
        setRemainingSeconds(nextSec);

        if (nextSec <= 0) {
          setIsRunning(false);
          targetEndTimeRef.current = null;
          setShowCompletionModal(true);
          const sessionMins = Math.round(duration / 60);
          onSessionComplete(sessionMins);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, duration, onSessionComplete]);

  // Timer Controls
  const handleStart = () => {
    playSoftTick();
    targetEndTimeRef.current = Date.now() + remainingSeconds * 1000;
    setIsRunning(true);
  };

  const handlePause = () => {
    playSoftTick();
    setIsRunning(false);
    targetEndTimeRef.current = null;
  };

  const handleResume = () => {
    playSoftTick();
    targetEndTimeRef.current = Date.now() + remainingSeconds * 1000;
    setIsRunning(true);
  };

  const handleReset = () => {
    playSoftTick();
    setIsRunning(false);
    targetEndTimeRef.current = null;
    setRemainingSeconds(duration);
  };

  const handleSelectPreset = (minutes, label) => {
    playSoftTick();
    setIsRunning(false);
    targetEndTimeRef.current = null;
    const secs = minutes * 60;
    setDuration(secs);
    setRemainingSeconds(secs);
    setSelectedPreset(label);
  };

  const handleApplyCustom = (mins, secs) => {
    const totalSecs = mins * 60 + secs;
    if (totalSecs <= 0) return;
    setIsRunning(false);
    targetEndTimeRef.current = null;
    setDuration(totalSecs);
    setRemainingSeconds(totalSecs);
    setSelectedPreset('custom');
    setShowCustomModal(false);
  };

  // Format digital countdown MM:SS (or HH:MM:SS if >= 1 hour)
  const formattedTime = useMemo(() => {
    const hours = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = remainingSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  }, [remainingSeconds]);

  // Elapsed Progress calculation (0% to 100%)
  const progressPercent = duration > 0 ? ((duration - remainingSeconds) / duration) * 100 : 0;

  // Format Total Focus Time (e.g. 1h 15m)
  const formattedTotalTime = useMemo(() => {
    const totalMins = focusStats.totalMinutes || 0;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m}m`;
  }, [focusStats.totalMinutes]);

  return (
    <div className="focus-page-layout">
      {/* Central Terrarium Dome Visual & Timer Controls */}
      <div className="terrarium-focus-container">
        {/* The Glass Dome with Growing Plant */}
        <div className="terrarium-dome">
          <div className="terrarium-shine"></div>
          <div className="terrarium-water-line"></div>
          <div className="terrarium-soil"></div>

          {/* Plant SVG grows in real-time */}
          <TerrariumPlant progress={progressPercent} />
        </div>

        {/* Digital Countdown Timer Overlay */}
        <div className="terrarium-timer-overlay">
          <div className="timer-countdown-digits">{formattedTime}</div>
          <div className="timer-stage-label">
            {selectedPreset === '5' ? 'Break Time ☕' : 'Focus Time 🌱'}
          </div>
        </div>

        {/* Start / Pause / Resume / Reset Controls */}
        <div className="timer-action-buttons">
          {!isRunning ? (
            remainingSeconds < duration ? (
              <button className="timer-btn-primary" onClick={handleResume}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Resume</span>
              </button>
            ) : (
              <button className="timer-btn-primary" onClick={handleStart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Start</span>
              </button>
            )
          ) : (
            <button className="timer-btn-primary" onClick={handlePause} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              <span>Pause</span>
            </button>
          )}

          <button className="timer-btn-secondary" onClick={handleReset}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            <span>Reset</span>
          </button>
        </div>

        {/* Preset Selector Buttons */}
        <div className="presets-container">
          <button 
            className={`preset-pill-btn ${selectedPreset === '25' ? 'active' : ''}`}
            onClick={() => handleSelectPreset(25, '25')}
          >
            <span className="preset-title">25 min</span>
            <span className="preset-subtitle">Focus</span>
          </button>

          <button 
            className={`preset-pill-btn ${selectedPreset === '5' ? 'active' : ''}`}
            onClick={() => handleSelectPreset(5, '5')}
          >
            <span className="preset-title">5 min</span>
            <span className="preset-subtitle">Break</span>
          </button>

          <button 
            className={`preset-pill-btn ${selectedPreset === '50' ? 'active' : ''}`}
            onClick={() => handleSelectPreset(50, '50')}
          >
            <span className="preset-title">50 min</span>
            <span className="preset-subtitle">Focus</span>
          </button>

          <button 
            className={`preset-pill-btn ${selectedPreset === 'custom' ? 'active' : ''}`}
            onClick={() => { playSoftTick(); setShowCustomModal(true); }}
          >
            <span className="preset-title">Custom</span>
            <span className="preset-subtitle">Set time</span>
          </button>
        </div>
      </div>

      {/* Focus Stats & Companion Column */}
      <div className="focus-stats-column">
        {/* Focus Sessions Stats Card */}
        <div className="focus-stat-card">
          <div className="focus-stat-header">
            <h3 className="focus-stat-title">Focus Sessions</h3>
            <span style={{ fontSize: '20px' }}>📊</span>
          </div>

          <div className="stat-metric-row">
            <span className="stat-big-number">{focusStats.sessionsCompleted}</span>
            <span className="stat-metric-label">Completed Today</span>
          </div>

          {/* Mini Bar Chart */}
          <div className="stat-mini-chart">
            {[20, 35, 25, 45, 30, 50, 40].map((h, i) => (
              <div 
                key={i} 
                className={`chart-bar ${i < focusStats.sessionsCompleted ? 'filled' : ''}`} 
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>

          <div className="focus-quote-box">
            "Focus on the process, not just the result."
          </div>

          <div className="total-time-row">
            <span className="stat-metric-label">Total Focus Time</span>
            <span className="total-time-val">{formattedTotalTime}</span>
          </div>
        </div>

        {/* Companion Card */}
        <div className="focus-companion-card">
          <MascotCat mood={isRunning ? "sleepy" : "happy"} size={72} />
          <div className="focus-companion-bubble">
            {isRunning 
              ? "Shh... great things grow in silent focus. 🌱" 
              : '"Small steps make big progress."'}
          </div>
        </div>
      </div>

      {/* Custom Timer Input Modal */}
      {showCustomModal && (
        <CustomTimerModal 
          initialMinutes={Math.floor(duration / 60)}
          initialSeconds={duration % 60}
          onApply={handleApplyCustom}
          onClose={() => setShowCustomModal(false)}
        />
      )}

      {/* Session Completion Celebration Modal */}
      {showCompletionModal && (
        <div className="modal-overlay" onClick={() => setShowCompletionModal(false)}>
          <div className="modal-dialog celebration-modal" onClick={(e) => e.stopPropagation()}>
            <div className="celebration-icon-art">
              <MascotCat mood="celebrate" size={96} />
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
              Focus session complete! 🌳
            </h3>
            <p className="modal-subtitle" style={{ fontSize: '1rem', marginTop: '6px' }}>
              You've nurtured your focus and grown your plant to full bloom!
            </p>
            <div style={{ margin: '20px 0', padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Session logged</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                +{Math.round(duration / 60)} Minutes of Pure Focus
              </div>
            </div>
            <button 
              className="timer-btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setShowCompletionModal(false);
                handleReset();
              }}
            >
              Start Another Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Custom Timer Modal with minutes and seconds input validation
function CustomTimerModal({ initialMinutes, initialSeconds, onApply, onClose }) {
  const [minutes, setMinutes] = useState(initialMinutes || 25);
  const [seconds, setSeconds] = useState(initialSeconds || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;

    if (m === 0 && s === 0) {
      alert('Please enter at least 1 second!');
      return;
    }
    if (m < 0 || m > 300 || s < 0 || s > 59) {
      alert('Please enter valid minutes (1-300) and seconds (0-59)!');
      return;
    }
    onApply(m, s);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Custom Focus Time</h3>
        <p className="modal-subtitle">Choose your ideal focus or break duration.</p>

        <form onSubmit={handleSubmit}>
          <div className="custom-inputs-row">
            <div className="input-label-col">
              <span>Minutes</span>
              <input 
                type="number" 
                min="0" 
                max="300" 
                className="modal-number-input"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                autoFocus
              />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, alignSelf: 'center', marginTop: '18px' }}>:</span>
            <div className="input-label-col">
              <span>Seconds</span>
              <input 
                type="number" 
                min="0" 
                max="59" 
                className="modal-number-input"
                value={seconds}
                onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              />
            </div>
          </div>

          <div className="modal-btn-row">
            <button type="button" className="edit-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-task-btn">
              Apply Timer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Mount the React Application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
