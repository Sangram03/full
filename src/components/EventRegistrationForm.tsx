import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Event } from '../types/Event'
import { Registration } from '../types/Registration'
import QRPayment from './QRPayment'

interface EventRegistrationFormProps {
  event: Event;
  onClose: () => void;
}

export default function EventRegistrationForm({ event, onClose }: EventRegistrationFormProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  })

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentComplete = (transactionId: string, paymentProof: string) => {
    // Create new registration with payment information
    const registration: Registration = {
      id: crypto.randomUUID(),
      eventId: event.id,
      timestamp: new Date().toISOString(),
      paymentStatus: 'completed',
      paymentAmount: 10.00,
      transactionId,
      paymentProofUrl: paymentProof,
      paymentSubmittedAt: new Date().toISOString(),
      ...formData
    }

    // Save to localStorage
    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]')
    const updatedRegistrations = [...existingRegistrations, registration]
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations))

    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering for {event.title}. We've sent the confirmation details to your email.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {step === 'form' ? `Register for ${event.title}` : 'Complete Payment'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                required
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Registration fee: $10.00
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        ) : (
          <QRPayment amount={10.00} onComplete={handlePaymentComplete} />
        )}
      </div>
    </div>
  )
}
