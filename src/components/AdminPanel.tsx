import { useState, useEffect } from 'react'
import { Calendar, Users, DollarSign, Eye, Download, X, ExternalLink } from 'lucide-react'
import AddEventForm from './AddEventForm'
import { Event } from '../types/Event'
import { Registration } from '../types/Registration'

export default function AdminPanel() {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events')
    return saved ? JSON.parse(saved) : []
  })

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('registrations')
    return saved ? JSON.parse(saved) : []
  })

  const [selectedEvent, setSelectedEvent] = useState<string | 'all'>('all')
  const [showPaymentProof, setShowPaymentProof] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: crypto.randomUUID()
    }
    setEvents(prev => [...prev, newEvent])
  }

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure? This will also delete all registrations for this event.')) {
      setEvents(prev => prev.filter(event => event.id !== id))
      setRegistrations(prev => prev.filter(reg => reg.eventId !== id))
    }
  }

  const getRegistrationCount = (eventId: string) => {
    return registrations.filter(reg => reg.eventId === eventId).length
  }

  const getTotalPayments = (eventId: string) => {
    return registrations
      .filter(reg => reg.eventId === eventId && reg.paymentStatus === 'completed')
      .reduce((sum, reg) => sum + (reg.paymentAmount || 0), 0)
  }

  const downloadCSV = (eventId?: string) => {
    const filteredRegistrations = eventId && eventId !== 'all'
      ? registrations.filter(reg => reg.eventId === eventId)
      : registrations

    // Map registrations to their corresponding events
    const data = filteredRegistrations.map(reg => {
      const event = events.find(e => e.id === reg.eventId)
      return {
        'Event': event?.title || 'Unknown Event',
        'Registration Date': new Date(reg.timestamp).toLocaleString(),
        'Name': reg.name,
        'Email': reg.email,
        'Phone': reg.phone,
        'Payment Status': reg.paymentStatus,
        'Payment Amount': reg.paymentAmount,
        'Transaction ID': reg.transactionId || 'N/A',
        'Payment Date': reg.paymentSubmittedAt ? new Date(reg.paymentSubmittedAt).toLocaleString() : 'N/A',
        'Special Requirements': reg.requirements || 'None'
      }
    })

    // Convert to CSV
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => 
          JSON.stringify((row as any)[header] || '')
        ).join(',')
      )
    ].join('\n')

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `registrations${eventId && eventId !== 'all' ? '-' + events.find(e => e.id === eventId)?.title : ''}.csv`
    link.click()
  }

  const filteredRegistrations = selectedEvent === 'all'
    ? registrations
    : registrations.filter(reg => reg.eventId === selectedEvent)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Panel</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Calendar className="w-5 h-5" /> Event Management
          </h3>
          <div className="grid gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.date} • {event.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      {getRegistrationCount(event.id)} registrations
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      ${getTotalPayments(event.id).toFixed(2)} collected
                    </span>
                    <button
                      onClick={() => downloadCSV(event.id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      title="Download registrations"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <AddEventForm onAdd={handleAddEvent} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
              <Users className="w-5 h-5" /> Registration Management
            </h3>
            <div className="flex items-center gap-4">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
              <button
                onClick={() => downloadCSV(selectedEvent)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Phone</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Event</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Transaction ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Payment Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Payment Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredRegistrations.map(reg => {
                    const event = events.find(e => e.id === reg.eventId)
                    return (
                      <tr key={reg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 dark:text-white">{reg.name}</td>
                        <td className="px-4 py-2 dark:text-white">{reg.email}</td>
                        <td className="px-4 py-2 dark:text-white">{reg.phone}</td>
                        <td className="px-4 py-2 dark:text-white">{event?.title}</td>
                        <td className="px-4 py-2 dark:text-white">{reg.transactionId || '-'}</td>
                        <td className="px-4 py-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${reg.paymentStatus === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            }`}
                          >
                            {reg.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-2 dark:text-white">${reg.paymentAmount?.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          {reg.paymentProofUrl ? (
                            <button
                              onClick={() => setShowPaymentProof(reg.paymentProofUrl || null)}
                              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          ) : '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Proof Modal */}
      {showPaymentProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Payment Proof</h3>
              <div className="flex gap-2">
                <a
                  href={showPaymentProof}
                  download="payment-proof.png"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Download image"
                >
                  <Download className="w-6 h-6" />
                </a>
                <a
                  href={showPaymentProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setShowPaymentProof(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <img
              src={showPaymentProof}
              alt="Payment proof"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
