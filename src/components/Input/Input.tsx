import * as React from 'react'
import classes from './Input.module.scss'

interface InputProps {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      className={classes.input}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  )
}

export default Input
