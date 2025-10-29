// 'use client'
// import { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';

// interface DimensionStat {
//   dimension: string;
//   avg_level: number;
//   count: number;
// }

// interface RecentSession {
//   id: string;
//   created_at: string;
//   current_dimension: string;
// }

// interface Score {
//   id: number;
//   session_id: string;
//   dimension: string;
//   level: number;
//   rationale: string;
//   top_gaps: string[];
//   next_quarter_actions: string[];
//   scored_at: string;
//   session_created_at: string;
// }

// interface AnalyticsData {
//   total_sessions: number;
//   total_assessments: number;
//   dimension_stats: DimensionStat[];
//   recent_sessions: RecentSession[];
// }

// const DIMENSION_LABELS: Record<string, string> = {
//   "strategy": "Strategy",
//   "data-analytics": "Data & Analytics",
//   "automation": "Automation",
//   "cybersecurity": "Cybersecurity",
//   "workforce": "Workforce"
// };

// export default function AnalyticsDashboard() {
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
//   const [scores, setScores] = useState<Score[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'overview' | 'scores'>('overview');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
        
//         // Fetch overview data
//         const overviewRes = await fetch('http://localhost:8000/api/analytics/overview');
//         const overviewData = await overviewRes.json();
//         setAnalytics(overviewData);

//         // Fetch all scores
//         const scoresRes = await fetch('http://localhost:8000/api/analytics/scores');
//         const scoresData = await scoresRes.json();
//         setScores(scoresData.scores);

//         toast.success('Analytics loaded successfully');
//       } catch (err) {
//         toast.error('Failed to load analytics data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const getLevelColor = (level: number) => {
//     const colors = ['bg-gray-500', 'bg-yellow-500', 'bg-orange-500', 'bg-green-500', 'bg-blue-500'];
//     return colors[level] || 'bg-gray-500';
//   };

//   const getLevelEmoji = (level: number) => {
//     const emojis = ['', '🟡', '🟠', '🟢', '🔵'];
//     return emojis[level] || '';
//   };

//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-slate-900">
//         <div className="text-center">
//           <div className="mb-4 flex justify-center gap-2">
//             <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" />
//             <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.1s' }} />
//             <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.2s' }} />
//           </div>
//           <p className="text-slate-400">Loading analytics...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster position="top-right" />
//       <div className="min-h-screen bg-slate-900 p-6">
//         <div className="mx-auto max-w-7xl">
//           {/* Header */}
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
//             <p className="text-slate-400">Overview of all digital maturity assessments</p>
//           </div>

//           {/* Tab Navigation */}
//           <div className="mb-6 flex gap-2">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'overview'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
//               }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('scores')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'scores'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
//               }`}
//             >
//               All Scores
//             </button>
//           </div>

//           {/* Overview Tab */}
//           {activeTab === 'overview' && analytics && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-400 mb-1">Total Sessions</p>
//                       <p className="text-3xl font-bold text-white">{analytics.total_sessions}</p>
//                     </div>
//                     <div className="rounded-full bg-blue-500/20 p-3">
//                       <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-400 mb-1">Total Assessments</p>
//                       <p className="text-3xl font-bold text-white">{analytics.total_assessments}</p>
//                     </div>
//                     <div className="rounded-full bg-green-500/20 p-3">
//                       <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dimension Stats */}
//               <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">Average Maturity by Dimension</h2>
//                 <div className="space-y-4">
//                   {analytics.dimension_stats.map((stat) => (
//                     <div key={stat.dimension}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-slate-200">
//                           {DIMENSION_LABELS[stat.dimension] || stat.dimension}
//                         </span>
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-slate-400">{stat.count} assessments</span>
//                           <span className="text-sm font-bold text-white">
//                             {stat.avg_level.toFixed(1)}/4.0
//                           </span>
//                         </div>
//                       </div>
//                       <div className="h-2 rounded-full bg-slate-700">
//                         <div
//                           className={`h-full rounded-full transition-all ${getLevelColor(Math.round(stat.avg_level))}`}
//                           style={{ width: `${(stat.avg_level / 4) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Recent Sessions */}
//               <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">Recent Sessions</h2>
//                 <div className="space-y-3">
//                   {analytics.recent_sessions.length === 0 ? (
//                     <p className="text-sm text-slate-400">No sessions yet</p>
//                   ) : (
//                     analytics.recent_sessions.map((session) => (
//                       <div key={session.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-700/50 p-4">
//                         <div>
//                           <p className="text-sm font-medium text-white">Session {session.id.slice(0, 8)}...</p>
//                           <p className="text-xs text-slate-400 mt-1">{formatDate(session.created_at)}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-xs text-slate-400">Current Dimension</p>
//                           <p className="text-sm font-medium text-blue-400">
//                             {DIMENSION_LABELS[session.current_dimension] || session.current_dimension}
//                           </p>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Scores Tab */}
//           {activeTab === 'scores' && (
//             <div className="space-y-4">
//               {scores.length === 0 ? (
//                 <div className="rounded-xl border border-slate-700 bg-slate-800 p-12 text-center">
//                   <p className="text-slate-400">No assessment scores yet</p>
//                 </div>
//               ) : (
//                 scores.map((score) => (
//                   <div key={score.id} className="rounded-xl border border-slate-700 bg-slate-800 p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                           {DIMENSION_LABELS[score.dimension] || score.dimension}
//                           <span className="text-2xl">{getLevelEmoji(score.level)}</span>
//                         </h3>
//                         <p className="text-xs text-slate-400 mt-1">
//                           Session: {score.session_id.slice(0, 8)}... • {formatDate(score.scored_at)}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <div className={`inline-flex items-center gap-2 rounded-lg ${getLevelColor(score.level)} px-3 py-1`}>
//                           <span className="text-sm font-bold text-white">Level {score.level}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="text-sm font-semibold text-slate-300 mb-2">Analysis</h4>
//                         <p className="text-sm text-slate-400 leading-relaxed">{score.rationale}</p>
//                       </div>

//                       <div>
//                         <h4 className="text-sm font-semibold text-slate-300 mb-2">Top Gaps</h4>
//                         <ul className="space-y-1">
//                           {score.top_gaps.map((gap, idx) => (
//                             <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
//                               <span className="text-orange-400 mt-0.5">⚠</span>
//                               <span>{gap}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="text-sm font-semibold text-slate-300 mb-2">Next Quarter Actions</h4>
//                         <ul className="space-y-1">
//                           {score.next_quarter_actions.map((action, idx) => (
//                             <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
//                               <span className="text-green-400 mt-0.5">→</span>
//                               <span>{action}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DimensionStat {
  dimension: string;
  avg_level: number;
  count: number;
}

interface RecentSession {
  id: string;
  created_at: string;
  current_dimension: string;
}

interface Score {
  id: number;
  session_id: string;
  dimension: string;
  level: number;
  rationale: string;
  top_gaps: string[];
  next_quarter_actions: string[];
  scored_at: string;
  session_created_at: string;
}

interface AnalyticsData {
  total_sessions: number;
  total_assessments: number;
  dimension_stats: DimensionStat[];
  recent_sessions: RecentSession[];
}

const DIMENSION_LABELS: Record<string, string> = {
  "strategy": "Strategy",
  "data-analytics": "Data & Analytics",
  "automation": "Automation",
  "cybersecurity": "Cybersecurity",
  "workforce": "Workforce"
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'scores'>('overview');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const overviewRes = await fetch('http://localhost:8000/api/analytics/overview');
        const overviewData = await overviewRes.json();
        setAnalytics(overviewData);

        const scoresRes = await fetch('http://localhost:8000/api/analytics/scores');
        const scoresData = await scoresRes.json();
        setScores(scoresData.scores);

        toast.success('Analytics loaded successfully');
      } catch (err) {
        toast.error('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getLevelColor = (level: number) => {
    const colors = ['bg-gray-500', 'bg-yellow-500', 'bg-orange-500', 'bg-green-500', 'bg-blue-500'];
    return colors[level] || 'bg-gray-500';
  };

  const getLevelEmoji = (level: number) => {
    const emojis = ['', '🟡', '🟠', '🟢', '🔵'];
    return emojis[level] || '';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Prepare spider chart data
  const getSpiderChartData = () => {
    if (!analytics) return [];
    return analytics.dimension_stats.map(stat => ({
      dimension: DIMENSION_LABELS[stat.dimension] || stat.dimension,
      value: stat.avg_level,
      fullMark: 4
    }));
  };

  // Prepare bar chart data
  const getBarChartData = () => {
    if (!analytics) return [];
    return analytics.dimension_stats.map(stat => ({
      name: DIMENSION_LABELS[stat.dimension] || stat.dimension,
      'Average Level': stat.avg_level,
      'Assessments': stat.count
    }));
  };

  // Prepare pie chart data for level distribution
  const getLevelDistribution = () => {
    const distribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    scores.forEach(score => {
      distribution[score.level] = (distribution[score.level] || 0) + 1;
    });
    return Object.entries(distribution)
      .filter(([_, count]) => count > 0)
      .map(([level, count]) => ({
        name: `Level ${level}`,
        value: count
      }));
  };

  // Prepare timeline data
  const getTimelineData = () => {
    const grouped: Record<string, number> = {};
    scores.forEach(score => {
      const date = new Date(score.scored_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return Object.entries(grouped).map(([date, count]) => ({
      date,
      assessments: count
    })).slice(-10); // Last 10 data points
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="mb-4 flex justify-center gap-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" />
            <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.1s' }} />
            <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-slate-400">Overview of all digital maturity assessments</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('scores')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'scores'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Scores
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && analytics && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Total Sessions</p>
                      <p className="text-3xl font-bold text-white">{analytics.total_sessions}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Total Assessments</p>
                      <p className="text-3xl font-bold text-white">{analytics.total_assessments}</p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spider Chart and Bar Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Spider/Radar Chart */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Maturity Radar</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={getSpiderChartData()}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 4]} tick={{ fill: '#94a3b8' }} />
                      <Radar name="Average Level" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Dimension Comparison</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getBarChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                      <YAxis tick={{ fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                      <Bar dataKey="Average Level" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Level Distribution Pie Chart and Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Level Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getLevelDistribution()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getLevelDistribution().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Timeline Chart */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Assessment Timeline</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getTimelineData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="assessments" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Dimension Stats with Progress Bars */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Average Maturity by Dimension</h2>
                <div className="space-y-4">
                  {analytics.dimension_stats.map((stat) => (
                    <div key={stat.dimension}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-200">
                          {DIMENSION_LABELS[stat.dimension] || stat.dimension}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">{stat.count} assessments</span>
                          <span className="text-sm font-bold text-white">
                            {stat.avg_level.toFixed(1)}/4.0
                          </span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-slate-700">
                        <div
                          className={`h-full rounded-full transition-all ${getLevelColor(Math.round(stat.avg_level))}`}
                          style={{ width: `${(stat.avg_level / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Sessions</h2>
                <div className="space-y-3">
                  {analytics.recent_sessions.length === 0 ? (
                    <p className="text-sm text-slate-400">No sessions yet</p>
                  ) : (
                    analytics.recent_sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-700/50 p-4">
                        <div>
                          <p className="text-sm font-medium text-white">Session {session.id.slice(0, 8)}...</p>
                          <p className="text-xs text-slate-400 mt-1">{formatDate(session.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Current Dimension</p>
                          <p className="text-sm font-medium text-blue-400">
                            {DIMENSION_LABELS[session.current_dimension] || session.current_dimension}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Scores Tab */}
          {activeTab === 'scores' && (
            <div className="space-y-4">
              {scores.length === 0 ? (
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-12 text-center">
                  <p className="text-slate-400">No assessment scores yet</p>
                </div>
              ) : (
                scores.map((score) => (
                  <div key={score.id} className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {DIMENSION_LABELS[score.dimension] || score.dimension}
                          <span className="text-2xl">{getLevelEmoji(score.level)}</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Session: {score.session_id.slice(0, 8)}... • {formatDate(score.scored_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 rounded-lg ${getLevelColor(score.level)} px-3 py-1`}>
                          <span className="text-sm font-bold text-white">Level {score.level}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Analysis</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{score.rationale}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Top Gaps</h4>
                        <ul className="space-y-1">
                          {score.top_gaps.map((gap, idx) => (
                            <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                              <span className="text-orange-400 mt-0.5">⚠</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Next Quarter Actions</h4>
                        <ul className="space-y-1">
                          {score.next_quarter_actions.map((action, idx) => (
                            <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">→</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}