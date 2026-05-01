// Helper to safely format YYYY-MM-DD in local time (Ignores UTC shift)
function getLocalDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateStats(transactions, gigs) {
  const totalEarnings = transactions
    .filter((t) => t.type === 'earning')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalEarnings - totalExpenses;

  // ── Per-gig breakdown ──
  const gigStats = gigs.map((gig) => {
    const earned = transactions
      .filter((t) => t.gigId === gig.id && t.type === 'earning')
      .reduce((sum, t) => sum + t.amount, 0);

    const spent = transactions
      .filter((t) => t.gigId === gig.id && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const ratio = earned > 0 ? Math.round((spent / earned) * 100) : 0;

    return {
      ...gig,
      earned,
      spent,
      net: earned - spent,
      ratio,
    };
  });

  // ── Current week bar chart data ──
  const today = new Date();
  const todayStr = getLocalDateString(today);

  // Safely find local Monday without UTC shifting
  const monday = new Date(today);
  const dayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(today.getDate() - daysToMonday);

  const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekData = WEEK_LABELS.map((label, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dateStr = getLocalDateString(day);

    const amount = transactions
      .filter((t) => t.date === dateStr && t.type === 'earning')
      .reduce((sum, t) => sum + t.amount, 0);

    return { day: label, amount, isToday: dateStr === todayStr };
  });

  // ── Donut chart data ──
  const donutData = [
    { name: 'Earnings', value: totalEarnings, color: '#22C55E' },
    { name: 'Expenses', value: totalExpenses, color: '#EF4444' },
    { name: 'Gap', value: Math.max(1, netProfit * 0.03), color: 'transparent' },
  ];

  return {
    totalEarnings,
    totalExpenses,
    netProfit,
    gigStats,
    weekData,
    donutData,
  };
}

export function formatRupee(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

// FIX: Replaced toISOString() so new transactions are saved in the correct local day
export function todayISO() {
  return getLocalDateString(new Date());
}