import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BlogPost } from '../types/BlogPost'

interface AddBlogPostProps {
  onAdd: (post: Omit<BlogPost, 'id' | 'date'>) => void;
}

export default function AddBlogPost({ onAdd }: AddBlogPostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ title: '', author: '', content: '' })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>New Blog Post</span>
      </button>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">New Blog Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Author
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <textarea
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={6}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Publish Post
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
