'use client';

import { useState } from 'react';
import { Grid3X3, List, Filter, Check, ChevronRight, Users, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const allClients = [
  { name: 'James Thomas',    role: 'Client', img: '/images/user-avatar-1.jpg' },
  { name: 'Reynante Labares', role: 'Client', img: '/images/user-avatar-2.jpg' },
  { name: 'Owen Bongcaras',  role: 'Client', img: '/images/user-avatar-3.jpg' },
  { name: 'Stephen Metcalfe', role: 'Client', img: '/images/user-avatar-4.jpg' },
  { name: 'Socrates Itumay', role: 'Client', img: '/images/user-avatar-5.jpg' },
  { name: 'Petey Cruiser',   role: 'Client', img: '/images/user-avatar-6.jpg' },
];

export function ClientsTab() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allClients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-3 border border-border rounded-[5px] text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/40 bg-card" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
        <div className="flex gap-2">
          {(['grid', 'list'] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`h-10 px-4 flex items-center gap-2 rounded-[5px] text-[13px] font-bold uppercase transition-all ${viewMode === mode ? 'bg-primary text-white shadow-sm' : 'bg-card text-muted-foreground border border-border'}`}>
              {mode === 'grid' ? <Grid3X3 size={16} /> : <List size={16} />} {mode}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((client, i) => (
            <div key={i} className="bg-card rounded-[5px] border border-border p-8 text-center hover:shadow-md transition-all">
              <div className="mb-4 flex justify-center">
                <Avatar className="w-[100px] h-[100px] border-2 border-primary/10">
                  <AvatarImage src={client.img} className="rounded-full object-cover" />
                  <AvatarFallback className="bg-muted text-primary font-bold">{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <h5 className="text-foreground text-[16px] font-bold mb-1">{client.name}</h5>
              <p className="text-muted-foreground text-[13px]">{client.role}</p>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {filtered.map((client, i) => (
            <div key={i} className="bg-card rounded-[5px] border border-border p-4 flex gap-4 hover:shadow-md transition-all">
              <Avatar className="w-[50px] h-[50px] shrink-0">
                <AvatarImage src={client.img} className="object-cover" />
                <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <h4 className="text-foreground text-[14px] font-bold uppercase tracking-wide">{client.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-card rounded-[5px] border border-border border-dashed">
          <Users size={48} className="mx-auto text-muted mb-4 opacity-20" />
          <p className="text-foreground text-[16px] font-bold">No clients found</p>
        </div>
      )}
    </div>
  );
}
