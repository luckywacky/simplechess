import * as React from 'react'
import classes from './Button.module.scss'

interface ButtonProps {
  label: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className={classes.button} onClick={() => onClick()}>
      {label}
    </button>
  )
}

export default Button
