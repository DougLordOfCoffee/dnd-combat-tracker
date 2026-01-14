interface StatusEffect {
  name: string
  icon: string
}

interface StatusEffectSelectorProps {
  effects: StatusEffect[]
  onSelect: (effect: StatusEffect | null) => void
  selectedEffect: StatusEffect | null
  duration: number
  onDurationChange: (duration: number) => void
  onAccept: () => void
}

function StatusEffectSelector({ effects, onSelect, selectedEffect, duration, onDurationChange, onAccept }: StatusEffectSelectorProps) {
  return (
    <div className="status-effect-selector">
      <h3>Status Effects</h3>
      <div className="effects-grid">
        {effects.map(effect => (
          <button
            key={effect.name}
            onClick={() => onSelect(effect)}
            className={`effect-button ${selectedEffect?.name === effect.name ? 'selected' : ''}`}
          >
            <span className="effect-icon">{effect.icon}</span>
            <span className="effect-name">{effect.name}</span>
          </button>
        ))}
      </div>
      {selectedEffect && (
        <div className="buff-setup">
          <label>Duration (seconds): <input type="number" value={duration} onChange={(e) => onDurationChange(Number(e.target.value))} /></label>
          <button onClick={onAccept}>Accept</button>
        </div>
      )}
    </div>
  )
}

export default StatusEffectSelector