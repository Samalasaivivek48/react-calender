import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin } from 'lucide-react';

const ModernCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Static events data
  const events = [
    {
      id: 1,
      title: "Team Standup",
      date: "2025-06-20",
      time: "09:00",
      duration: 30,
      type: "meeting",
      attendees: 8,
      location: "Conference Room A"
    },
    {
      id: 2,
      title: "Product Launch",
      date: "2025-06-20",
      time: "14:00",
      duration: 120,
      type: "event",
      attendees: 25,
      location: "Main Hall"
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "2025-06-22",
      time: "10:30",
      duration: 90,
      type: "presentation",
      attendees: 6,
      location: "Zoom"
    },
    {
      id: 4,
      title: "Design Review",
      date: "2025-06-25",
      time: "15:00",
      duration: 60,
      type: "review",
      attendees: 4,
      location: "Design Studio"
    },
    {
      id: 5,
      title: "Weekly Retrospective",
      date: "2025-06-27",
      time: "16:00",
      duration: 45,
      type: "meeting",
      attendees: 12,
      location: "Conference Room B"
    },
    {
      id: 6,
      title: "Code Review Session",
      date: "2025-06-19",
      time: "11:00",
      duration: 75,
      type: "review",
      attendees: 5,
      location: "Dev Room"
    },
    {
      id: 7,
      title: "Marketing Campaign Kickoff",
      date: "2025-06-24",
      time: "13:30",
      duration: 90,
      type: "event",
      attendees: 15,
      location: "Marketing Lounge"
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return events.filter(event => event.date === dateKey);
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date) => {
    return date.getMonth() === currentMonth;
  };

  const handleDateClick = (date) => {
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      setSelectedDate(date);
      setSelectedEvents(dateEvents);
      setShowEventModal(true);
    }
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-500',
      event: 'bg-purple-500',
      presentation: 'bg-green-500',
      review: 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getEventTypeBg = (type) => {
    const colors = {
      meeting: 'bg-blue-50 border-blue-200',
      event: 'bg-purple-50 border-purple-200',
      presentation: 'bg-green-50 border-green-200',
      review: 'bg-orange-50 border-orange-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  const renderCalendarDays = () => {
    const calendarDays = [];
    
    // Previous month's trailing days
    for (let i = 0; i < firstDayWeekday; i++) {
      const date = new Date(currentYear, currentMonth, -firstDayWeekday + i + 1);
      calendarDays.push(
        <div key={`prev-${i}`} className="h-24 p-1 border border-gray-100 bg-gray-50/50 opacity-40">
          <span className="text-xs text-gray-400">{date.getDate()}</span>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(date);
      const isCurrentDay = isToday(date);
      const hasEvents = dayEvents.length > 0;

      calendarDays.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-24 p-1 border border-gray-100 relative transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer group ${
            isCurrentDay ? 'bg-blue-100 border-blue-300' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isCurrentDay ? 'text-blue-700' : 'text-gray-900'
          }`}>
            {day}
          </div>
          
          {isCurrentDay && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}

          {hasEvents && (
            <div className="space-y-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div
                  key={event.id}
                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(event.type)} opacity-90 hover:opacity-100 transition-opacity`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500 font-medium">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          )}

          {hasEvents && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          )}
        </div>
      );
    }

    // Next month's leading days
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      calendarDays.push(
        <div key={`next-${i}`} className="h-24 p-1 border border-gray-100 bg-gray-50/50 opacity-40">
          <span className="text-xs text-gray-400">{date.getDate()}</span>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {months[currentMonth]} {currentYear}
                </h1>
                <p className="text-gray-600 text-sm">
                  {today.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105 group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 bg-gradient-to-r from-blue-500 to-purple-600">
            {days.map((day) => (
              <div key={day} className="p-4 text-center">
                <span className="text-white font-semibold text-sm">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Events for {selectedDate?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-xl border-2 ${getEventTypeBg(event.type)} transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time} ({event.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Events', value: events.length, color: 'from-blue-500 to-blue-600' },
            { label: 'This Month', value: events.filter(e => e.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)).length, color: 'from-purple-500 to-purple-600' },
            { label: 'Meetings', value: events.filter(e => e.type === 'meeting').length, color: 'from-green-500 to-green-600' },
            { label: 'Reviews', value: events.filter(e => e.type === 'review').length, color: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernCalendar;