'use client';

import { useState } from 'react';
import { Grid3X3, List, Filter, Check, ChevronRight, Image as ImageIcon, MapPin } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';

export function EventsTab() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allEvents = [
    { imgId: 'wedding-event', name: 'Wedding Event', location: 'Chennai' },
    { imgId: 'corporate-event', name: 'Corporate Event', location: 'Coimbatore' },
    { imgId: 'product-launch', name: 'Product Launch', location: 'Madurai' },
    { imgId: 'birthday-party', name: 'Birthday Party', location: 'Trichy' },
    { imgId: 'corporate-event', name: 'Tech Conference', location: 'Chennai' },
    { imgId: 'music-concert', name: 'Music Concert', location: 'Coimbatore' },
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || event.location === selectedCity;
    return matchesSearch && matchesCity;
  });

  const cities = Array.from(new Set(allEvents.map(event => event.location))).sort();
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const currentEvents = sortedEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full px-4 py-3 border border-border rounded-[5px] text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all bg-card" />
        </div>
        <div className="flex gap-2">
          {['grid', 'list'].map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`h-10 px-4 flex items-center gap-2 rounded-[5px] text-[13px] font-bold uppercase transition-all ${viewMode === mode ? 'bg-primary text-white shadow-sm' : 'bg-card text-muted-foreground border border-border'}`}>
              {mode === 'grid' ? <Grid3X3 size={16} /> : <List size={16} />} {mode}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentEvents.map((event, i) => (
            <div key={i} className="bg-card rounded-[5px] border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                <SafeImage src={`/images/${event.imgId}-600.jpg`} width={600} height={400} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-foreground text-[15px] font-bold mb-3 uppercase tracking-wide">{event.name}</h4>
                <div className="w-[30px] h-[2px] bg-primary mx-auto mb-3" />
                <p className="text-muted-foreground text-[13px] font-medium italic flex items-center justify-center gap-1"><MapPin size={12} />{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {currentEvents.map((event, i) => (
            <div key={i} className="bg-card rounded-[5px] border border-border p-4 flex gap-4 hover:shadow-md transition-all group cursor-pointer">
              <div className="w-[120px] h-[80px] bg-muted overflow-hidden rounded-[3px] shrink-0">
                <SafeImage src={`/images/${event.imgId}-600.jpg`} width={200} height={133} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex items-center">
                <div>
                  <h4 className="text-foreground text-[14px] font-bold uppercase tracking-wide mb-2">{event.name}</h4>
                  <p className="text-muted-foreground text-[12px] font-medium flex items-center gap-1"><MapPin size={12} />{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon size={48} className="mx-auto text-muted mb-4" />
          <p className="text-muted-foreground text-[14px] font-medium">No events found</p>
        </div>
      )}
    </div>
  );
}
