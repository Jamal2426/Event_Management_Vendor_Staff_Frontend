import Link from 'next/link';
import { Inbox, Star, Clock, Bookmark, Send, Edit, AlertCircle, MessageSquare, Mail, Users, Trash2, Folder } from 'lucide-react';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none mb-6 font-["Roboto",sans-serif]';

export function MailSidebar() {
  return (
    <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 flex flex-col">
      <div className={`${cardClass} p-6 h-full mb-0`}>
        <Link href="/dashboard/mail/compose">
          <button className="w-full bg-primary text-white py-2.5 rounded-[5px] text-[13px] font-bold tracking-wider hover:bg-primary/90 transition-all mb-6 shadow-sm">COMPOSE</button>
        </Link>

        <ul className="space-y-1 mb-8">
          {[
            { href: '/dashboard/mail', icon: <Inbox size={18} />, label: 'Inbox', count: 20, active: true },
            { icon: <Star size={18} />, label: 'Starred', count: 3 },
            { icon: <Clock size={18} />, label: 'Snoozed', count: 6 },
            { icon: <Bookmark size={18} />, label: 'Important', count: 10 },
            { icon: <Send size={18} />, label: 'Sent Mail', count: 8 },
            { icon: <Edit size={18} />, label: 'Drafts', count: 15 },
            { icon: <AlertCircle size={18} />, label: 'Spam', count: 128 },
            { icon: <MessageSquare size={18} />, label: 'Chats', count: 14 },
            { icon: <Mail size={18} />, label: 'All Mail', count: 652 },
            { icon: <Users size={18} />, label: 'Contacts', count: 547 },
            { icon: <Trash2 size={18} />, label: 'Trash', count: 6 },
          ].map((item, i) => (
            <li key={i}>
              {item.href ? (
                <Link href={item.href}>
                  <button className={`w-full flex items-center justify-between px-3 py-2 rounded-[3px] transition-all font-bold ${item.active ? 'text-primary bg-muted' : 'text-muted-foreground hover:bg-muted font-medium'}`}>
                    <div className="flex items-center gap-3 text-[14px]">{item.icon} {item.label}</div>
                    <span className="text-[13px]">{item.count}</span>
                  </button>
                </Link>
              ) : (
                <button className="w-full flex items-center justify-between px-3 py-2 text-muted-foreground hover:bg-muted rounded-[3px] transition-all font-medium group">
                  <div className="flex items-center gap-3 text-[14px] group-hover:text-foreground">{item.icon} {item.label}</div>
                  <span className="text-[13px]">{item.count}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mb-8">
          <h6 className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-4 px-3">LABEL</h6>
          <ul className="space-y-1">
            {[
              { color: 'text-primary', label: 'Social', count: 10 },
              { color: 'text-green-500', label: 'Promotions', count: 22 },
              { color: 'text-sky-500', label: 'Updates', count: 17 },
            ].map((item) => (
              <li key={item.label}>
                <button className="w-full flex items-center justify-between px-3 py-2 text-muted-foreground hover:bg-muted rounded-[3px] transition-all font-medium group">
                  <div className="flex items-center gap-3 text-[14px] group-hover:text-foreground">
                    <Folder size={18} className={item.color} /> {item.label}
                  </div>
                  <span className="text-[13px]">{item.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
