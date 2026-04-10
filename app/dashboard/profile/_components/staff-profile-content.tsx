'use client';

import { useState } from 'react';
import { User, Settings, Image as ImageIcon, Users } from 'lucide-react';
import { useStaffMe } from '@/hooks/use-staff-auth';
import { SidebarProfileCard } from './sidebar-profile-card';
import { LocationCard } from './location-card';
import { ProfileStats } from './profile-stats';
import { AboutTab } from './tabs/about-tab';
import { EventsTab } from './tabs/events-tab';
import { ClientsTab } from './tabs/clients-tab';
import { SettingsTab } from './tabs/settings-tab';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none mb-6 font-["Roboto",sans-serif]';

export function StaffProfileContent() {
  const { data: staff, isLoading } = useStaffMe();
  const [activeTab, setActiveTab] = useState('about');

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  return (
    <div className="h-[calc(100vh-86px)] overflow-y-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6 font-['Roboto',sans-serif]">
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #0162e8; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0156cc; }
        `}</style>

        <div className="flex flex-col lg:flex-row gap-6 items-start mb-6">
          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-8 space-y-6">
            <SidebarProfileCard staff={staff} />
            <LocationCard />
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            <ProfileStats />

            <div className={cardClass}>
              <div className="bg-accent p-1.5 flex gap-1">
                {[
                  { id: 'about',    label: 'ABOUT ME',  icon: <User size={15} /> },
                  { id: 'events',   label: 'EVENTS',    icon: <ImageIcon size={15} /> },
                  { id: 'clients',  label: 'CLIENTS',   icon: <Users size={15} /> },
                  { id: 'settings', label: 'SETTINGS',  icon: <Settings size={15} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-[12px] font-bold rounded-[3px] transition-all outline-none ${
                      activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8 h-[957px] overflow-y-auto custom-scrollbar">
                {activeTab === 'about'    && <AboutTab />}
                {activeTab === 'events'   && <EventsTab />}
                {activeTab === 'clients'  && <ClientsTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
