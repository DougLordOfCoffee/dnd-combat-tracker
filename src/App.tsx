import { useState, useEffect } from 'react'
import './App.css'
import UnitList from './components/UnitList'
import CombatGrid from './components/CombatGrid'
import InitiativeTracker from './components/InitiativeTracker'
import DescriptionBox from './components/DescriptionBox'
import StatusEffectSelector from './components/StatusEffectSelector'

export interface Buff {
  id: string
  name: string
  icon: string
  duration: number // in seconds
  startTime: number
}

export interface Unit {
  id: string
  name: string
  icon: string
  currentHP: number
  maxHP: number
  buffs: Buff[]
  position: { x: number, y: number }
}

export interface InitiativeEntry {
  id: string
  name: string
  initiative: number
}

const statusEffects: { name: string, icon: string }[] = [
  { name: 'Poisoned', icon: '🧪' },
  { name: 'Blessed', icon: '✨' },
  { name: 'Cursed', icon: '👻' },
  { name: 'Invisible', icon: '👁️‍🗨️' },
  { name: 'Paralyzed', icon: '🪢' },
  { name: 'Stunned', icon: '💫' },
  { name: 'Frightened', icon: '😱' },
  { name: 'Charmed', icon: '😍' },
]

function App() {
  const [units, setUnits] = useState<Unit[]>([])
  const [initiative, setInitiative] = useState<InitiativeEntry[]>([])
  const [showEditor, setShowEditor] = useState(true)
  const [selectedStatusEffect, setSelectedStatusEffect] = useState<{ name: string, icon: string } | null>(null)
  const [description, setDescription] = useState('')

  // Timer for buffs
  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prev => prev.map(unit => ({
        ...unit,
        buffs: unit.buffs.filter(buff => (Date.now() - buff.startTime) / 1000 < buff.duration)
      })))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const addUnit = (name: string, icon: string) => {
    const newUnit: Unit = {
      id: Date.now().toString(),
      name,
      icon,
      currentHP: 10,
      maxHP: 10,
      buffs: [],
      position: { x: 0, y: 0 }
    }
    setUnits(prev => [...prev, newUnit])
  }

  const updateUnitHP = (id: string, currentHP: number, maxHP: number) => {
    setUnits(prev => prev.map(unit => unit.id === id ? { ...unit, currentHP, maxHP } : unit))
  }

  const addBuffToUnit = (unitId: string, buff: Omit<Buff, 'id' | 'startTime'>) => {
    const newBuff: Buff = { ...buff, id: Date.now().toString(), startTime: Date.now() }
    setUnits(prev => prev.map(unit => unit.id === unitId ? { ...unit, buffs: [...unit.buffs, newBuff] } : unit))
  }

  const addInitiative = (name: string, initiativeValue: number) => {
    const newEntry: InitiativeEntry = {
      id: Date.now().toString(),
      name,
      initiative: initiativeValue
    }
    setInitiative(prev => [...prev, newEntry].sort((a, b) => b.initiative - a.initiative))
  }

  return (
    <div className="app">
      <button onClick={() => setShowEditor(!showEditor)} className="toggle-editor">
        {showEditor ? 'Hide Editor' : 'Show Editor'}
      </button>
      <div className="main-layout">
        <div className="left-panel">
          <UnitList
            units={units}
            showEditor={showEditor}
            onAddUnit={addUnit}
            onUpdateHP={updateUnitHP}
            onAddBuff={addBuffToUnit}
            selectedStatusEffect={selectedStatusEffect}
          />
          {showEditor && <StatusEffectSelector effects={statusEffects} onSelect={setSelectedStatusEffect} />}
        </div>
        <div className="center-panel">
          <CombatGrid units={units} onUpdatePosition={(id, pos) => setUnits(prev => prev.map(u => u.id === id ? { ...u, position: pos } : u))} />
        </div>
        <div className="right-panel">
          <InitiativeTracker
            entries={initiative}
            onAddEntry={addInitiative}
            showEditor={showEditor}
          />
        </div>
      </div>
      <DescriptionBox description={description} onChange={setDescription} showEditor={showEditor} />
    </div>
  )
}

export default App
