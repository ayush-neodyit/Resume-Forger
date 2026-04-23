import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Link as LinkIcon,
  Palette
} from 'lucide-react';
import { ResumeData, Education, Experience, Skill, Project } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>('personal');

  const updatePersonal = (field: keyof typeof data.personal, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const addItem = (section: 'education' | 'experience' | 'skills' | 'projects') => {
    const id = crypto.randomUUID();
    const newData = { ...data };
    
    if (section === 'education') {
      newData.education.push({ id, school: '', degree: '', startDate: '', endDate: '', description: '' });
    } else if (section === 'experience') {
      newData.experience.push({ id, company: '', position: '', startDate: '', endDate: '', description: '' });
    } else if (section === 'skills') {
      newData.skills.push({ id, name: '', level: 'Intermediate' });
    } else if (section === 'projects') {
      newData.projects.push({ id, name: '', description: '', link: '' });
    }
    
    onChange(newData);
  };

  const removeItem = (section: 'education' | 'experience' | 'skills' | 'projects', id: string) => {
    const newData = { ...data };
    // @ts-ignore
    newData[section] = newData[section].filter((item: any) => item.id !== id);
    onChange(newData);
  };

  const updateItem = (section: 'education' | 'experience' | 'skills' | 'projects', id: string, field: string, value: any) => {
    const newData = { ...data };
    // @ts-ignore
    newData[section] = newData[section].map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(newData);
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: LinkIcon },
    { id: 'templates', label: 'Templates', icon: Palette },
  ];

  return (
    <div className="w-80 h-full bg-slate-900 text-white flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-tight">Editor</h2>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Workspace v1.0</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {tabs.map((tab) => (
          <div key={tab.id} className="border-b border-slate-800/50">
            <button
              onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
              className={cn(
                "w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-slate-800/50",
                activeTab === tab.id && "bg-slate-800/50 text-sky-400"
              )}
            >
              <div className="flex items-center gap-3 font-medium text-sm">
                <tab.icon size={16} />
                {tab.label}
              </div>
              {activeTab === tab.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {activeTab === tab.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-950/50"
                >
                  <div className="p-6 space-y-4">
                    {tab.id === 'personal' && (
                      <div className="space-y-4">
                        <Input label="Full Name" value={data.personal.fullName} onChange={(v) => updatePersonal('fullName', v)} />
                        <Input label="Job Title" value={data.personal.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} />
                        <Input label="Email" value={data.personal.email} onChange={(v) => updatePersonal('email', v)} />
                        <Input label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal('phone', v)} />
                        <Input label="Location" value={data.personal.location} onChange={(v) => updatePersonal('location', v)} />
                        <Input label="Website" value={data.personal.website} onChange={(v) => updatePersonal('website', v)} />
                        <TextArea label="Summary" value={data.personal.summary} onChange={(v) => updatePersonal('summary', v)} />
                      </div>
                    )}

                    {tab.id === 'experience' && (
                      <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                          <div key={exp.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3 relative group">
                            <button 
                              onClick={() => removeItem('experience', exp.id)}
                              className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Input label="Company" value={exp.company} onChange={(v) => updateItem('experience', exp.id, 'company', v)} />
                            <Input label="Position" value={exp.position} onChange={(v) => updateItem('experience', exp.id, 'position', v)} />
                            <div className="grid grid-cols-2 gap-2">
                              <Input label="Start" value={exp.startDate} onChange={(v) => updateItem('experience', exp.id, 'startDate', v)} />
                              <Input label="End" value={exp.endDate} onChange={(v) => updateItem('experience', exp.id, 'endDate', v)} />
                            </div>
                            <TextArea label="Description" value={exp.description} onChange={(v) => updateItem('experience', exp.id, 'description', v)} />
                          </div>
                        ))}
                        <button 
                          onClick={() => addItem('experience')}
                          className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
                        >
                          <Plus size={14} /> Add Experience
                        </button>
                      </div>
                    )}

                    {tab.id === 'education' && (
                      <div className="space-y-6">
                        {data.education.map((edu) => (
                          <div key={edu.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3 relative group">
                            <button 
                              onClick={() => removeItem('education', edu.id)}
                              className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Input label="School" value={edu.school} onChange={(v) => updateItem('education', edu.id, 'school', v)} />
                            <Input label="Degree" value={edu.degree} onChange={(v) => updateItem('education', edu.id, 'degree', v)} />
                            <div className="grid grid-cols-2 gap-2">
                              <Input label="Start" value={edu.startDate} onChange={(v) => updateItem('education', edu.id, 'startDate', v)} />
                              <Input label="End" value={edu.endDate} onChange={(v) => updateItem('education', edu.id, 'endDate', v)} />
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => addItem('education')}
                          className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
                        >
                          <Plus size={14} /> Add Education
                        </button>
                      </div>
                    )}

                    {tab.id === 'skills' && (
                      <div className="space-y-6">
                        {data.skills.map((skill) => (
                          <div key={skill.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex flex-col gap-3 relative group">
                            <button 
                              onClick={() => removeItem('skills', skill.id)}
                              className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Input label="Skill Name" value={skill.name} onChange={(v) => updateItem('skills', skill.id, 'name', v)} />
                            <select 
                              value={skill.level}
                              onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs outline-none focus:border-sky-500 transition-colors"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </div>
                        ))}
                        <button 
                          onClick={() => addItem('skills')}
                          className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
                        >
                          <Plus size={14} /> Add Skill
                        </button>
                      </div>
                    )}

                    {tab.id === 'projects' && (
                      <div className="space-y-6">
                        {data.projects.map((proj) => (
                          <div key={proj.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3 relative group">
                            <button 
                              onClick={() => removeItem('projects', proj.id)}
                              className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                            <Input label="Project Name" value={proj.name} onChange={(v) => updateItem('projects', proj.id, 'name', v)} />
                            <Input label="Link" value={proj.link} onChange={(v) => updateItem('projects', proj.id, 'link', v)} />
                            <TextArea label="Description" value={proj.description} onChange={(v) => updateItem('projects', proj.id, 'description', v)} />
                          </div>
                        ))}
                        <button 
                          onClick={() => addItem('projects')}
                          className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
                        >
                          <Plus size={14} /> Add Project
                        </button>
                      </div>
                    )}

                    {tab.id === 'templates' && (
                      <div className="grid grid-cols-1 gap-4">
                        {['classic', 'modern', 'minimal'].map((tmplt) => (
                          <button
                            key={tmplt}
                            onClick={() => onChange({ ...data, templateId: tmplt })}
                            className={cn(
                              "relative p-4 rounded-lg border-2 transition-all uppercase tracking-widest font-black text-[10px]",
                              data.templateId === tmplt 
                                ? "border-sky-500 bg-sky-500/10 text-sky-400" 
                                : "border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-700"
                            )}
                          >
                            {tmplt} Template
                            {data.templateId === tmplt && (
                              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-500 rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs outline-none focus:border-sky-500 transition-colors text-slate-200"
    />
  </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
    <textarea 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs outline-none focus:border-sky-500 transition-colors text-slate-200 resize-none h-24"
    />
  </div>
);
