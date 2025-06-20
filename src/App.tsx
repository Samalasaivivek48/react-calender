import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './index.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Project Kickoff',
    start: '2025-06-20T10:00:00',
    end: '2025-06-20T11:00:00',
  },
  {
    id: '2',
    title: 'Lunch with Sarah',
    start: '2025-06-21T12:30:00',
  },
  {
    id: '3',
    title: 'Design Review',
    start: '2025-06-22',
    allDay: true,
  },
  {
    id: '4',
    title: 'Marketing Call',
    start: '2025-06-23T16:00:00',
  },
];

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const handleDateClick = (arg: { dateStr: string }) => {
    const title = prompt('Add event title:');
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title,
          start: arg.dateStr,
          allDay: true,
        },
      ]);
    }
  };

  const handleEventClick = ({ event }: any) => {
    if (window.confirm(`Delete "${event.title}"?`)) {
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    }
  };

  return (
    <div className="calendar-container">
      <h1> Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable
        selectable
        eventColor="#1a73e8"
        height="auto"
      />
    </div>
  );
};

export default App;
