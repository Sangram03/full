import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Event } from '../types/Event'

interface AddEventFormProps {
  onAdd: (event: Omit<Event, 'id'>) => void;
}

export default function AddEventForm({ onAdd }: AddEventFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ title: '', date: '', location: '', description: '' })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Event</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full p-2 border rounded"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  )
}
