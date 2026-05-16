import { ChangeEvent } from 'react'

export interface QuestionFormData {
  text: string
  type: 'boolean' | 'input' | 'checkbox'
  options: string[]
}

interface Props {
  question: QuestionFormData
  index: number
  onChange: (index: number, updated: QuestionFormData) => void
  onRemove: (index: number) => void
}

export default function QuestionField({
  question,
  index,
  onChange,
  onRemove,
}: Props) {
  const update = (fields: Partial<QuestionFormData>) => {
    onChange(index, { ...question, ...fields })
  }

  const handleOptionChange = (optIndex: number, value: string) => {
    const newOptions = [...question.options]
    newOptions[optIndex] = value
    update({ options: newOptions })
  }

  const addOption = () =>
    update({
      options: [...question.options, ''],
    })

  const removeOption = (optIndex: number) =>
    update({
      options: question.options.filter((_, i) => i !== optIndex),
    })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-500">Question {index + 1}</span>
        <button
          onClick={() => onRemove(index)}
          className="text-red-500 text-sm hover:text-red-700"
        >
          Remove
        </button>
      </div>

      <input
        type="text"
        placeholder="Question text"
        value={question.text}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          update({ text: e.target.value })
        }
        className="px-6 py-2 rounded border-2 border-border"
      />

      <select
        value={question.type}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          update({
            type: e.target.value as QuestionFormData['type'],
            options: [],
          })
        }
        className="px-6 py-2 rounded border-2 border-border"
      >
        <option value="boolean">Boolean (True/False)</option>
        <option value="input">Input (Short answer)</option>
        <option value="checkbox">Checkbox (Multiple choice)</option>
      </select>

      {question.type === 'checkbox' && (
        <div className="space-y-2">
          {question.options.map((opt, optIndex) => (
            <div key={optIndex} className="flex gap-2">
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                className="ml-3 px-3 py-1 rounded border-2 border-border"
              />
              <button
                onClick={() => removeOption(optIndex)}
                className="text-danger hover:text-danger-hover"
              >
                ✕
              </button>
            </div>
          ))}
          <button onClick={addOption} className="ml-3 cursor-pointer text-primary hover:text-primary-hover">
            Add option
          </button>
        </div>
      )}
    </div>
  )
}
