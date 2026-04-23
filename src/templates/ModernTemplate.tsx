import React from 'react';
import { ResumeData } from '../types';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div id="resume-preview" className="bg-white flex shadow-inner min-h-[1056px] text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-8 space-y-8">
        <div className="space-y-4">
          {data.personal.fullName && <h1 className="text-3xl font-bold leading-tight">{data.personal.fullName}</h1>}
          <p className="text-slate-300 text-sm">{data.personal.jobTitle}</p>
        </div>

        <div className="space-y-4 text-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-1">Contact</h2>
          <div className="space-y-2">
            {data.personal.email && <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase font-bold">Email</span>{data.personal.email}</div>}
            {data.personal.phone && <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase font-bold">Phone</span>{data.personal.phone}</div>}
            {data.personal.location && <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase font-bold">Location</span>{data.personal.location}</div>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="space-y-4 text-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-1">Skills</h2>
            <ul className="space-y-2">
              {data.skills.map(skill => (
                <li key={skill.id} className="flex justify-between items-center group">
                  <span>{skill.name}</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded uppercase">{skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-12 space-y-10">
        {data.personal.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-4 border-b-2 border-sky-100 pb-1">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-600">{data.personal.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-4 border-b-2 border-sky-100 pb-1">Experience</h2>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-sky-500 before:rounded-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-4 border-b-2 border-sky-100 pb-1">Education</h2>
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-300 before:rounded-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-xs font-medium text-gray-500">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-4 border-b-2 border-sky-100 pb-1">Selected Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map(proj => (
                <div key={proj.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800">{proj.name}</h3>
                    {proj.link && <span className="text-[10px] transition-colors hover:text-sky-600 text-gray-400 underline">{proj.link}</span>}
                  </div>
                  <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
