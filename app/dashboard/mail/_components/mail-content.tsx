'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Star, Trash2, Folder, CheckSquare, RotateCw, MailOpen, AlertOctagon, Tag, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MailSidebar } from './mail-sidebar';
import { PageHeader } from '@/components/common/PageHeader';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none mb-6 font-["Roboto",sans-serif]';

interface Email {
  id: number; sender: string; avatar: string; subject: string; snippet: string;
  time: string; isUnread: boolean; isStarred: boolean; hasAttachment: boolean;
  selected: boolean; initials: string;
}

const initialEmails: Email[] = [
  { id: 1, sender: 'Adrian Monino',   avatar: '/images/user-avatar-1.jpg', subject: 'Someone who believes in you',     snippet: 'enean commodo li gula eget dolor cum socia...', time: '11:30am',  isUnread: true,  isStarred: false, hasAttachment: true,  selected: false, initials: 'AM' },
  { id: 2, sender: 'Albert Ansing',   avatar: '/images/user-avatar-2.jpg', subject: "Here's What You Missed This Week", snippet: 'enean commodo li gula eget dolor cum socia...', time: '06:50am',  isUnread: true,  isStarred: true,  hasAttachment: false, selected: false, initials: 'AA' },
  { id: 3, sender: 'Carla Guden',     avatar: '/images/user-avatar-3.jpg', subject: '4 Ways to Optimize Your Search',   snippet: 'viva mus elemen tum semper nisi enean...',     time: 'Yesterday', isUnread: false, isStarred: false, hasAttachment: true,  selected: false, initials: 'CG' },
  { id: 4, sender: 'Reven Galeon',    avatar: '/images/user-avatar-4.jpg', subject: "We're Giving a Macbook for Free",  snippet: 'viva mus elemen tum semper nisi enean...',     time: 'Yesterday', isUnread: false, isStarred: false, hasAttachment: false, selected: false, initials: 'RG' },
  { id: 5, sender: 'Elisse Tan',      avatar: '/images/user-avatar-5.jpg', subject: 'Keep Your Personal Data Safe',      snippet: 'viva mus elemen tum semper nisi enean...',     time: 'Oct 13',    isUnread: false, isStarred: false, hasAttachment: false, selected: false, initials: 'ET' },
  { id: 6, sender: 'Marianne Audrey', avatar: '/images/user-avatar-6.jpg', subject: "We've Made Some Changes",           snippet: 'viva mus elemen tum semper nisi enean...',     time: 'Oct 13',    isUnread: false, isStarred: false, hasAttachment: false, selected: false, initials: 'MA' },
];

export function MailContent() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const v = !selectAll;
    setSelectAll(v);
    setEmails(emails.map(e => ({ ...e, selected: v })));
  };

  const toggleSelect = (id: number) => setEmails(emails.map(e => e.id === id ? { ...e, selected: !e.selected } : e));
  const toggleStar   = (id: number) => setEmails(emails.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e));

  return (
    <div className="h-[calc(100vh-86px)] overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar font-['Roboto',sans-serif]">
      <div className="space-y-6 max-w-[1700px] mx-auto">
        <PageHeader title="Mail" subtitle="Manage your mail and communications." total={emails.length} />

        <div className="flex flex-col lg:flex-row gap-[30px] mb-6 lg:h-[800px] items-stretch">
          <MailSidebar />

          <div className="flex-1 min-w-0 flex flex-col h-full">
            <div className={`${cardClass} bg-card flex-1 flex flex-col mb-0 overflow-hidden`}>
              <div className="p-6 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="text-foreground text-[30px] font-normal leading-tight tracking-[-0.5px] uppercase">Inbox</h2>
                  <span className="text-muted-foreground text-[13px]">1-50 of 1200</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4 border-transparent">
                  <p className="text-muted-foreground text-[14px]">You have 2 unread messages</p>
                  <div className="flex">
                    <button className="w-[30px] h-[30px] border border-border border-r-0 rounded-l-[3px] flex items-center justify-center text-muted-foreground hover:bg-gray-50"><ChevronLeft size={16} /></button>
                    <button className="w-[30px] h-[30px] border border-border rounded-r-[3px] flex items-center justify-center text-muted-foreground hover:bg-gray-50"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-y border-border bg-muted/50 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group" onClick={toggleSelectAll}>
                  <div className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border ${selectAll ? 'bg-primary border-primary' : 'bg-transparent border-[#c4c9d7]'} transition-all`}>
                    {selectAll && <CheckSquare size={12} className="text-white" />}
                  </div>
                  <span className="text-[14px] text-muted-foreground">Select All</span>
                </label>
                <div className="flex items-center gap-2">
                  {[RotateCw, MailOpen, AlertOctagon, Trash2, Folder, Tag].map((Icon, i) => (
                    <button key={i} className="w-[36px] h-[36px] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"><Icon size={16} /></button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pb-6">
                {emails.map((email) => (
                  <div key={email.id} className={`group flex items-start gap-4 pt-[22px] pb-[20px] pl-[30px] pr-6 border-b border-border cursor-pointer ${email.selected ? 'bg-primary/5' : 'bg-card hover:bg-muted/30'}`}>
                    <div className="flex items-center gap-[18px] shrink-0 mt-[1px]">
                      <label className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleSelect(email.id); }}>
                        <div className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border ${email.selected ? 'bg-primary border-primary' : 'bg-transparent border-[#c4c9d7]'} transition-all`}>
                          {email.selected && <CheckSquare size={12} className="text-white" />}
                        </div>
                      </label>
                      <button onClick={(e) => { e.stopPropagation(); toggleStar(email.id); }} className={`hover:scale-110 transition-transform ${email.isStarred ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        <Star size={16} className={email.isStarred ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <div className="flex flex-1 min-w-0 items-start gap-4 ml-2">
                      <Avatar className="w-[32px] h-[32px] shrink-0 mt-0">
                        <AvatarImage src={email.avatar} className="object-cover rounded-full" />
                        <AvatarFallback className="bg-primary text-white font-bold text-[12px] rounded-full">{email.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1.5">
                          <p className={`text-[13px] font-bold truncate ${email.isUnread ? 'text-foreground' : 'text-muted-foreground'}`}>{email.sender}</p>
                          <div className="flex items-center gap-3 shrink-0 ml-4 -mt-0.5">
                            {email.hasAttachment && <Paperclip size={14} className="text-foreground" />}
                            <span className="text-[12px] text-muted-foreground whitespace-nowrap">{email.time}</span>
                          </div>
                        </div>
                        <p className="text-[14px] font-bold leading-[14px] mb-[7px] truncate">{email.subject}</p>
                        <p className="text-[13px] leading-[13px] text-muted-foreground truncate">{email.snippet}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
