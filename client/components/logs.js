import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLogs } from '../redux/reducers/logs'

const Logs = () => {
  const logs = useSelector((s) => s.logs.logs)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLogs())
  }, [])
  return (
    <div>
      <h2>Logs</h2>
      {logs.map((el) => (
        <div className="flex" key={el.time}>
          <div className="w-2/5">{el.time}</div>
          <div className="w-3/5">{el.event}</div>
        </div>
      ))}
    </div>
  )
}
export default Logs
