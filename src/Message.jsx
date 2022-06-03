import './App.css'
import React from 'react'

export default function Message({message,isPositive}) {
    let tyyli = '';

    isPositive ? tyyli = 'pos' : tyyli = 'neg'
  return (
    <div className={tyyli}>
        {message}
    </div>
  )
}