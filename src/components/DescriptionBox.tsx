interface DescriptionBoxProps {
  description: string
  onChange: (description: string) => void
  showEditor: boolean
}

function DescriptionBox({ description, onChange, showEditor }: DescriptionBoxProps) {
  return (
    <div className="description-box">
      {showEditor ? (
        <textarea
          value={description}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter combat description..."
          rows={3}
        />
      ) : (
        <div className="description-display">{description || 'No description'}</div>
      )}
    </div>
  )
}

export default DescriptionBox