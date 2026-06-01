import React from "react";
import {
  Github,
  Linkedin, 
  Twitter, 
  Mail, 
  Code2, 
  Cpu, 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  Brain,
  ExternalLink,
  Milestone
} from "lucide-react";
import { PortfolioData } from "../types";
import BlogSection from "./BlogSection";

interface PortfolioViewProps {
  data: PortfolioData;
}

export default function PortfolioView({ data }: PortfolioViewProps) {
  const { personalInfo, experiences, technologies, educations, projects } = data;

  // Helper to get category icon based on name
  const getCategoryIcon = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes("LANG") || cat.includes("FRAME")) return <Code2 id="icon-lang" className="w-4 h-4 text-zinc-800" />;
    if (cat.includes("STATE") || cat.includes("API")) return <Cpu id="icon-state" className="w-4 h-4 text-zinc-800" />;
    if (cat.includes("UI") || cat.includes("ACCESS")) return <Sparkles id="icon-ui" className="w-4 h-4 text-zinc-800" />;
    if (cat.includes("TOOL") || cat.includes("PLAT")) return <Wrench id="icon-tools" className="w-4 h-4 text-zinc-800" />;
    if (cat.includes("PRACT")) return <CheckCircle2 id="icon-practices" className="w-4 h-4 text-zinc-800" />;
    if (cat.includes("AI") || cat.includes("LEARN")) return <Brain id="icon-ai" className="w-4 h-4 text-zinc-800" />;
    return <Milestone id="icon-default" className="w-4 h-4 text-zinc-800" />;
  };

  return (
    <div id="portfolio-container" className="w-full py-6 font-sans text-zinc-900 leading-relaxed selection:bg-zinc-200 animate-fade-in">
      <div className="max-w-[700px] mx-auto">
      
      {/* Header Profile Section */}
     {/* <header id="portfolio-header" className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">*/}
     <header
  id="portfolio-header"
 className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12"
>  
     {/* Portrait: 128px Circle Frame */}
        <div id="avatar-frame" className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border border-zinc-200 shadow-xs bg-zinc-50 flex items-center justify-center">
          {personalInfo.avatar ? (
            <img 
              id="avatar-image"
              src={personalInfo.avatar} 
              alt={personalInfo.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(personalInfo.name)}`;
              }}
            />
          ) : (
            <div id="avatar-placeholder" className="text-zinc-400 font-semibold text-2xl">
              {personalInfo.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Text information */}
        <div id="personal-meta" className="text-center sm:text-left">
          <h1 id="developer-name" className="text-3xl font-semibold tracking-tight text-zinc-900 font-sans mb-1">
            {personalInfo.name}
          </h1>
          <p id="developer-title" className="text-zinc-500 text-sm font-normal tracking-wide mb-4">
            {personalInfo.title}
          </p>

          {/* Social Icons matching design: subtle opacity change on hover */}
          <div id="social-links-row" className="flex justify-center sm:justify-start gap-5 items-center">
            {personalInfo.github && (
              <a 
                id="link-github"
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github id="icon-github" className="w-4 h-4" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a 
                id="link-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin id="icon-linkedin" className="w-4 h-4" />
              </a>
            )}
            {personalInfo.twitter && (
              <a 
                id="link-twitter"
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
                aria-label="Twitter / X"
              >
                <Twitter id="icon-twitter" className="w-4 h-4" />
              </a>
            )}
            {personalInfo.email && (
              <a 
                id="link-email"
                href={`mailto:${personalInfo.email}`}
                className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail id="icon-mail" className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </header>
      </div>

      {/* Main Sections divider */}
      <div className="w-full px-4 sm:px-6 md:px-8">
        <hr
          id="divider-header"
          className="h-px border-0 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(148,163,184,0.5),rgba(255,255,255,0))] my-10"
        />
      </div>

      {/* Sections Gap (spacing: content-gap, section-gap) */}
      <div id="portfolio-content" className="max-w-[700px] mx-auto space-y-12">
        
        {/* ABOUT Section */}
        <section id="section-about" className="scroll-mt-24">
          <h2 id="heading-about" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-4">
            ABOUT
          </h2>
          <div id="about-content" className="text-[14px] text-zinc-600 sm:text-[15px] font-normal leading-relaxed text-justify max-w-none">
            {personalInfo.bio}
          </div>
        </section>

        {/* EXPERIENCE Section */}
        {personalInfo.company && (
          <section id="section-company-experience" className="scroll-mt-24">
            <h2 id="heading-company-experience" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-4">
              EXPERIENCE
            </h2>
            <div id="company-experience-card" className="bg-white border border-zinc-200/50 rounded-lg p-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 id="company-experience-name" className="font-semibold text-[15px] text-zinc-800 tracking-tight">
                  {personalInfo.company}
                </h3>
                <span id="company-experience-duration" className="text-zinc-400 text-[12px] font-medium whitespace-nowrap">
                  {personalInfo.duration}
                </span>
              </div>
              <p id="company-experience-role" className="text-[13px] text-zinc-500 font-medium mb-3">
                Software Engineer
              </p>
              <p id="company-experience-desc" className="text-[13px] text-zinc-600 leading-relaxed text-justify">
                Designing and building full-stack enterprise web modules. Experienced in working with Angular (NgRx, RxJS), C# .NET APIs, SQL databases, and real-time networking tools such as SignalR and JWT proctor approvals.
              </p>
            </div>
          </section>
        )}

        {/* TIMELINE Section */}
        <section id="section-timeline" className="scroll-mt-24">
        {/* <h2 id="heading-timeline" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-6">
            TIMELINE
          </h2> */}
          
          <div id="timeline-container" className="relative">
            {/* The Vertical Timeline Line: Perfectly aligned */}
            {experiences.length > 0 && (
              <div 
                id="timeline-line" 
                className="absolute left-[84px] top-3 bottom-3 w-[1.5px] bg-zinc-200 block z-0" 
              />
            )}
            
            <div id="timeline-list" className="space-y-8">
              {experiences.map((exp, index) => {
                const itemID = `timeline-item-${index}`;
                return (
                  <div key={exp.id || index} id={itemID} className="flex items-start relative z-10">
                    
                    {/* Date / Period Column (Left) */}
                    <div id={`${itemID}-date`} className="w-[78px] shrink-0 text-zinc-500 text-[12px] font-medium whitespace-nowrap text-right pr-4 pt-0.5">
                      {exp.date}
                    </div>
                    
                    {/* Centered Timeline Dot: Positioned perfectly on top of vertical line */}
                    <div id={`${itemID}-dot-container`} className="flex w-[12px] shrink-0 justify-center pt-2 relative z-20">
                      <div 
                        id={`${itemID}-dot`} 
                        className={`w-2 h-2 rounded-full ring-4 ring-white transition-transform hover:scale-125 duration-150 ${
                          index === 0 ? "bg-emerald-500" : "bg-black"
                        }`}
                      />
                    </div>
                    
                    {/* Role Title and Description Column (Right) */}
                    <div id={`${itemID}-details`} className="flex-1 min-w-0 pl-3">
                      <h3 id={`${itemID}-title`} className="font-semibold text-[14px] text-zinc-600 font-sans tracking-tight">
                        {exp.title}
                      </h3>
                      {exp.description && (
                        <p id={`${itemID}-desc`} className="text-[13px] text-zinc-500 mt-1">
                          {exp.description}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
              
              {experiences.length === 0 && (
                <p id="timeline-empty" className="text-sm text-zinc-400 italic">No timeline items added.</p>
              )}
            </div>
          </div>
        </section>

        {/* TECHNOLOGIES Section */}
        <section id="section-technologies" className="scroll-mt-24">
          <h2 id="heading-technologies" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-6">
            TECHNOLOGIES
          </h2>
          
          <div id="tech-grid" className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {technologies.map((tech, index) => {
              const techID = `tech-cat-${index}`;
              return (
                <div key={tech.id || index} id={techID} className="space-y-1.5">
                  <div id={`${techID}-header`} className="flex items-center gap-2">
                    {getCategoryIcon(tech.category)}
                    <h3 id={`${techID}-title`} className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      {tech.category}
                    </h3>
                  </div>
                  <p id={`${techID}-skills`} className="text-[13px] text-zinc-700 font-normal leading-relaxed">
                    {tech.skills}
                  </p>
                </div>
              );
            })}
            
            {technologies.length === 0 && (
              <p id="tech-empty" className="text-sm text-zinc-400 italic">No technology categories available.</p>
            )}
          </div>
        </section>

        {/* EDUCATION Section */}
        <section id="section-education" className="scroll-mt-24">
          <h2 id="heading-education" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-6">
            EDUCATION
          </h2>
          
          <div id="education-list" className="space-y-6">
            {educations.map((edu, index) => {
              const eduID = `education-item-${index}`;
              return (
                <div key={edu.id || index} id={eduID} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                  {/* Period */}
                  <div id={`${eduID}-period`} className="w-full sm:w-[90px] shrink-0 text-zinc-600 text-[12px] font-medium sm:pt-0.5">
                    {edu.period}
                  </div>
                  {/* Landmark and Credential details */}
                  <div id={`${eduID}-details`} className="flex-1">
                    <h3 id={`${eduID}-institution`} className="font-semibold text-[14px] text-zinc-900 font-sans tracking-tight">
                      {edu.institution}
                    </h3>
                    <p id={`${eduID}-credential`} className="text-[13px] text-zinc-700 leading-relaxed mt-0.5">
                      {edu.credential} {edu.details && <span id={`${eduID}-extra`} className="text-zinc-500">{edu.details}</span>}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {educations.length === 0 && (
              <p id="education-empty" className="text-sm text-zinc-400 italic">No education history details provided.</p>
            )}
          </div>
        </section>

        {/* RECENT PROJECTS Section */}
        <section id="section-projects" className="scroll-mt-24">
          <h2 id="heading-projects" className="text-[11px] font-bold uppercase tracking-widest text-zinc-800 mb-6">
            RECENT PROJECTS
          </h2>
          
          <div id="projects-list" className="space-y-8">
            {projects.map((proj, index) => {
              const projID = `project-item-${index}`;
              return (
                <div key={proj.id || index} id={projID} className="space-y-2">
                  <div id={`${projID}-header`} className="flex items-center justify-between">
                    <h3 id={`${projID}-title`} className="font-semibold text-[14px] text-zinc-900 font-sans tracking-tight">
                      {proj.title}
                    </h3>
                  </div>

                  {/* If description exists (NeuroStream / PySynth) */}
                  {proj.description && (
                    <p id={`${projID}-desc`} className="text-[13px] text-zinc-600 font-normal leading-relaxed">
                      {proj.description}
                    </p>
                  )}

                  {/* Technologies tags for matching project types */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div id={`${projID}-tags`} className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((tech, techIdx) => (
                        <span 
                          key={techIdx} 
                          className="bg-zinc-100 text-zinc-500 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullet points for actual experience highlights (Online Assessment etc.) */}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul id={`${projID}-bullets`} className="list-disc list-outside pl-4 space-y-2 text-[13px] text-zinc-600 font-normal">
                      {proj.bulletPoints.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="leading-relaxed text-justify">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            
            {projects.length === 0 && (
              <p id="projects-empty" className="text-sm text-zinc-400 italic">No recent projects included.</p>
            )}
          </div>
        </section>

        <BlogSection />

      </div>

      {/* Footer matching standard design */}
      <footer id="portfolio-footer" className="mt-16 pt-8 border-t border-zinc-100 flex flex-col items-center justify-between gap-4 text-center">
        <div id="footer-social-meta" className="flex gap-4 text-[11px] text-zinc-400 font-medium lowercase">
          {personalInfo.twitter && <a id="footer-link-twitter" href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 transition-colors">Twitter</a>}
          {personalInfo.github && <a id="footer-link-github" href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 transition-colors">GitHub</a>}
          {personalInfo.linkedin && <a id="footer-link-linkedin" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 transition-colors">LinkedIn</a>}
        </div>
        <div id="footer-copyright" className="text-[11px] text-zinc-400 font-normal tracking-wide">
          © {new Date().getFullYear()} Devanshu Parmar. Building software, AI systems, and useful things.
        </div>
      </footer>

    </div>
  );
}
