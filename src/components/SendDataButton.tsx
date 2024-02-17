import React, { useEffect, useState } from 'react'

function SendDataButton() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState<any>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        setLocation(position)
      } catch (error) {
        console.error('Error fetching location:', error)
      }
    }

    fetchLocation()
  }, []) // Cambiado el array de dependencias para que solo se ejecute una vez al montar el componente

  const sendData = async () => {
    try {
      const response = await fetch('api/tracking')
      const responseData = await response.json()
      setData(responseData)
    } catch (error) {
      console.error('Error sending data:', error)
    }
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={sendData}>Send Data</button>
      <button onClick={() => console.log(data)}>Print Data</button>
      <button onClick={() => console.log(location)}>Print Location</button>
      {location && (
        <div>
          <p>Latitude: {location.coords.latitude}</p>
          <p>Longitude: {location.coords.longitude}</p>
        </div>
      )}
    </div>
  )
}

export default SendDataButton
