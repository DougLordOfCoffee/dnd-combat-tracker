import { useState } from 'react'
import type { Unit } from '../App'
import UnitCard from './UnitCard'

interface UnitListProps {
  units: Unit[]
  showEditor: boolean
  onAddUnit: (name: string, icon: string) => void
  onUpdateHP: (id: string, currentHP: number, maxHP: number) => void
  onUpdateStats: (id: string, ac: number, speed: number, initiative: number) => void
  onUpdateDescription: (id: string, description: string) => void
  onRequestAddBuff: (unitId: string) => void
}

const icons = ['🧙', '⚔️', '🛡️', '🏹', '🐉', '👹', '🧟', '🦄', '🧝', '🧌', '👻', '🦇', '🐺', '🦈', '🦊', '🐻'] // Add more icons

function UnitList({ units, showEditor, onAddUnit, onUpdateHP, onUpdateStats, onUpdateDescription, onRequestAddBuff }: UnitListProps) {
  const [newUnitName, setNewUnitName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState(icons[0])

  const handleAddUnit = () => {
    if (newUnitName.trim()) {
      onAddUnit(newUnitName, selectedIcon)
      setNewUnitName('')
    }
  }

  return (
    <div className="unit-list">
      {showEditor && (
        <div className="add-unit">
          <input
            type="text"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            placeholder="Unit name"
          />
          <select value={selectedIcon} onChange={(e) => setSelectedIcon(e.target.value)}>
            {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
          </select>
          <button onClick={handleAddUnit}>Add Unit</button>
        </div>
      )}
      {units.map(unit => (
        <UnitCard
          key={unit.id}
          unit={unit}
          showEditor={showEditor}
          onUpdateHP={onUpdateHP}
          onUpdateStats={onUpdateStats}
          onUpdateDescription={onUpdateDescription}
          onRequestAddBuff={onRequestAddBuff}
        />
      ))}
    </div>
  )
}

export default UnitList