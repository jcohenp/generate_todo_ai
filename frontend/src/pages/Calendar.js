import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Month view
import timeGridPlugin from '@fullcalendar/timegrid'; // Week and day view
import interactionPlugin from '@fullcalendar/interaction'; // Dragging and resizing
import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './calendar.css'; // Import custom styles

// Custom MUI dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6f61',
    },
    background: {
      default: '#1e1e1e',
      paper: '#2b2b2b',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
    },
  },
});

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Team Meeting', start: '2024-11-01T10:00:00', end: '2024-11-01T12:00:00' },
    { title: 'Project Due', start: '2024-11-07' },
  ]);

  // Function to handle clicking on a date to add an event
  const handleDateClick = (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, start: info.dateStr, allDay: true }]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '2rem', backgroundColor: theme.palette.background.default, minHeight: '80vh', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" color="primary">
            Calendar
          </Typography>
        </Box>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" // Set initial view to month
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay', // Allows switching between month, week, and day views
          }}
          events={events} // List of events
          editable={true} // Allow event drag and drop
          selectable={true} // Allow selecting time slots
          dateClick={handleDateClick} // Clicking on a date adds an event
          eventColor="#a73a3a" // Event color in red
          nowIndicator={true} // Show current time
          contentHeight="auto"
          slotDuration="01:00:00" // Set the duration for each time slot
          slotLabelInterval="01:00:00" // Adjust the interval of time labels
          slotLabelFormat={{ hour: 'numeric', omitZeroMinute: true }} // Show only hour labels
        />
      </Box>
    </ThemeProvider>
  );
};

export default Calendar;
