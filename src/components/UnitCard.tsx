import { useState } from 'react'
import type { Unit, Buff } from '../App'
import HealthBar from './HealthBar.tsx'
import BuffTimer from './BuffTimer.tsx'

interface UnitCardProps {
  unit: Unit
  showEditor: boolean
  onUpdateHP: (id: string, currentHP: number, maxHP: number) => void
  onAddBuff: (unitId: string, buff: Omit<Buff, 'id' | 'startTime'>) => void
  selectedStatusEffect: { name: string, icon: string } | null
}

function UnitCard({ unit, showEditor, onUpdateHP, onAddBuff, selectedStatusEffect }: UnitCardProps) {
  const [buffDuration, setBuffDuration] = useState(60) // default 1 minute

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', unit.id)
  }

  const handleAddBuff = () => {
    if (selectedStatusEffect) {
      const effect = { name: selectedStatusEffect.name, icon: selectedStatusEffect.icon, duration: buffDuration }
      onAddBuff(unit.id, effect)
    }
  }

  return (
    <div className="unit-card">
      <div className="unit-header">
        <span className="unit-icon" draggable onDragStart={handleDragStart}>{unit.icon}</span>
        <span className="unit-name">{unit.name}</span>
        {showEditor && (
          <button onClick={handleAddBuff} className="add-buff">+</button>
        )}
      </div>
      <HealthBar
        currentHP={unit.currentHP}
        maxHP={unit.maxHP}
        onUpdate={(current, max) => onUpdateHP(unit.id, current, max)}
        showEditor={showEditor}
      />
      <div className="buffs">
        {unit.buffs.map(buff => (
          <BuffTimer key={buff.id} buff={buff} />
        ))}
      </div>
      {showEditor && selectedStatusEffect && (
        <div className="buff-duration">
          <label>Duration (seconds):</label>
          <input
            type="number"
            value={buffDuration}
            onChange={(e) => setBuffDuration(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  )
}

export default UnitCard