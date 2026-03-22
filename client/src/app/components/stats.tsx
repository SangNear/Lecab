import React from 'react'
import StatCard from './statCard'

const Stats = () => {
  return (
    <div className='my-6 grid grid-cols-3 gap-3'>
        <StatCard title='Total' value={7000} />
        <StatCard title='Due' value={3} />
        <StatCard title='Ahead' value={4} />
    </div>
  )
}

export default Stats