import { useState, useEffect } from 'react'
import { Calendar, UserCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import AddBlogPost from './AddBlogPost'
import { BlogPost } from '../types/BlogPost'

// Initial blog posts to show when no posts exist
const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to Campus Hub',
    author: 'Admin Team',
    content: "We're excited to launch Campus Hub, your one-stop platform for all campus events and activities. Stay tuned for upcoming events, news, and community updates.\n\nMake sure to check our events section regularly and follow us on social media for the latest updates.",
    date: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    title: 'New Payment System Launched',
    author: 'Finance Department',
    content: "We've implemented a new QR-based payment system to make event registration easier and more secure. Simply scan the QR code during registration, make the payment, and upload your proof of payment.\n\nThis new system ensures faster processing and better tracking of all transactions.",
    date: new Date('2024-01-16').toISOString()
  },
  {
    id: '3',
    title: 'Getting Started with Campus Events',
    author: 'Events Team',
    content: "Planning to attend or organize a campus event? Here's everything you need to know:\n\n1. Browse our events section for upcoming activities\n2. Register for events that interest you\n3. Complete the payment using our secure QR payment system\n4. Receive your confirmation email\n\nFor event organizers, contact the admin team to get your event featured on our platform.",
    date: new Date('2024-01-17').toISOString()
  }
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts')
    return saved ? JSON.parse(saved) : initialBlogPosts
  })
  
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts))
  }, [posts])

  const handleAddPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...post,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    }
    setPosts(prev => [newPost, ...prev])
  }

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Campus Blog</h2>
      
      {isAuthenticated && (
        <div className="mb-8">
          <AddBlogPost onAdd={handleAddPost} />
        </div>
      )}

      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p className="text-lg">No blog posts yet.</p>
          </div>
        ) : (
          posts.map(post => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserCircle className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {isAuthenticated && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  )
}
