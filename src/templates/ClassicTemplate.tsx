import React from 'react';
import { ResumeData } from '../types';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div id="resume-preview" className="bg-white p-12 shadow-inner min-h-[1056px] text-[#333] font-serif leading-relaxed">
      <div className="text-center border-b-2 border-black pb-4 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest">{data.personal.fullName || 'YOUR NAME'}</h1>
        <div className="flex justify-center gap-4 text-sm mt-2 flex-wrap">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.website && <a href={data.personal.website} className="underline">{data.personal.website}</a>}
        </div>
      </div>

      {data.personal.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Professional Summary</h2>
          <p className="text-sm whitespace-pre-line">{data.personal.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{exp.position}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="italic mb-1">{exp.company}</div>
              <p className="text-sm pl-4 whitespace-pre-line border-l-2 border-gray-200">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{edu.degree}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="italic">{edu.school}</div>
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span key={skill.id} className="text-sm border border-gray-300 px-2 py-1 bg-gray-50 uppercase tracking-tighter">
                {skill.name} • {skill.level}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{proj.name}</span>
                {proj.link && <span className="text-xs font-normal underline">{proj.link}</span>}
              </div>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
