import { Trophy, Award, Star } from 'lucide-react'

const achievements = [
  {
    title: "Best Campus Innovation Award",
    year: "2023",
    description: "Recognized for innovative student engagement programs",
    icon: Trophy
  },
  {
    title: "Research Excellence",
    year: "2023",
    description: "Published 50+ research papers in international journals",
    icon: Award
  },
  {
    title: "Community Impact",
    year: "2023",
    description: "Successfully completed 20 community service projects",
    icon: Star
  }
]

export default function Achievements() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Achievements</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.year}</p>
                </div>
              </div>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
