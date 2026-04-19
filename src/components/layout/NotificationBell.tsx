import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorkspaceStore } from '../../store/useWorkspaceStore'

export default function NotificationBell() {
  const { notifications, markRead, markAllRead } = useWorkspaceStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-lg hover:bg-lofty-surface text-lofty-muted hover:text-lofty-text transition-colors"
      >
        <Bell size={15} />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#3C5CDE' }} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-80 bg-white border border-lofty-border rounded-xl shadow-panel z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-lofty-border">
              <span className="text-sm font-semibold text-lofty-text">Updates</span>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium hover:underline"
                  style={{ color: '#3C5CDE' }}
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-lofty-border">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`px-4 py-3 cursor-pointer hover:bg-lofty-surface transition-colors ${!n.read ? 'bg-lofty-blue-light/40' : ''}`}
                >
                  <div className="flex items-start gap-2.5">
                    {!n.read && (
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#3C5CDE' }} />
                    )}
                    <div className={!n.read ? '' : 'ml-4'}>
                      <div className="text-xs font-semibold text-lofty-text">{n.title}</div>
                      <div className="text-xs text-lofty-muted mt-0.5 leading-relaxed">{n.body}</div>
                      <div className="text-xs text-lofty-subtle mt-1">{n.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}