import React, { useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { ResumeData } from '../types';
import { Download, FileText, Smartphone, Monitor, Moon, Sun, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const initialData: ResumeData = {
  personal: {
    fullName: 'Alex Rivera',
    jobTitle: 'Senior Software Architect',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    website: 'alexrivera.dev',
    summary: 'Multi-disciplinary developer with 8+ years of experience in distributed systems and high-performance web applications. Passionate about clean code, scalability, and mentoring teams.'
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Systems',
      position: 'Lead Backend Engineer',
      startDate: '2020',
      endDate: 'Present',
      description: '• Architected a real-time analytics engine processing 1M events/sec\n• Led transition from monolith to microservices using Go and gRPC\n• Reduced infrastructure costs by 40% through Kubernetes optimization'
    },
    {
      id: '2',
      company: 'Orbit Creative',
      position: 'Senior Developer',
      startDate: '2017',
      endDate: '2020',
      description: '• Developed high-traffic e-commerce platforms for major retail brands\n• Implemented automated CI/CD pipelines reducing deployment time by 60%\n• Optimized frontend performance resulting in 15% increase in conversion'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'M.S. in Computer Science',
      startDate: '2015',
      endDate: '2017',
      description: 'Focus on Distributed Systems and Machine Learning'
    }
  ],
  skills: [
    { id: '1', name: 'TypeScript/Node.js', level: 'Expert' },
    { id: '2', name: 'Go', level: 'Advanced' },
    { id: '3', name: 'System Design', level: 'Expert' },
    { id: '4', name: 'Kubierrez/Docker', level: 'Advanced' }
  ],
  projects: [
    {
      id: '1',
      name: 'CloudScale Monitoring',
      description: 'Open-source distributed monitoring tool for hybrid cloud environments.',
      link: 'github.com/alexr/cloudscale'
    }
  ],
  templateId: 'modern'
};

export const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume-data');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  React.useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(data));
  }, [data]);

  const exportPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderTemplate = () => {
    switch (data.templateId) {
      case 'classic': return <ClassicTemplate data={data} />;
      case 'minimal': return <MinimalTemplate data={data} />;
      case 'modern':
      default: return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar data={data} onChange={setData} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Toolbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-sky-500 text-white rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Resume Builder</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Live Preview Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 rounded-lg p-1 flex mr-4">
              <button 
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Smartphone size={16} />
              </button>
            </div>

            <button 
              onClick={() => {
                if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                  setData(initialData);
                }
              }}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors mr-2"
              title="Reset Data"
            >
              <Trash2 size={18} />
            </button>

            <button 
              onClick={exportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download size={14} />
              {isExporting ? 'Generating...' : 'Export PDF'}
            </button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-slate-100 custom-scrollbar">
          <div className={`mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[210mm]'}`}>
             <div className="bg-white shadow-2xl origin-top transition-transform duration-500 hover:scale-[1.01]">
                {renderTemplate()}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};
