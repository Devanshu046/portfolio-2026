import React, { useState } from "react";
import { 
  User, 
  Briefcase, 
  Terminal, 
  GraduationCap, 
  FolderGit
} from "lucide-react";
import { PortfolioData } from "../types";

interface PortfolioEditorProps {
  data: PortfolioData;
  onChange?: (newData: PortfolioData) => void;
  onReset?: () => void;
}

export default function PortfolioEditor({ data }: PortfolioEditorProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "tech" | "education" | "projects">("personal");

  return (
    <div id="editor-container" className="h-full flex flex-col bg-zinc-50 border-r border-zinc-200">
      
      {/* Editor Header */}
      <div id="editor-header-bar" className="p-4 bg-white border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h2 id="editor-title" className="text-sm font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
            Portfolio Data Viewer
          </h2>
          <p id="editor-subtitle" className="text-xs text-zinc-500 font-light mt-0.5">Read-only view of the active portfolio database</p>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div id="editor-tabs-bar" className="flex border-b border-zinc-200 bg-white overflow-x-auto select-none no-scrollbar">
        {[
          { key: "personal", label: "Profile", icon: <User className="w-3.5 h-3.5" /> },
          { key: "experience", label: "Timeline", icon: <Briefcase className="w-3.5 h-3.5" /> },
          { key: "tech", label: "Skills", icon: <Terminal className="w-3.5 h-3.5" /> },
          { key: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
          { key: "projects", label: "Projects", icon: <FolderGit className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.key}
            id={`tab-btn-${tab.key}`}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
              activeTab === tab.key 
                ? "border-black text-black bg-zinc-50" 
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels Contents */}
      <div id="editor-tab-contents" className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* PERSONAL DETAIL TAB PANEL */}
        {activeTab === "personal" && (
          <div id="panel-personal" className="space-y-4 animate-fade-in">
            <h3 id="panel-personal-title" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Contact & Biography</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1">FULL NAME</label>
                <input 
                  type="text" 
                  value={data.personalInfo.name} 
                  readOnly
                  className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1">PROFESSIONAL TITLE</label>
                <input 
                  type="text" 
                  value={data.personalInfo.title} 
                  readOnly
                  className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                  placeholder="Professional Designation"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1">AVATAR URL</label>
                <input 
                  type="text" 
                  value={data.personalInfo.avatar} 
                  readOnly
                  className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                  placeholder="Custom avatar path or URL"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1">BIOGRAPHY SUMMARY</label>
                <textarea 
                  value={data.personalInfo.bio} 
                  readOnly
                  className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 h-28 resize-y leading-relaxed"
                  placeholder="Write a clear, minimalist narrative..."
                />
              </div>

              {/* Social row */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">GITHUB URL</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.github} 
                    readOnly
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">LINKEDIN URL</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.linkedin} 
                    readOnly
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">TWITTER/X URL</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.twitter} 
                    readOnly
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">CONTACT EMAIL</label>
                  <input 
                    type="email" 
                    value={data.personalInfo.email} 
                    readOnly
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-0 text-zinc-600 font-medium"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE TIMELINE TAB PANEL */}
        {activeTab === "experience" && (
          <div id="panel-experience" className="space-y-4 animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Timeline Items</h3>

            <div className="space-y-4">
              {data.experiences.map((exp, index) => (
                <div key={exp.id || index} className="bg-white p-3 border border-zinc-200 rounded-md shadow-xs space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase font-bold text-zinc-400">Duration</label>
                      <input 
                        type="text" 
                        // value={exp.duration} 
                        readOnly
                        className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-800 font-medium"
                        placeholder="July 2024 - Present"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase font-bold text-zinc-400">Company Name</label>
                      <input 
                        type="text" 
                        // value={exp.company} 
                        readOnly
                        className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-800 font-medium"
                        placeholder="Krishna Softech"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase font-bold text-zinc-400">Job Title</label>
                      <input 
                        type="text" 
                        value={exp.title} 
                        readOnly
                        className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-800 font-medium"
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Brief Detail</label>
                    <textarea 
                      value={exp.description || ""} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded h-16 resize-none text-zinc-800 leading-relaxed"
                      placeholder="No supplemental info provided."
                    />
                  </div>
                </div>
              ))}
              
              {data.experiences.length === 0 && (
                <div className="text-center py-6 text-zinc-400 text-xs italic">No timeline items recorded.</div>
              )}
            </div>
          </div>
        )}

        {/* TECHNOLOGIES TAB PANEL */}
        {activeTab === "tech" && (
          <div id="panel-tech" className="space-y-4 animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Skills & Tool Categories</h3>

            <div className="space-y-4">
              {data.technologies.map((tech, index) => (
                <div key={tech.id || index} className="bg-white p-3 border border-zinc-200 rounded-md shadow-xs space-y-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Category Header</label>
                    <input 
                      type="text" 
                      value={tech.category} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded font-bold text-zinc-600"
                      placeholder="LANGUAGES & FRAMEWORKS"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Skills</label>
                    <textarea 
                      value={tech.skills} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded h-16 resize-y text-zinc-600 leading-relaxed"
                      placeholder="JavaScript, TypeScript, Angular..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB PANEL */}
        {activeTab === "education" && (
          <div id="panel-education" className="space-y-4 animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Education Details</h3>

            <div className="space-y-4">
              {data.educations.map((edu, index) => (
                <div key={edu.id || index} className="bg-white p-3 border border-zinc-200 rounded-md shadow-xs space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-400">Period Range</label>
                      <input 
                        type="text" 
                        value={edu.period} 
                        readOnly
                        className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                        placeholder="2005 — 2009"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-zinc-400">Institution / University</label>
                      <input 
                        type="text" 
                        value={edu.institution} 
                        readOnly
                        className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                        placeholder="University of Toronto"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Credential / Degree Course</label>
                    <input 
                      type="text" 
                      value={edu.credential} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                      placeholder="B.Sc. in Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Honors / Details</label>
                    <input 
                      type="text" 
                      value={edu.details || ""} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                      placeholder="Graduated with high distinction"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS TAB PANEL */}
        {activeTab === "projects" && (
          <div id="panel-projects" className="space-y-4 animate-fade-in font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-sans">Portfolio Projects</h3>

            <div className="space-y-4">
              {data.projects.map((proj, index) => (
                <div key={proj.id || index} className="bg-white p-3 border border-zinc-200 rounded-md shadow-xs space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Project Title</label>
                    <input 
                      type="text" 
                      value={proj.title} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded font-semibold text-zinc-600"
                      placeholder="NeuroStream"
                    />
                  </div>

                  {/* Standard description */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Subtitle Description</label>
                    <input 
                      type="text" 
                      value={proj.description || ""} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                      placeholder="Real-time inference engine..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">Tags / Tech Pill Badges</label>
                    <input 
                      type="text" 
                      value={proj.technologies ? proj.technologies.join(", ") : ""} 
                      readOnly
                      className="w-full text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-600"
                      placeholder="C++, CUDA, TENSORRT"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] uppercase font-bold text-zinc-500">Key Bullet Highlights</label>
                    <textarea 
                      value={proj.bulletPoints ? proj.bulletPoints.join("\n") : ""} 
                      readOnly
                      className="w-full text-xs px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded h-24 resize-y leading-relaxed font-sans text-zinc-600"
                      placeholder="No highlights provided."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
