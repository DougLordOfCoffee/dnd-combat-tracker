interface StatusEffect {
  name: string
  icon: string
}

interface StatusEffectSelectorProps {
  effects: StatusEffect[]
  onSelect: (effect: StatusEffect | null) => void
}

function StatusEffectSelector({ effects, onSelect }: StatusEffectSelectorProps) {
  return (
    <div className="status-effect-selector">
      <h3>Status Effects</h3>
      <div className="effects-grid">
        {effects.map(effect => (
          <button
            key={effect.name}
            onClick={() => onSelect(effect)}
            className="effect-button"
          >
            <span className="effect-icon">{effect.icon}</span>
            <span className="effect-name">{effect.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StatusEffectSelector