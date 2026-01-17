import { useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/users')
      const data = await response.json()
      setUsers(data.data)
      setFetched(true)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
      <header className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-6xl tracking-tight mb-4">
          Team Directory
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto">
          Meet the people behind the work.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        {!fetched && (
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="group relative px-8 py-4 bg-neutral-900 text-white text-sm tracking-wide
                       hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              'View Team'
            )}
          </button>
        )}

        {fetched && users.length > 0 && (
          <div className="space-y-px">
            {users.map((user, index) => (
              <article
                key={user.id}
                className="group bg-white border border-neutral-200 p-6 md:p-8
                           hover:border-neutral-400 transition-colors duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-6">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                      <h2 className="text-xl md:text-2xl">{user.name}</h2>
                      <span className="text-xs uppercase tracking-widest text-neutral-400">
                        {user.job}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {user.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {fetched && users.length === 0 && (
          <p className="text-neutral-500">No team members found.</p>
        )}
      </div>
    </div>
  )
}

export default App
