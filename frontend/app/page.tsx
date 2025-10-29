// // 'use client'

// // import { useState } from 'react';

// // const DIMENSIONS = ["Strategy", "Data & Analytics", "Automation", "Cybersecurity", "Workforce"];

// // const MATURITY_LEVELS = {
// //   "Strategy": [
// //     { level: 1, title: "Level 1", desc: "Digital is ad-hoc, no strategy." },
// //     { level: 2, title: "Level 2", desc: "Digital is aligned with operations but not enterprise-wide." },
// //     { level: 3, title: "Level 3", desc: "Clear digital roadmap, partial execution." },
// //     { level: 4, title: "Level 4", desc: "Fully aligned with business goals, measurable outcomes." }
// //   ],
// //   "Data & Analytics": [
// //     { level: 1, title: "Level 1", desc: "Data is siloed, no governance." },
// //     { level: 2, title: "Level 2", desc: "Some data platforms exist, limited adoption." },
// //     { level: 3, title: "Level 3", desc: "Centralized data platform with quality standards." },
// //     { level: 4, title: "Level 4", desc: "Data-driven culture with self-service analytics." }
// //   ],
// //   "Automation": [
// //     { level: 1, title: "Level 1", desc: "Manual processes, no automation." },
// //     { level: 2, title: "Level 2", desc: "Pilot automation projects in pockets." },
// //     { level: 3, title: "Level 3", desc: "Automation CoE with standardized tools." },
// //     { level: 4, title: "Level 4", desc: "Enterprise automation with AI/ML integration." }
// //   ],
// //   "Cybersecurity": [
// //     { level: 1, title: "Level 1", desc: "Basic security, reactive approach." },
// //     { level: 2, title: "Level 2", desc: "Security policies exist but inconsistent." },
// //     { level: 3, title: "Level 3", desc: "Proactive security with monitoring." },
// //     { level: 4, title: "Level 4", desc: "Zero Trust, continuous compliance, drills." }
// //   ],
// //   "Workforce": [
// //     { level: 1, title: "Level 1", desc: "No digital skills program." },
// //     { level: 2, title: "Level 2", desc: "Ad-hoc training, low engagement." },
// //     { level: 3, title: "Level 3", desc: "Learning paths and communities exist." },
// //     { level: 4, title: "Level 4", desc: "Culture of continuous learning and innovation." }
// //   ]
// // };

// // const ASSESSMENT_TIPS = {
// //   "Strategy": [
// //     "How is your digital strategy developed and communicated?",
// //     "What level of digital integration exists across your organization?",
// //     "How do you measure success of digital initiatives?"
// //   ],
// //   "Data & Analytics": [
// //     "Do you have a centralized data platform?",
// //     "How is data quality and governance managed?",
// //     "What is the adoption rate of analytics tools?"
// //   ],
// //   "Automation": [
// //     "What automation tools are currently in use?",
// //     "Is there a Center of Excellence for automation?",
// //     "How do you measure ROI of automation projects?"
// //   ],
// //   "Cybersecurity": [
// //     "What security framework do you follow?",
// //     "How often are security audits conducted?",
// //     "Do you have an incident response plan?"
// //   ],
// //   "Workforce": [
// //     "What digital skills training programs exist?",
// //     "How do you measure employee digital literacy?",
// //     "Are there communities of practice for knowledge sharing?"
// //   ]
// // };

// // const EXAMPLES = {
// //   "Strategy": "We have a 3-year digital roadmap approved by the exec team. Each quarter we fund OKRs for CX, data platform, and automation. Success is tracked via NPS, cycle time, and digital revenue share.",
// //   "Data & Analytics": "Central data platform on Azure; governed domains; 85% critical data with quality SLAs; BI self-service adoption at 60%.",
// //   "Automation": "We have an automation CoE, RPA plus API-first integrations; 120 bots in prod with runbooks and monitoring.",
// //   "Cybersecurity": "Zero Trust baseline, EDR deployed org-wide, monthly patch SLAs, tabletop exercises twice a year.",
// //   "Workforce": "Role-based learning paths, hack days each quarter, change champions embedded in business units."
// // };

// // const BEST_PRACTICES = {
// //   "Strategy": [
// //     "Tie digital initiatives to measurable business outcomes",
// //     "Publish a one-page strategy and update quarterly",
// //     "Fund via product/OKR model; stop low-value work quickly"
// //   ],
// //   "Data & Analytics": [
// //     "Data contracts & domain ownership",
// //     "Platform with governed self-service",
// //     "Value tracking per analytics product"
// //   ],
// //   "Automation": [
// //     "Discover automation via value stream mapping",
// //     "Combine RPA with APIs/events; measure end-to-end",
// //     "Run an automation CoE with reuse patterns"
// //   ],
// //   "Cybersecurity": [
// //     "Identity-first (MFA, least privilege, PAM)",
// //     "Shift-left security & SBOMs",
// //     "Continuous detection/response with drills"
// //   ],
// //   "Workforce": [
// //     "Skills matrix and learning budget",
// //     "Communities of practice",
// //     "Transparent change comms & enablement"
// //   ]
// // };

// // export default function App() {
// //   const [currentDimension, setCurrentDimension] = useState(0);
// //   const [completed, setCompleted] = useState([false, false, false, false, false]);
// //   const [messages, setMessages] = useState([{
// //     role: "assistant",
// //     content: "Welcome! I'm your Digital Maturity Assessment Assistant. I'll guide you through evaluating your organization across 5 key dimensions. Let's start with Strategy.\n\nWhat to consider for Strategy:\n• How is your digital strategy developed and communicated?\n• What level of digital integration exists across your organization?\n• How do you measure success of digital initiatives?\n\nPlease describe your current strategy practices. You can also ask for examples or clarifications at any time!"
// //   }]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const dimension = DIMENSIONS[currentDimension];
// //   const progress = Math.round((completed.filter(c => c).length / 5) * 100);

// //   function changeDimension(index) {
// //     setCurrentDimension(index);
// //     const dim = DIMENSIONS[index];
// //     setMessages([{
// //       role: "assistant",
// //       content: `Let's evaluate your ${dim}.\n\nWhat to consider for ${dim}:\n${ASSESSMENT_TIPS[dim].map(tip => `• ${tip}`).join('\n')}\n\nPlease describe your current practices. You can also ask for examples or clarifications at any time!`
// //     }]);
// //   }

// //   function sendMessage(text) {
// //     if (!text.trim()) return;
    
// //     setMessages(prev => [...prev, { role: "user", content: text }]);
// //     setInput("");
// //     setLoading(true);

// //     setTimeout(() => {
// //       const responses = [
// //         "Thank you for sharing that. Could you elaborate on how you measure the success of these initiatives?",
// //         "That's a good start. How widely is this adopted across your organization?",
// //         "Interesting. What challenges do you face in scaling this approach?",
// //         "I see. Do you have established governance or best practices documented?",
// //         "Great insight. How often do you review and update these practices?"
// //       ];
      
// //       const reply = responses[Math.floor(Math.random() * responses.length)];
// //       setMessages(prev => [...prev, { role: "assistant", content: reply }]);
// //       setLoading(false);
// //     }, 1000);
// //   }

// //   function showExample() {
// //     setMessages(prev => [...prev, {
// //       role: "assistant",
// //       content: `Here's an example answer for ${dimension}:\n\n${EXAMPLES[dimension]}\n\nThis represents a mature approach. How does your current state compare?`
// //     }]);
// //   }

// //   function showBestPractices() {
// //     setMessages(prev => [...prev, {
// //       role: "assistant",
// //       content: `Best Practices for ${dimension}:\n\n${BEST_PRACTICES[dimension].map((bp, i) => `${i + 1}. ${bp}`).join('\n\n')}\n\nWhich of these practices are you already following?`
// //     }]);
// //   }

// //   return (
// //     <div className="flex h-screen bg-slate-900">
// //       {/* Left Sidebar */}
// //       <div className="w-56 bg-slate-800 border-r border-slate-700 rounded-lg flex flex-col">
// //         <div className="p-4 border-b border-slate-700">
// //           <h1 className="text-sm font-bold text-white mb-1">Digital Maturity Assessment</h1>
// //           <div className="mt-3">
// //             <div className="flex justify-between text-xs text-slate-400 mb-1">
// //               <span>{completed.filter(c => c).length} of 5 dimensions completed</span>
// //             </div>
// //             <div className="text-xs text-slate-400 mb-2">{progress}%</div>
// //             <div className="h-1.5 bg-slate-700 rounded-full">
// //               <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-3 rounded-lg space-y-1">
// //           {DIMENSIONS.map((dim, idx) => (
// //             <button
// //               key={dim}
// //               onClick={() => changeDimension(idx)}
// //               className={`w-full text-left px-3 py-2.5 rounded transition-colors ${
// //                 idx === currentDimension
// //                   ? "bg-slate-700 text-white border border-slate-600"
// //                   : "text-slate-300 hover:bg-slate-700/50"
// //               }`}
// //             >
// //               <div className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   checked={idx === currentDimension}
// //                   readOnly
// //                   className="w-4 h-4"
// //                 />
// //                 <span className="text-sm font-medium flex-1">{dim}</span>
// //                 {completed[idx] && <span className="text-xs text-green-400">→</span>}
// //               </div>
// //               <div className="text-xs text-slate-500 ml-6 mt-0.5">
// //                 {completed[idx] ? "Completed" : "Not Started"}
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col rounded-lg bg-slate-800">
// //         {/* Header */}
// //         <div className="border-b border-slate-700 px-6 rounded-lg py-4">
// //           <h2 className="text-lg font-bold text-white">{dimension}</h2>
// //           <p className="text-xs text-slate-400">Dimension {currentDimension + 1} of 5</p>
// //         </div>

// //         {/* Chat Area */}
// //         <div className="flex-1 overflow-y-auto rounded-lg p-6 space-y-4">
// //           {messages.map((msg, idx) => (
// //             <div key={idx}>
// //               {msg.role === "assistant" && (
// //                 <div className="flex items-start gap-3 mb-4">
// //                   <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
// //                     <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
// //                     </svg>
// //                   </div>
// //                   <div className="flex-1">
// //                     <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
// //                       <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{msg.content}</div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //               {msg.role === "user" && (
// //                 <div className="flex justify-end mb-4">
// //                   <div className="bg-slate-700 rounded-lg px-4 py-3 max-w-2xl border border-slate-600">
// //                     <div className="text-sm text-slate-200 whitespace-pre-wrap">{msg.content}</div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //           {loading && (
// //             <div className="flex items-center gap-2 text-slate-400 text-sm">
// //               <div className="flex gap-1">
// //                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
// //                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// //                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// //               </div>
// //               <span>Thinking...</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Input Area */}
// //         <div className="border-t border-slate-700 rounded-lg bg-slate-800/50 p-4">
// //           <div className="flex gap-2 mb-2">
// //             <input
// //               type="text"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
// //               placeholder="Type your response here..."
// //               className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             />
// //             <button
// //               onClick={() => sendMessage(input)}
// //               className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
// //             >
// //               Send
// //             </button>
// //           </div>
// //           <div className="flex gap-2 text-xs">
// //             <button
// //               onClick={showExample}
// //               className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-slate-300 hover:bg-slate-600 transition-colors"
// //             >
// //               💡 Show Example
// //             </button>
// //             <button
// //               onClick={showBestPractices}
// //               className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-slate-300 hover:bg-slate-600 transition-colors"
// //             >
// //               📋 Best Practices
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Sidebar */}
// //       <div className="w-72 bg-slate-800 border-l border-slate-700 overflow-y-auto">
// //         <div className="p-4">
// //           <h3 className="font-bold text-sm text-white mb-3">Quick Reference</h3>
// //           <p className="text-xs text-slate-400 mb-4">Maturity levels and tips for {dimension}</p>

// //           <div className="mb-5">
// //             <div className="flex items-center gap-2 mb-3">
// //               <span>😊</span>
// //               <h4 className="font-semibold text-sm text-white">Maturity Levels</h4>
// //             </div>
// //             <div className="space-y-2">
// //               {MATURITY_LEVELS[dimension].map((level) => (
// //                 <div key={level.level} className="p-2.5 bg-slate-700/50 rounded border border-slate-600 text-xs">
// //                   <div className="font-semibold text-white mb-1">{level.title}</div>
// //                   <div className="text-slate-400">{level.desc}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div>
// //             <div className="flex items-center gap-2 mb-3">
// //               <span>💡</span>
// //               <h4 className="font-semibold text-sm text-white">Assessment Tips</h4>
// //             </div>
// //             <ul className="space-y-2">
// //               {ASSESSMENT_TIPS[dimension].map((tip, idx) => (
// //                 <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
// //                   <span className="text-slate-500">•</span>
// //                   <span>{tip}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client'
// import { useState } from 'react';

// /** === Static Data (unchanged) === **/
// const DIMENSIONS = ["Strategy", "Data & Analytics", "Automation", "Cybersecurity", "Workforce"] as const;
// type Dimension = typeof DIMENSIONS[number];

// const MATURITY_LEVELS: Record<Dimension, { level: number; title: string; desc: string }[]> = {
//   "Strategy": [
//     { level: 1, title: "Level 1", desc: "Digital is ad-hoc, no strategy." },
//     { level: 2, title: "Level 2", desc: "Digital is aligned with operations but not enterprise-wide." },
//     { level: 3, title: "Level 3", desc: "Clear digital roadmap, partial execution." },
//     { level: 4, title: "Level 4", desc: "Fully aligned with business goals, measurable outcomes." }
//   ],
//   "Data & Analytics": [
//     { level: 1, title: "Level 1", desc: "Data is siloed, no governance." },
//     { level: 2, title: "Level 2", desc: "Some data platforms exist, limited adoption." },
//     { level: 3, title: "Level 3", desc: "Centralized data platform with quality standards." },
//     { level: 4, title: "Level 4", desc: "Data-driven culture with self-service analytics." }
//   ],
//   "Automation": [
//     { level: 1, title: "Level 1", desc: "Manual processes, no automation." },
//     { level: 2, title: "Level 2", desc: "Pilot automation projects in pockets." },
//     { level: 3, title: "Level 3", desc: "Automation CoE with standardized tools." },
//     { level: 4, title: "Level 4", desc: "Enterprise automation with AI/ML integration." }
//   ],
//   "Cybersecurity": [
//     { level: 1, title: "Level 1", desc: "Basic security, reactive approach." },
//     { level: 2, title: "Level 2", desc: "Security policies exist but inconsistent." },
//     { level: 3, title: "Level 3", desc: "Proactive security with monitoring." },
//     { level: 4, title: "Level 4", desc: "Zero Trust, continuous compliance, drills." }
//   ],
//   "Workforce": [
//     { level: 1, title: "Level 1", desc: "No digital skills program." },
//     { level: 2, title: "Level 2", desc: "Ad-hoc training, low engagement." },
//     { level: 3, title: "Level 3", desc: "Learning paths and communities exist." },
//     { level: 4, title: "Level 4", desc: "Culture of continuous learning and innovation." }
//   ]
// };

// const ASSESSMENT_TIPS: Record<Dimension, string[]> = {
//   "Strategy": [
//     "How is your digital strategy developed and communicated?",
//     "What level of digital integration exists across your organization?",
//     "How do you measure success of digital initiatives?"
//   ],
//   "Data & Analytics": [
//     "Do you have a centralized data platform?",
//     "How is data quality and governance managed?",
//     "What is the adoption rate of analytics tools?"
//   ],
//   "Automation": [
//     "What automation tools are currently in use?",
//     "Is there a Center of Excellence for automation?",
//     "How do you measure ROI of automation projects?"
//   ],
//   "Cybersecurity": [
//     "What security framework do you follow?",
//     "How often are security audits conducted?",
//     "Do you have an incident response plan?"
//   ],
//   "Workforce": [
//     "What digital skills training programs exist?",
//     "How do you measure employee digital literacy?",
//     "Are there communities of practice for knowledge sharing?"
//   ]
// };

// const EXAMPLES: Record<Dimension, string> = {
//   "Strategy": "We have a 3-year digital roadmap approved by the exec team. Each quarter we fund OKRs for CX, data platform, and automation. Success is tracked via NPS, cycle time, and digital revenue share.",
//   "Data & Analytics": "Central data platform on Azure; governed domains; 85% critical data with quality SLAs; BI self-service adoption at 60%.",
//   "Automation": "We have an automation CoE, RPA plus API-first integrations; 120 bots in prod with runbooks and monitoring.",
//   "Cybersecurity": "Zero Trust baseline, EDR deployed org-wide, monthly patch SLAs, tabletop exercises twice a year.",
//   "Workforce": "Role-based learning paths, hack days each quarter, change champions embedded in business units."
// };

// const BEST_PRACTICES: Record<Dimension, string[]> = {
//   "Strategy": [
//     "Tie digital initiatives to measurable business outcomes",
//     "Publish a one-page strategy and update quarterly",
//     "Fund via product/OKR model; stop low-value work quickly"
//   ],
//   "Data & Analytics": [
//     "Data contracts & domain ownership",
//     "Platform with governed self-service",
//     "Value tracking per analytics product"
//   ],
//   "Automation": [
//     "Discover automation via value stream mapping",
//     "Combine RPA with APIs/events; measure end-to-end",
//     "Run an automation CoE with reuse patterns"
//   ],
//   "Cybersecurity": [
//     "Identity-first (MFA, least privilege, PAM)",
//     "Shift-left security & SBOMs",
//     "Continuous detection/response with drills"
//   ],
//   "Workforce": [
//     "Skills matrix and learning budget",
//     "Communities of practice",
//     "Transparent change comms & enablement"
//   ]
// };

// /** === Component === **/
// export default function App() {
//   const [currentDimension, setCurrentDimension] = useState<number>(0);
//   const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false]);
//   const [messages, setMessages] = useState<{ role: 'assistant' | 'user', content: string }[]>([{
//     role: "assistant",
//     content:
//       "Welcome! I'm your Digital Maturity Assessment Assistant. I'll guide you through evaluating your organization across 5 key dimensions. Let's start with Strategy.\n\n" +
//       "What to consider for Strategy:\n" +
//       "• How is your digital strategy developed and communicated?\n" +
//       "• What level of digital integration exists across your organization?\n" +
//       "• How do you measure success of digital initiatives?\n\n" +
//       "Please describe your current strategy practices. You can also ask for examples or clarifications at any time!"
//   }]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const dimension: Dimension = DIMENSIONS[currentDimension];
//   const progress = Math.round((completed.filter(c => c).length / 5) * 100);

//   function changeDimension(index: number) {
//     setCurrentDimension(index);
//     const dim = DIMENSIONS[index];
//     setMessages([{
//       role: "assistant",
//       content:
//         `Let's evaluate your ${dim}.\n\n` +
//         `What to consider for ${dim}:\n` +
//         `${ASSESSMENT_TIPS[dim].map(tip => `• ${tip}`).join('\n')}\n\n` +
//         `Please describe your current practices. You can also ask for examples or clarifications at any time!`
//     }]);
//   }

//   function sendMessage(text: string) {
//     if (!text.trim()) return;
//     setMessages(prev => [...prev, { role: "user", content: text }]);
//     setInput("");
//     setLoading(true);

//     // Mock assistant reply
//     setTimeout(() => {
//       const responses = [
//         "Thank you for sharing that. Could you elaborate on how you measure the success of these initiatives?",
//         "That's a good start. How widely is this adopted across your organization?",
//         "Interesting. What challenges do you face in scaling this approach?",
//         "I see. Do you have established governance or best practices documented?",
//         "Great insight. How often do you review and update these practices?"
//       ];
//       const reply = responses[Math.floor(Math.random() * responses.length)];
//       setMessages(prev => [...prev, { role: "assistant", content: reply }]);
//       setLoading(false);
//     }, 1000);
//   }

//   function showExample() {
//     setMessages(prev => [
//       ...prev,
//       {
//         role: "assistant",
//         content:
//           `Here's an example answer for ${dimension}:\n\n${EXAMPLES[dimension]}\n\n` +
//           `This represents a mature approach. How does your current state compare?`
//       }
//     ]);
//   }

//   function showBestPractices() {
//     setMessages(prev => [
//       ...prev,
//       {
//         role: "assistant",
//         content:
//           `Best Practices for ${dimension}:\n\n` +
//           `${BEST_PRACTICES[dimension].map((bp, i) => `${i + 1}. ${bp}`).join('\n\n')}\n\n` +
//           `Which of these practices are you already following?`
//       }
//     ]);
//   }

//   return (
//     <div className="h-[100dvh] bg-slate-900 p-4">
//       {/* 3-column grid with consistent gaps between all major sections */}
//       <div className="grid h-full grid-cols-[16rem_1fr_20rem] gap-4">
//         {/* === LEFT SIDEBAR (stacked cards with gaps) === */}
//         <aside className="flex flex-col gap-4">
//           {/* Sidebar header/progress card */}
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
//             <h1 className="text-sm font-bold text-white mb-1">Digital Maturity Assessment</h1>

//             <div className="flex justify-between text-xs text-slate-400 mb-1">
//               <span>{completed.filter(c => c).length} of 5 dimensions completed</span>
//             </div>

//             <div className="text-xs text-slate-400 mb-2">{progress}%</div>

//             <div className="h-1.5 rounded-full bg-slate-700">
//               <div
//                 className="h-full rounded-full bg-blue-500 transition-all"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           {/* Dimensions list card */}
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-2">
//             <div className="flex-1 overflow-y-auto space-y-2">
//               {DIMENSIONS.map((dim, idx) => (
//                 <button
//                   key={dim}
//                   onClick={() => changeDimension(idx)}
//                   className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
//                     idx === currentDimension
//                       ? "bg-slate-700 text-white border border-slate-600"
//                       : "text-slate-300 hover:bg-slate-700/50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       checked={idx === currentDimension}
//                       readOnly
//                       className="h-4 w-4"
//                     />
//                     <span className="flex-1 text-sm font-medium">{dim}</span>
//                     {completed[idx] && <span className="text-xs text-green-400">→</span>}
//                   </div>
//                   <div className="ml-6 mt-0.5 text-xs text-slate-500">
//                     {completed[idx] ? "Completed" : "Not Started"}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* === MAIN COLUMN (header card, chat card, input card) === */}
//         <section className="flex h-full min-h-0 flex-col gap-4">
//           {/* Header (rounded, separated) */}
//           <header className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-4">
//             <h2 className="text-lg font-bold text-white">{dimension}</h2>
//             <p className="text-xs text-slate-400">Dimension {currentDimension + 1} of 5</p>
//           </header>

//           {/* Chat area card */}
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 flex-1 min-h-0 overflow-y-auto">
//             <div className="space-y-4">
//               {messages.map((msg, idx) => (
//                 <div key={idx}>
//                   {msg.role === "assistant" && (
//                     <div className="mb-4 flex items-start gap-3">
//                       <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
//                         <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                         </svg>
//                       </div>
//                       <div className="flex-1">
//                         <div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4">
//                           <div className="whitespace-pre-wrap leading-relaxed text-sm text-slate-200">
//                             {msg.content}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {msg.role === "user" && (
//                     <div className="mb-4 flex justify-end">
//                       <div className="max-w-2xl rounded-lg border border-slate-600 bg-slate-700 px-4 py-3">
//                         <div className="whitespace-pre-wrap text-sm text-slate-200">
//                           {msg.content}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex items-center gap-2 text-sm text-slate-400">
//                   <div className="flex gap-1">
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.1s" }} />
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
//                   </div>
//                   <span>Thinking...</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Chat input card (separated, rounded) */}
//           <footer className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
//             <div className="mb-2 flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
//                 placeholder="Type your response here..."
//                 className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={() => sendMessage(input)}
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </div>

//             <div className="flex gap-2 text-xs">
//               <button
//                 onClick={showExample}
//                 className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600"
//               >
//                 💡 Show Example
//               </button>
//               <button
//                 onClick={showBestPractices}
//                 className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600"
//               >
//                 📋 Best Practices
//               </button>
//               <button
//                 onClick={showBestPractices}
//                 className="rounded border border-slate-600  bg-blue-600 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600"
//               >
//                 📋 Submit Assessment
//               </button>
//             </div>
//           </footer>
//         </section>

//         {/* === RIGHT QUICK REFERENCE (rounded card with its own spacing) === */}
//         <aside className="flex flex-col gap-4">
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
//             <h3 className="mb-3 text-sm font-bold text-white">Quick Reference</h3>
//             <p className="mb-4 text-xs text-slate-400">Maturity levels and tips for {dimension}</p>

//             <div className="mb-5">
//               <div className="mb-3 flex items-center gap-2">
//                 <span>😊</span>
//                 <h4 className="text-sm font-semibold text-white">Maturity Levels</h4>
//               </div>
//               <div className="space-y-2">
//                 {MATURITY_LEVELS[dimension].map((level) => (
//                   <div key={level.level} className="rounded border border-slate-600 bg-slate-700/50 p-2.5 text-xs">
//                     <div className="mb-1 font-semibold text-white">{level.title}</div>
//                     <div className="text-slate-400">{level.desc}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="mb-3 flex items-center gap-2">
//                 <span>💡</span>
//                 <h4 className="text-sm font-semibold text-white">Assessment Tips</h4>
//               </div>
//               <ul className="space-y-2">
//                 {ASSESSMENT_TIPS[dimension].map((tip, idx) => (
//                   <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
//                     <span className="text-slate-500">•</span>
//                     <span>{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


// 'use client'
// import { useState, useEffect } from 'react';
// import { assessmentAPI, Message, Dimension } from '@/lib/api';

// type DimensionKey = "strategy" | "data-analytics" | "automation" | "cybersecurity" | "workforce";

// const DIMENSION_LABELS: Record<DimensionKey, string> = {
//   "strategy": "Strategy",
//   "data-analytics": "Data & Analytics",
//   "automation": "Automation",
//   "cybersecurity": "Cybersecurity",
//   "workforce": "Workforce"
// };

// const MATURITY_LEVELS: Record<DimensionKey, { level: number; title: string; desc: string }[]> = {
//   "strategy": [
//     { level: 1, title: "Level 1", desc: "Digital is ad-hoc, no strategy." },
//     { level: 2, title: "Level 2", desc: "Digital is aligned with operations but not enterprise-wide." },
//     { level: 3, title: "Level 3", desc: "Clear digital roadmap, partial execution." },
//     { level: 4, title: "Level 4", desc: "Fully aligned with business goals, measurable outcomes." }
//   ],
//   "data-analytics": [
//     { level: 1, title: "Level 1", desc: "Data is siloed, no governance." },
//     { level: 2, title: "Level 2", desc: "Some data platforms exist, limited adoption." },
//     { level: 3, title: "Level 3", desc: "Centralized data platform with quality standards." },
//     { level: 4, title: "Level 4", desc: "Data-driven culture with self-service analytics." }
//   ],
//   "automation": [
//     { level: 1, title: "Level 1", desc: "Manual processes, no automation." },
//     { level: 2, title: "Level 2", desc: "Pilot automation projects in pockets." },
//     { level: 3, title: "Level 3", desc: "Automation CoE with standardized tools." },
//     { level: 4, title: "Level 4", desc: "Enterprise automation with AI/ML integration." }
//   ],
//   "cybersecurity": [
//     { level: 1, title: "Level 1", desc: "Basic security, reactive approach." },
//     { level: 2, title: "Level 2", desc: "Security policies exist but inconsistent." },
//     { level: 3, title: "Level 3", desc: "Proactive security with monitoring." },
//     { level: 4, title: "Level 4", desc: "Zero Trust, continuous compliance, drills." }
//   ],
//   "workforce": [
//     { level: 1, title: "Level 1", desc: "No digital skills program." },
//     { level: 2, title: "Level 2", desc: "Ad-hoc training, low engagement." },
//     { level: 3, title: "Level 3", desc: "Learning paths and communities exist." },
//     { level: 4, title: "Level 4", desc: "Culture of continuous learning and innovation." }
//   ]
// };

// const ASSESSMENT_TIPS: Record<DimensionKey, string[]> = {
//   "strategy": [
//     "How is your digital strategy developed and communicated?",
//     "What level of digital integration exists across your organization?",
//     "How do you measure success of digital initiatives?"
//   ],
//   "data-analytics": [
//     "Do you have a centralized data platform?",
//     "How is data quality and governance managed?",
//     "What is the adoption rate of analytics tools?"
//   ],
//   "automation": [
//     "What automation tools are currently in use?",
//     "Is there a Center of Excellence for automation?",
//     "How do you measure ROI of automation projects?"
//   ],
//   "cybersecurity": [
//     "What security framework do you follow?",
//     "How often are security audits conducted?",
//     "Do you have an incident response plan?"
//   ],
//   "workforce": [
//     "What digital skills training programs exist?",
//     "How do you measure employee digital literacy?",
//     "Are there communities of practice for knowledge sharing?"
//   ]
// };

// export default function App() {
//   const [sessionId, setSessionId] = useState<string>("");
//   const [dimensions, setDimensions] = useState<Dimension[]>([]);
//   const [currentDimensionIndex, setCurrentDimensionIndex] = useState<number>(0);
//   const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Initialize session
//   useEffect(() => {
//     async function init() {
//       try {
//         // Start assessment
//         const startResponse = await assessmentAPI.startAssessment("");
//         setSessionId(startResponse.session_id);

//         // Get dimensions
//         const dimResponse = await assessmentAPI.getDimensions();
//         setDimensions(dimResponse.dimensions);

//         // Set initial welcome message
//         setMessages([{
//           role: "assistant",
//           content: "Welcome! I'm your Digital Maturity Assessment Assistant. I'll guide you through evaluating your organization across 5 key dimensions. Let's start with Strategy.\n\n" +
//             "What to consider for Strategy:\n" +
//             "• How is your digital strategy developed and communicated?\n" +
//             "• What level of digital integration exists across your organization?\n" +
//             "• How do you measure success of digital initiatives?\n\n" +
//             "Please describe your current strategy practices. You can also ask for examples or clarifications at any time!"
//         }]);
//       } catch (err) {
//         setError("Failed to initialize assessment. Please refresh the page.");
//         console.error(err);
//       }
//     }
//     init();
//   }, []);

//   const currentDimension: DimensionKey = dimensions[currentDimensionIndex]?.id as DimensionKey || "strategy";
//   const currentLabel = DIMENSION_LABELS[currentDimension] || "Strategy";
//   const progress = Math.round((completed.filter(c => c).length / 5) * 100);

//   async function changeDimension(index: number) {
//     setCurrentDimensionIndex(index);
//     const dim = dimensions[index];
//     const dimKey = dim.id as DimensionKey;
//     const tips = ASSESSMENT_TIPS[dimKey] || [];
    
//     setMessages([{
//       role: "assistant",
//       content: `Let's evaluate your ${dim.label}.\n\n` +
//         `What to consider for ${dim.label}:\n` +
//         `${tips.map(tip => `• ${tip}`).join('\n')}\n\n` +
//         `Please describe your current practices. You can also ask for examples or clarifications at any time!`
//     }]);
//   }

//   async function sendMessage(text: string) {
//     if (!text.trim() || !sessionId) return;
    
//     const userMessage: Message = { role: "user", content: text };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await assessmentAPI.sendMessage(
//         sessionId,
//         currentDimension,
//         text,
//         messages
//       );

//       const assistantMessage: Message = {
//         role: "assistant",
//         content: response.response
//       };

//       setMessages(prev => [...prev, assistantMessage]);

//       // Check if dimension is complete
//       if (response.is_complete) {
//         const newCompleted = [...completed];
//         newCompleted[currentDimensionIndex] = true;
//         setCompleted(newCompleted);

//         // Auto-advance to next dimension if available
//         if (response.next_dimension && currentDimensionIndex < 4) {
//           setTimeout(() => {
//             changeDimension(currentDimensionIndex + 1);
//           }, 2000);
//         }
//       }
//     } catch (err) {
//       setError("Failed to send message. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function showExample() {
//     try {
//       const response = await fetch(`http://localhost:8000/api/examples/${currentDimension}`);
//       const data = await response.json();
      
//       setMessages(prev => [...prev, {
//         role: "assistant",
//         content: `Here's an example answer for ${currentLabel}:\n\n${data.example}\n\nThis represents a mature approach. How does your current state compare?`
//       }]);
//     } catch (err) {
//       console.error("Failed to fetch example:", err);
//     }
//   }

//   async function showBestPractices() {
//     try {
//       const response = await fetch(`http://localhost:8000/api/best-practices/${currentDimension}`);
//       const data = await response.json();
      
//       setMessages(prev => [...prev, {
//         role: "assistant",
//         content: `Best Practices for ${currentLabel}:\n\n` +
//           `${data.items.map((bp: string, i: number) => `${i + 1}. ${bp}`).join('\n\n')}\n\n` +
//           `Which of these practices are you already following?`
//       }]);
//     } catch (err) {
//       console.error("Failed to fetch best practices:", err);
//     }
//   }

//   async function submitAssessment() {
//     if (!sessionId) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8000/api/score?session_id=${sessionId}&dimension=${currentDimension}`, {
//         method: 'POST'
//       });
//       const data = await response.json();
      
//       setMessages(prev => [...prev, {
//         role: "assistant",
//         content: `Assessment Complete for ${currentLabel}!\n\n${data.evaluation}\n\nReady to move to the next dimension?`
//       }]);

//       // Mark as completed
//       const newCompleted = [...completed];
//       newCompleted[currentDimensionIndex] = true;
//       setCompleted(newCompleted);
//     } catch (err) {
//       setError("Failed to submit assessment. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="h-[100dvh] bg-slate-900 p-4">
//       {error && (
//         <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 p-3 text-sm text-red-400">
//           {error}
//         </div>
//       )}

//       <div className="grid h-full grid-cols-[16rem_1fr_20rem] gap-4">
//         {/* LEFT SIDEBAR */}
//         <aside className="flex flex-col gap-4">
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
//             <h1 className="text-sm font-bold text-white mb-1">Digital Maturity Assessment</h1>

//             <div className="flex justify-between text-xs text-slate-400 mb-1">
//               <span>{completed.filter(c => c).length} of 5 dimensions completed</span>
//             </div>

//             <div className="text-xs text-slate-400 mb-2">{progress}%</div>

//             <div className="h-1.5 rounded-full bg-slate-700">
//               <div
//                 className="h-full rounded-full bg-blue-500 transition-all"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-2">
//             <div className="flex-1 overflow-y-auto space-y-2">
//               {dimensions.map((dim, idx) => (
//                 <button
//                   key={dim.id}
//                   onClick={() => changeDimension(idx)}
//                   className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
//                     idx === currentDimensionIndex
//                       ? "bg-slate-700 text-white border border-slate-600"
//                       : "text-slate-300 hover:bg-slate-700/50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       checked={idx === currentDimensionIndex}
//                       readOnly
//                       className="h-4 w-4"
//                     />
//                     <span className="flex-1 text-sm font-medium">{dim.label}</span>
//                     {completed[idx] && <span className="text-xs text-green-400">✓</span>}
//                   </div>
//                   <div className="ml-6 mt-0.5 text-xs text-slate-500">
//                     {completed[idx] ? "Completed" : "Not Started"}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* MAIN COLUMN */}
//         <section className="flex h-full min-h-0 flex-col gap-4">
//           <header className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-4">
//             <h2 className="text-lg font-bold text-white">{currentLabel}</h2>
//             <p className="text-xs text-slate-400">Dimension {currentDimensionIndex + 1} of 5</p>
//           </header>

//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 flex-1 min-h-0 overflow-y-auto">
//             <div className="space-y-4">
//               {messages.map((msg, idx) => (
//                 <div key={idx}>
//                   {msg.role === "assistant" && (
//                     <div className="mb-4 flex items-start gap-3">
//                       <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
//                         <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                         </svg>
//                       </div>
//                       <div className="flex-1">
//                         <div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4">
//                           <div className="whitespace-pre-wrap leading-relaxed text-sm text-slate-200">
//                             {msg.content}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {msg.role === "user" && (
//                     <div className="mb-4 flex justify-end">
//                       <div className="max-w-2xl rounded-lg border border-slate-600 bg-slate-700 px-4 py-3">
//                         <div className="whitespace-pre-wrap text-sm text-slate-200">
//                           {msg.content}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex items-center gap-2 text-sm text-slate-400">
//                   <div className="flex gap-1">
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.1s" }} />
//                     <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
//                   </div>
//                   <span>Thinking...</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <footer className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
//             <div className="mb-2 flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
//                 placeholder="Type your response here..."
//                 disabled={loading}
//                 className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//               />
//               <button
//                 onClick={() => sendMessage(input)}
//                 disabled={loading || !input.trim()}
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Send
//               </button>
//             </div>

//             <div className="flex gap-2 text-xs">
//               <button
//                 onClick={showExample}
//                 disabled={loading}
//                 className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600 disabled:opacity-50"
//               >
//                 💡 Show Example
//               </button>
//               <button
//                 onClick={showBestPractices}
//                 disabled={loading}
//                 className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600 disabled:opacity-50"
//               >
//                 📋 Best Practices
//               </button>
//               <button
//                 onClick={submitAssessment}
//                 disabled={loading || messages.length < 4}
//                 className="rounded border border-slate-600 bg-blue-600 px-3 py-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 ✓ Submit Assessment
//               </button>
//             </div>
//           </footer>
//         </section>

//         {/* RIGHT SIDEBAR */}
//         <aside className="flex flex-col gap-4">
//           <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 overflow-y-auto">
//             <h3 className="mb-3 text-sm font-bold text-white">Quick Reference</h3>
//             <p className="mb-4 text-xs text-slate-400">Maturity levels and tips for {currentLabel}</p>

//             <div className="mb-5">
//               <div className="mb-3 flex items-center gap-2">
//                 <span>📊</span>
//                 <h4 className="text-sm font-semibold text-white">Maturity Levels</h4>
//               </div>
//               <div className="space-y-2">
//                 {MATURITY_LEVELS[currentDimension]?.map((level) => (
//                   <div key={level.level} className="rounded border border-slate-600 bg-slate-700/50 p-2.5 text-xs">
//                     <div className="mb-1 font-semibold text-white">{level.title}</div>
//                     <div className="text-slate-400">{level.desc}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="mb-3 flex items-center gap-2">
//                 <span>💡</span>
//                 <h4 className="text-sm font-semibold text-white">Assessment Tips</h4>
//               </div>
//               <ul className="space-y-2">
//                 {ASSESSMENT_TIPS[currentDimension]?.map((tip, idx) => (
//                   <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
//                     <span className="text-slate-500">•</span>
//                     <span>{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

'use client'
import { useState, useEffect } from 'react';
import { assessmentAPI, Message, Dimension } from '@/lib/api';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type DimensionKey = "strategy" | "data-analytics" | "automation" | "cybersecurity" | "workforce";

const DIMENSION_LABELS: Record<DimensionKey, string> = {
  "strategy": "Strategy",
  "data-analytics": "Data & Analytics",
  "automation": "Automation",
  "cybersecurity": "Cybersecurity",
  "workforce": "Workforce"
};

const MATURITY_LEVELS: Record<DimensionKey, { level: number; title: string; desc: string }[]> = {
  "strategy": [
    { level: 1, title: "Level 1", desc: "Digital is ad-hoc, no strategy." },
    { level: 2, title: "Level 2", desc: "Digital is aligned with operations but not enterprise-wide." },
    { level: 3, title: "Level 3", desc: "Clear digital roadmap, partial execution." },
    { level: 4, title: "Level 4", desc: "Fully aligned with business goals, measurable outcomes." }
  ],
  "data-analytics": [
    { level: 1, title: "Level 1", desc: "Data is siloed, no governance." },
    { level: 2, title: "Level 2", desc: "Some data platforms exist, limited adoption." },
    { level: 3, title: "Level 3", desc: "Centralized data platform with quality standards." },
    { level: 4, title: "Level 4", desc: "Data-driven culture with self-service analytics." }
  ],
  "automation": [
    { level: 1, title: "Level 1", desc: "Manual processes, no automation." },
    { level: 2, title: "Level 2", desc: "Pilot automation projects in pockets." },
    { level: 3, title: "Level 3", desc: "Automation CoE with standardized tools." },
    { level: 4, title: "Level 4", desc: "Enterprise automation with AI/ML integration." }
  ],
  "cybersecurity": [
    { level: 1, title: "Level 1", desc: "Basic security, reactive approach." },
    { level: 2, title: "Level 2", desc: "Security policies exist but inconsistent." },
    { level: 3, title: "Level 3", desc: "Proactive security with monitoring." },
    { level: 4, title: "Level 4", desc: "Zero Trust, continuous compliance, drills." }
  ],
  "workforce": [
    { level: 1, title: "Level 1", desc: "No digital skills program." },
    { level: 2, title: "Level 2", desc: "Ad-hoc training, low engagement." },
    { level: 3, title: "Level 3", desc: "Learning paths and communities exist." },
    { level: 4, title: "Level 4", desc: "Culture of continuous learning and innovation." }
  ]
};

const ASSESSMENT_TIPS: Record<DimensionKey, string[]> = {
  "strategy": [
    "How is your digital strategy developed and communicated?",
    "What level of digital integration exists across your organization?",
    "How do you measure success of digital initiatives?"
  ],
  "data-analytics": [
    "Do you have a centralized data platform?",
    "How is data quality and governance managed?",
    "What is the adoption rate of analytics tools?"
  ],
  "automation": [
    "What automation tools are currently in use?",
    "Is there a Center of Excellence for automation?",
    "How do you measure ROI of automation projects?"
  ],
  "cybersecurity": [
    "What security framework do you follow?",
    "How often are security audits conducted?",
    "Do you have an incident response plan?"
  ],
  "workforce": [
    "What digital skills training programs exist?",
    "How do you measure employee digital literacy?",
    "Are there communities of practice for knowledge sharing?"
  ]
};

export default function App() {
  const [sessionId, setSessionId] = useState<string>("");
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Initialize session
  useEffect(() => {
    async function init() {
      try {
        toast.loading("Initializing assessment...", { id: "init" });
        
        const startResponse = await assessmentAPI.startAssessment("");
        setSessionId(startResponse.session_id);

        const dimResponse = await assessmentAPI.getDimensions();
        setDimensions(dimResponse.dimensions);

        setMessages([{
          role: "assistant",
          content: "Welcome! I'm your Digital Maturity Assessment Assistant. I'll guide you through evaluating your organization across 5 key dimensions. Let's start with Strategy.\n\n" +
            "What to consider for Strategy:\n" +
            "• How is your digital strategy developed and communicated?\n" +
            "• What level of digital integration exists across your organization?\n" +
            "• How do you measure success of digital initiatives?\n\n" +
            "Please describe your current strategy practices. You can also ask for examples or clarifications at any time!"
        }]);
        
        toast.success("Assessment ready!", { id: "init" });
      } catch (err) {
        toast.error("Failed to initialize assessment. Please refresh.", { id: "init" });
        console.error(err);
      }
    }
    init();
  }, []);

  const currentDimension: DimensionKey = dimensions[currentDimensionIndex]?.id as DimensionKey || "strategy";
  const currentLabel = DIMENSION_LABELS[currentDimension] || "Strategy";
  const progress = Math.round((completed.filter(c => c).length / 5) * 100);

  async function changeDimension(index: number) {
    setCurrentDimensionIndex(index);
    const dim = dimensions[index];
    const dimKey = dim.id as DimensionKey;
    const tips = ASSESSMENT_TIPS[dimKey] || [];
    
    setMessages([{
      role: "assistant",
      content: `Let's evaluate your ${dim.label}.\n\n` +
        `What to consider for ${dim.label}:\n` +
        `${tips.map(tip => `• ${tip}`).join('\n')}\n\n` +
        `Please describe your current practices. You can also ask for examples or clarifications at any time!`
    }]);
    
    toast.success(`Switched to ${dim.label} dimension`);
  }

  
const handleClick = () => {
    // Navigate to the desired page
    router.push('/analytics'); // Replace with your actual route
  };


  async function sendMessage(text: string) {
    if (!text.trim() || !sessionId) return;
    
    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await assessmentAPI.sendMessage(
        sessionId,
        currentDimension,
        text,
        messages
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: response.response
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.is_complete) {
        const newCompleted = [...completed];
        newCompleted[currentDimensionIndex] = true;
        setCompleted(newCompleted);

        toast.success(`${currentLabel} assessment complete! 🎉`);

        if (response.next_dimension && currentDimensionIndex < 4) {
          toast.loading("Moving to next dimension...", { duration: 2000 });
          setTimeout(() => {
            changeDimension(currentDimensionIndex + 1);
          }, 2000);
        }
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function showExample() {
    try {
      const response = await fetch(`http://localhost:8000/api/examples/${currentDimension}`);
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Here's an example answer for ${currentLabel}:\n\n${data.example}\n\nThis represents a mature approach. How does your current state compare?`
      }]);
      
      toast.success("Example loaded");
    } catch (err) {
      toast.error("Failed to fetch example");
      console.error(err);
    }
  }

  async function showBestPractices() {
    try {
      const response = await fetch(`http://localhost:8000/api/best-practices/${currentDimension}`);
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Best Practices for ${currentLabel}:\n\n` +
          `${data.items.map((bp: string, i: number) => `${i + 1}. ${bp}`).join('\n\n')}\n\n` +
          `Which of these practices are you already following?`
      }]);
      
      toast.success("Best practices loaded");
    } catch (err) {
      toast.error("Failed to fetch best practices");
      console.error(err);
    }
  }

  async function submitAssessment() {
    if (!sessionId) return;
    
    setLoading(true);
    const toastId = toast.loading("Evaluating your responses...");
    
    try {
      const response = await fetch(`http://localhost:8000/api/score?session_id=${sessionId}&dimension=${currentDimension}`, {
        method: 'POST'
      });
      const data = await response.json();
      
      const evaluation = data.evaluation;
      const levelEmoji = ["", "🟡", "🟠", "🟢", "🔵"][evaluation.level];
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `✅ Assessment Complete for ${currentLabel}!\n\n` +
          `${levelEmoji} **Maturity Level: ${evaluation.level}/4**\n\n` +
          `**Analysis:**\n${evaluation.rationale}\n\n` +
          `**Top Gaps:**\n${evaluation.top_gaps.map((g: string, i: number) => `${i + 1}. ${g}`).join('\n')}\n\n` +
          `**Next Quarter Actions:**\n${evaluation.next_quarter_actions.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}\n\n` +
          `Ready to move to the next dimension?`
      }]);

      const newCompleted = [...completed];
      newCompleted[currentDimensionIndex] = true;
      setCompleted(newCompleted);
      
      toast.success(`Assessment scored: Level ${evaluation.level}/4`, { id: toastId });
    } catch (err) {
      toast.error("Failed to submit assessment", { id: toastId });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="h-[100dvh] bg-slate-900 p-4">
        <div className="grid h-full grid-cols-[16rem_1fr_20rem] gap-4">
          {/* LEFT SIDEBAR */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <h1 className="text-sm font-bold text-white mb-1">Digital Maturity Assessment</h1>

              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{completed.filter(c => c).length} of 5 dimensions completed</span>
              </div>

              <div className="text-xs text-slate-400 mb-2">{progress}%</div>

              <div className="h-1.5 rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-2">
              <div className="flex-1 overflow-y-auto space-y-2">
                {dimensions.map((dim, idx) => (
                  <button
                    key={dim.id}
                    onClick={() => changeDimension(idx)}
                    className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                      idx === currentDimensionIndex
                        ? "bg-slate-700 text-white border border-slate-600"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={idx === currentDimensionIndex}
                        readOnly
                        className="h-4 w-4"
                      />
                      <span className="flex-1 text-sm font-medium">{dim.label}</span>
                      {completed[idx] && <span className="text-xs text-green-400">✓</span>}
                    </div>
                    <div className="ml-6 mt-0.5 text-xs text-slate-500">
                      {completed[idx] ? "Completed" : "Not Started"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN */}
          <section className="flex h-full min-h-0 flex-col gap-4">
            <header className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-4">
              <h2 className="text-lg font-bold text-white">{currentLabel}</h2>
              <p className="text-xs text-slate-400">Dimension {currentDimensionIndex + 1} of 5</p>
            </header>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 flex-1 min-h-0 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx}>
                    {msg.role === "assistant" && (
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4">
                            <div className="whitespace-pre-wrap leading-relaxed text-sm text-slate-200">
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {msg.role === "user" && (
                      <div className="mb-4 flex justify-end">
                        <div className="max-w-2xl rounded-lg border border-slate-600 bg-slate-700 px-4 py-3">
                          <div className="whitespace-pre-wrap text-sm text-slate-200">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.1s" }} />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
            </div>

            <footer className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
              <div className="mb-2 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                  placeholder="Type your response here..."
                  disabled={loading}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>

              <div className="flex gap-2 text-xs">
                <button
                  onClick={showExample}
                  disabled={loading}
                  className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600 disabled:opacity-50"
                >
                  💡 Show Example
                </button>
                <button
                  onClick={showBestPractices}
                  disabled={loading}
                  className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-600 disabled:opacity-50"
                >
                  📋 Best Practices
                </button>
                <button
                  onClick={submitAssessment}
                  disabled={loading || messages.length < 4}
                  className="rounded border border-slate-600 bg-blue-600 px-13 py-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✓ Submit Assessment
                </button>
              </div>
            </footer>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 text-xs p-4 overflow-y-auto flex gap-2">
              <button
                onClick={handleClick}  
                disabled={progress<100}
                className="rounded border border-slate-600 bg-blue-1200 px-8 py-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Dashboard
                </button>
                <button
                className="rounded border border-slate-600 bg-blue-1200 px-10 py-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                > Isarivelan </button>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 overflow-y-auto">
              <h3 className="mb-3 text-sm font-bold text-white">Quick Reference</h3>
              <p className="mb-4 text-xs text-slate-400">Maturity levels and tips for {currentLabel}</p>

              <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                  <span>📊</span>
                  <h4 className="text-sm font-semibold text-white">Maturity Levels</h4>
                </div>
                <div className="space-y-2">
                  {MATURITY_LEVELS[currentDimension]?.map((level) => (
                    <div key={level.level} className="rounded border border-slate-600 bg-slate-700/50 p-2.5 text-xs">
                      <div className="mb-1 font-semibold text-white">{level.title}</div>
                      <div className="text-slate-400">{level.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <h4 className="text-sm font-semibold text-white">Assessment Tips</h4>
                </div>
                <ul className="space-y-2">
                  {ASSESSMENT_TIPS[currentDimension]?.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-slate-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}