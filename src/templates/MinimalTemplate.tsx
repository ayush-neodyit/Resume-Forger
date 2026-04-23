import React from 'react';
import { ResumeData } from '../types';

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div id="resume-preview" className="bg-white p-16 shadow-inner min-h-[1056px] text-[#444] font-mono lowercase">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-black mb-2 tracking-tighter">{data.personal.fullName || 'name goes here'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-60">
          <span>{data.personal.email}</span>
          <span>/</span>
          <span>{data.personal.phone}</span>
          <span>/</span>
          <span>{data.personal.location}</span>
          {data.personal.website && (
            <>
              <span>/</span>
              <span>{data.personal.website}</span>
            </>
          )}
        </div>
      </header>

      <div className="space-y-12">
        {data.personal.summary && (
          <section>
            <div className="text-black font-bold mb-4 uppercase tracking-widest text-[10px]">.about</div>
            <p className="text-sm border-l-4 border-black pl-6 py-2 leading-relaxed">{data.personal.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.experience.length > 0 && (
            <section className="col-span-2">
              <div className="text-black font-bold mb-6 uppercase tracking-widest text-[10px]">.experience</div>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-1 mb-2">
                      <span className="font-bold text-black uppercase tracking-tight">{exp.position}</span>
                      <span className="text-[10px] opacity-40">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-xs font-bold mb-2 uppercase opacity-60 italic">{exp.company}</div>
                    <p className="text-xs leading-loose whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <div className="text-black font-bold mb-6 uppercase tracking-widest text-[10px]">.education</div>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-black text-xs uppercase">{edu.degree}</div>
                    <div className="text-[10px] opacity-60">{edu.school}</div>
                    <div className="text-[10px] opacity-40">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <div className="text-black font-bold mb-6 uppercase tracking-widest text-[10px]">.skills</div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <div key={skill.id} className="text-[10px] bg-black text-white px-2 py-1 uppercase tracking-widest">
                    {skill.name} /// {skill.level}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
