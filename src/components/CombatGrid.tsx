import type { Unit } from '../App'

interface CombatGridProps {
  units: Unit[]
  onUpdatePosition: (id: string, position: { x: number, y: number }) => void
}

const GRID_SIZE = 10 // 10x10 grid

function CombatGrid({ units, onUpdatePosition }: CombatGridProps) {
  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault()
    const unitId = e.dataTransfer.getData('text/plain')
    onUpdatePosition(unitId, { x, y })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="combat-grid">
      {Array.from({ length: GRID_SIZE }, (_, y) => (
        <div key={y} className="grid-row">
          {Array.from({ length: GRID_SIZE }, (_, x) => {
            const unit = units.find(u => u.position.x === x && u.position.y === y)
            return (
              <div
                key={x}
                className="grid-cell"
                onDrop={(e) => handleDrop(e, x, y)}
                onDragOver={handleDragOver}
              >
                {unit && <span className="unit-on-grid">{unit.icon}</span>}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default CombatGrid