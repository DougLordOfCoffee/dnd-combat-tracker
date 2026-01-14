import { useState } from 'react'

interface HealthBarProps {
  currentHP: number
  maxHP: number
  onUpdate: (currentHP: number, maxHP: number) => void
  showEditor: boolean
}

function HealthBar({ currentHP, maxHP, onUpdate, showEditor }: HealthBarProps) {
  const [editing, setEditing] = useState(false)
  const [tempCurrent, setTempCurrent] = useState(currentHP.toString())
  const [tempMax, setTempMax] = useState(maxHP.toString())

  const handleClick = () => {
    if (showEditor) {
      setEditing(true)
      setTempCurrent(currentHP.toString())
      setTempMax(maxHP.toString())
    }
  }

  const handleSave = () => {
    const newCurrent = parseInt(tempCurrent) || 0
    const newMax = parseInt(tempMax) || 1
    onUpdate(newCurrent, newMax)
    setEditing(false)
  }

  const handleCancel = () => {
    setTempCurrent(currentHP.toString())
    setTempMax(maxHP.toString())
    setEditing(false)
  }

  const percentage = maxHP > 0 ? (currentHP / maxHP) * 100 : 0

  return (
    <div className="health-bar" onClick={handleClick}>
      {editing ? (
        <div className="health-editor">
          <input
            type="number"
            value={tempCurrent}
            onChange={(e) => setTempCurrent(e.target.value)}
            placeholder="Current HP"
            min="0"
          />
          /
          <input
            type="number"
            value={tempMax}
            onChange={(e) => setTempMax(e.target.value)}
            placeholder="Max HP"
            min="0"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="health-display">
          <div className="health-fill" style={{ width: `${percentage}%` }}></div>
          <span className="health-text">{currentHP}/{maxHP}</span>
        </div>
      )}
    </div>
  )
}

export default HealthBar