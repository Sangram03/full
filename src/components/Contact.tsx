import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the contact form data to a backend
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>contact@campushub.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-600" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>123 Campus Street, University City, ST 12345</span>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                className="w-full p-2 border rounded"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
