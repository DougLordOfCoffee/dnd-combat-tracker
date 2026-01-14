import { useState } from 'react'
import type { InitiativeEntry } from '../App'

interface InitiativeTrackerProps {
  entries: InitiativeEntry[]
  onAddEntry: (name: string, initiative: number) => void
  showEditor: boolean
}

function InitiativeTracker({ entries, onAddEntry, showEditor }: InitiativeTrackerProps) {
  const [input, setInput] = useState('')
  const [initiativeValue, setInitiativeValue] = useState(0)

  const handleAdd = () => {
    if (input.trim()) {
      onAddEntry(input, initiativeValue)
      setInput('')
      setInitiativeValue(0)
    }
  }

  const handleDragStart = (e: React.DragEvent, entry: InitiativeEntry) => {
    e.dataTransfer.setData('text/plain', entry.id)
  }

  return (
    <div className="initiative-tracker">
      {showEditor && (
        <div className="add-initiative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={initiativeValue}
            onChange={(e) => setInitiativeValue(Number(e.target.value))}
            placeholder="Initiative"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
      <div className="initiative-list">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="initiative-circle"
            draggable
            onDragStart={(e) => handleDragStart(e, entry)}
          >
            <span className="initiative-name">{entry.name}</span>
            <span className="initiative-value">{entry.initiative}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InitiativeTracker