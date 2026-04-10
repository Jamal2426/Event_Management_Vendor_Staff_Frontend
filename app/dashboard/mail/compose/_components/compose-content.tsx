'use client';

import { Paperclip, Link, Image as ImageIcon, Trash2 } from 'lucide-react';
import { MailSidebar } from '../../_components/mail-sidebar';
import { PageHeader } from '@/components/common/PageHeader';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none font-["Roboto",sans-serif]';

export function ComposeContent() {
  return (
    <div className="bg-background min-h-screen -mt-6 -mx-6 -mb-6 p-6 font-['Roboto',sans-serif]">
      <PageHeader title="Compose" subtitle="Draft and send a new message." />

      <div className="flex flex-col lg:flex-row gap-[30px] mb-6 lg:h-[800px] items-stretch">
        <MailSidebar />

        <div className="flex-1 min-w-0 flex flex-col h-full">
          <div className={`${cardClass} bg-card flex-1 flex flex-col mb-0 overflow-hidden`}>
            <div className="p-6 border-b border-border">
              <h2 className="text-foreground text-[14px] font-bold uppercase tracking-wider">Compose New Message</h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="w-16 text-[14px] font-medium text-foreground">To</label>
                  <input type="text" className="flex-1 bg-transparent border border-border rounded-[3px] px-4 py-2 text-[14px] focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-16 text-[14px] font-medium text-foreground">Subject</label>
                  <input type="text" className="flex-1 bg-transparent border border-border rounded-[3px] px-4 py-2 text-[14px] focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[14px] font-medium text-foreground">Message</label>
                  <textarea className="w-full h-[400px] bg-transparent border border-border rounded-[3px] px-4 py-4 text-[14px] focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                {[Paperclip, Link, ImageIcon, Trash2].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 flex items-center justify-center hover:bg-muted rounded-[3px] transition-colors"><Icon size={18} /></button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-6 py-2 bg-[#f8f9fa] border border-border text-foreground rounded-[5px] text-[13px] font-bold hover:bg-gray-100">Discard</button>
                <button className="px-6 py-2 bg-primary text-white rounded-[5px] text-[13px] font-bold hover:brightness-110">Save</button>
                <button className="px-6 py-2 bg-destructive text-white rounded-[5px] text-[13px] font-bold hover:brightness-110">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
