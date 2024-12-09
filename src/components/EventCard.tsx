import { MapPin, Calendar as CalendarIcon, Trash2, UserPlus } from 'lucide-react'
import { Event } from '../types/Event'

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onRegister: (id: string) => void;
}

export default function EventCard({ event, onDelete, onRegister }: EventCardProps) {
  // Get registration count for this event
  const registrations = JSON.parse(localStorage.getItem('registrations') || '[]')
  const registrationCount = registrations.filter((r: any) => r.eventId === event.id).length

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onRegister(event.id)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{event.description}</p>
      <div className="mt-4 text-sm text-indigo-600">
        {registrationCount} {registrationCount === 1 ? 'person' : 'people'} registered
      </div>
    </div>
  )
}
