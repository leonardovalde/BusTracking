import React, { useEffect, useState } from 'react'

function SendDataButton() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState<any>(null)
  const [locationHistory, setLocationHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        setLocation(position)
        setLocationHistory((prevHistory) => [...prevHistory, position])
      } catch (error) {
        console.error('Error fetching location:', error)
      }
    }

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('api/tracking');
    //     const responseData = await response.json();
    //     setData(responseData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    const fetchDataInterval = setInterval(() => {
      fetchLocation()
    }, 5000) // Fetch cada 10 segundos

    // Llamamos a fetchLocation inmediatamente para obtener la posición al cargar el componente

    // Limpieza del intervalo al desmontar el componente
    return () => {
      clearInterval(fetchDataInterval)
    }
  }, []) // Array de dependencias vacío para que se ejecute una vez al montar el componente

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => console.log(data)}>Print Data</button>
      <button onClick={() => console.log(location)}>Print Location</button>
      {location && (
        <div>
          <p>Latitude: {location.coords.latitude}</p>
          <p>Longitude: {location.coords.longitude}</p>
        </div>
      )}
      <h2>Location History</h2>
      <ul>
        {locationHistory.map((entry, index) => (
          <li key={index}>
            <p>Latitude: {entry.coords.latitude}</p>
            <p>Longitude: {entry.coords.longitude}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SendDataButton
