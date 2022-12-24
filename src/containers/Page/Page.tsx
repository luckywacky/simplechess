import React from 'react'
import classes from './Page.module.scss'

interface PageProps {
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className={classes.page}>
      <div className={classes.container}>{children}</div>
    </div>
  )
}

export default Page
