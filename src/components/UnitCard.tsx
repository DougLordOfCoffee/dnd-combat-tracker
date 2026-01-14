import { useState } from 'react'
import type { Unit, Buff } from '../App'
import HealthBar from './HealthBar.tsx'
import BuffTimer from './BuffTimer.tsx'

interface UnitCardProps {
  unit: Unit
  showEditor: boolean
  onUpdateHP: (id: string, currentHP: number, maxHP: number) => void
  onUpdateStats: (id: string, ac: number, speed: number, initiative: number) => void
  onRequestAddBuff: (unitId: string) => void
  selectedStatusEffect: { name: string, icon: string } | null
}

function UnitCard({ unit, showEditor, onUpdateHP, onUpdateStats, onRequestAddBuff, selectedStatusEffect }: UnitCardProps) {

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', unit.id)
  }

  const handleAddBuff = () => {
    onRequestAddBuff(unit.id)
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
      {showEditor ? (
        <div className="unit-stats">
          <label>AC: <input type="number" value={unit.ac} onChange={(e) => onUpdateStats(unit.id, Number(e.target.value), unit.speed, unit.initiative)} /></label>
          <label>Speed: <input type="number" value={unit.speed} onChange={(e) => onUpdateStats(unit.id, unit.ac, Number(e.target.value), unit.initiative)} /></label>
          <label>Init: <input type="number" value={unit.initiative} onChange={(e) => onUpdateStats(unit.id, unit.ac, unit.speed, Number(e.target.value))} /></label>
        </div>
      ) : (
        <div className="unit-stats-display">
          <span>AC: {unit.ac}</span>
          <span>Speed: {unit.speed}</span>
          <span>Init: {unit.initiative}</span>
        </div>
      )}
      <div className="buffs">
        {unit.buffs.map(buff => (
          <BuffTimer key={buff.id} buff={buff} />
        ))}
      </div>
    </div>
  )
}

export default UnitCard