import { useEffect, useState } from 'react'
import EventCard from './EventCard'
import EventRegistrationForm from './EventRegistrationForm'
import { Event } from '../types/Event'
import { Registration } from '../types/Registration'

export default function Events() {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleRegister = (eventId: string) => {
    setSelectedEvent(events.find(e => e.id === eventId) || null)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Events</h2>
      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">No events yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={() => {}} // Removed delete functionality from public view
              onRegister={handleRegister}
            />
          ))}
        </div>
      )}
      {selectedEvent && (
        <EventRegistrationForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
