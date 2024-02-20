// cSpell:disable
import React, { useEffect, useState } from 'react'
import { insertMovement, resetMovements } from '../hooks/inset'
import '/src/components/send-styles.css'
// import { insertData } from '../hooks/inset'

function SendDataButton() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState<any>(null)
  const [locationHistory, setLocationHistory] = useState<any[]>([])
  const [busId, setBusId] = useState('')
  const [startRecording, setStartRecording] = useState(false)

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      startRecording && handleInsertData()
    }, 15000) // Fetch cada 10 segundos

    return () => {
      clearInterval(fetchDataInterval)
    }
  }, [startRecording])

  const handleInsertData = async () => {
    const position: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    const timeStamp = new Date().toISOString()
    console.log(
      Number(busId),
      new Date().toISOString(),
      position.coords.latitude,
      position.coords.longitude
    )

    setLocationHistory((prevHistory) => [
      ...prevHistory,
      { position, timeStamp },
    ])

    insertMovement(
      Number(busId),
      timeStamp,
      position.coords.latitude,
      position.coords.longitude
    )
  }

  const handleClean = async () => {
    resetMovements(Number(busId))
    setLocationHistory([])
  }
  return (
    <div className="sendForm">
      <h1 className="display-1 text-center">Location Tracker</h1>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setBusId(e.target.value)}
        content={busId}
        placeholder="Bus ID"
        disabled={startRecording}
      />
      {startRecording ? (
        <p className="text-danger light"> 🔴 Recording 🔴.</p>
      ) : (
        <p>Not Recording</p>
      )}
      <section className="btn-group">
        <button
          className="btn btn-primary"
          onClick={() => {
            !startRecording && handleInsertData()
            setStartRecording(!startRecording)
          }}
          disabled={busId === ''}
        >
          {startRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setLocationHistory([])}
          disabled={locationHistory.length > 0 && startRecording}
        >
          Clean Log
        </button>
      </section>
      <button className="btn btn-warning" onClick={() => handleClean()} disabled={startRecording}>
        Clean Movements
      </button>
      {/* <button onClick={() => console.log(location)}>Print Location</button> */}
      {/* <button onClick={async () => await insertData()}>Send Data</button> */}
      {location && (
        <div>
          <p>Latitude: {location.coords.latitude}</p>
          <p>Longitude: {location.coords.longitude}</p>
        </div>
      )}
      <hr className="my-4" />
      <h3 className="display-4 text-center">Location History</h3>
      {locationHistory.length > 0 && (
        <ul className="logList">
          {locationHistory.map((entry, index) => (
            <li key={index} className="list-group-item logItem">
              <h5 className="item-index">{index + 1}</h5>
              <p>
                <span>Timestamp:</span> {entry.timeStamp.slice(0, 19)}
              </p>
              <p>
                <span>Latitude:</span> {entry.position.coords.latitude}
              </p>
              <p>
                <span>Longitude:</span>
                {entry.position.coords.longitude}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SendDataButton
