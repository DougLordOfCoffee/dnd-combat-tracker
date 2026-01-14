import { useState } from 'react'
import type { InitiativeEntry, Unit } from '../App'

interface InitiativeTrackerProps {
  entries: InitiativeEntry[]
  units: Unit[]
  onAddEntry: (unitId: string, initiative: number) => void
  onUpdateUnitInitiative: (unitId: string, initiative: number) => void
  showEditor: boolean
}

function InitiativeTracker({ entries, units, onAddEntry, onUpdateUnitInitiative, showEditor }: InitiativeTrackerProps) {
  const [selectedUnitId, setSelectedUnitId] = useState('')
  const [initiativeValue, setInitiativeValue] = useState(0)

  const handleAdd = () => {
    if (selectedUnitId) {
      const unit = units.find(u => u.id === selectedUnitId)
      if (unit) {
        onAddEntry(selectedUnitId, initiativeValue)
        onUpdateUnitInitiative(selectedUnitId, initiativeValue)
        setSelectedUnitId('')
        setInitiativeValue(0)
      }
    }
  }

  const handleDragStart = (e: React.DragEvent, entry: InitiativeEntry) => {
    e.dataTransfer.setData('text/plain', entry.id)
  }

  return (
    <div className="initiative-tracker">
      {showEditor && (
        <div className="add-initiative">
          <select value={selectedUnitId} onChange={(e) => setSelectedUnitId(e.target.value)}>
            <option value="">Select Unit</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={initiativeValue}
            onChange={(e) => setInitiativeValue(Number(e.target.value))}
            placeholder="Initiative"
            min="0"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
      <div className="initiative-list">
        {entries.map((entry, _index) => (
          <div
            key={entry.id}
            className="initiative-circle"
            draggable
            onDragStart={(e) => handleDragStart(e, entry)}
          >
            <span className="initiative-name">{units.find(u => u.id === entry.unitId)?.name || 'Unknown'}</span>
            <span className="initiative-value">{entry.initiative}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InitiativeTracker