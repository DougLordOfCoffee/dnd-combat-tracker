import { useState, useEffect } from 'react'
import type { Buff } from '../App'

interface BuffTimerProps {
  buff: Buff
}

function BuffTimer({ buff }: BuffTimerProps) {
  const [remaining, setRemaining] = useState(buff.duration - (Date.now() - buff.startTime) / 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemaining = buff.duration - (Date.now() - buff.startTime) / 1000
      setRemaining(Math.max(0, newRemaining))
    }, 100)
    return () => clearInterval(interval)
  }, [buff])

  const percentage = (remaining / buff.duration) * 100

  return (
    <div className="buff-timer">
      <span className="buff-icon">{buff.icon}</span>
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="timer-text">{Math.ceil(remaining)}s</span>
    </div>
  )
}

export default BuffTimer