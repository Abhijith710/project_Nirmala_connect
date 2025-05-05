import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaSearch, FaGraduationCap, FaUserCircle } from 'react-icons/fa';
import clsx from 'clsx';
import ActionButtons from '../Buttons/ActionButtons';


const dummyData = [
  {
    id: '1',
    title: 'New Semester Begins',
    description: 'Classes for the new semester will start from June 1st.',
    date: '2025-06-01T09:00:00Z',
    type: 'News',
  },
  {
    id: '2',
    title: 'Alumni Meet 2025',
    description: 'Join us for an evening of memories and networking!',
    date: '2025-07-15T18:00:00Z',
    type: 'Activity',
  },
  {
    id: '3',
    title: 'Alumni Meet 2024',
    description: 'Join us for an evening of memories and networking!',
    date: '2025-07-15T18:00:00Z',
    type: 'Activity',
  },
  {
    id: '4',
    title: 'Alumni Meet 2023',
    description: 'Join us for an evening of memories and networking!',
    date: '2025-07-15T18:00:00Z',
    type: 'Activity',
  },
];

const filters = ['All', 'News', 'Announcements'];

const Header = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredAnnouncements = dummyData.filter((item) => {
    const matchesType = selectedFilter === 'All' || item.type === selectedFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div
      style={{
        backgroundColor: '#F0E68C',
        padding: '20px',
        paddingBottom: '0px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          color: '#FFFFFF',
          backgroundColor: '#1976D2',
          padding: '12px 24px',
          borderRadius: '10px',
        }}
      >
        {/* Left: Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaGraduationCap size={28} style={{ marginRight: '10px' }} />
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Nirmala Connect</h1>
        </div>

        {/* Right: Profile and Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <FaUserCircle size={28} />
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#F57C00',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-8"> News/Announcements </h2>

        {/* Search */}
        <div className="relative w-full max-w-md mx-auto mb-6">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-semibold',
                selectedFilter === filter
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-green-100'
              )}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredAnnouncements.length === 0 ? (
            <p className="text-center text-gray-500">No announcements found.</p>
          ) : (
            filteredAnnouncements.map((item) => (
              <div key={item.id} className="flex items-start gap-6 border-b pb-4">
                <div className="text-sm text-gray-500 w-24">
                  {format(new Date(item.date), 'dd MMM yyyy')}
                  <br />
                  {format(new Date(item.date), 'hh:mm a')}
                </div>
                <div className="flex justify-between w-full">
  <div>
    <h3 className="text-xl font-semibold">{item.title}</h3>
    <p className="text-gray-600">{item.description}</p>
  </div>
  <ActionButtons
    onEdit={() => console.log('Edit', item.id)}
    onDelete={() => console.log('Delete', item.id)}
  />
</div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;


