import React from 'react'

function SendDataButton() {
  const [data, setData] = React.useState({})
  async function sendData() {
    const response = await fetch('api/tracking')
    setData(await response.json())
  }
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={sendData}>Send Data</button>
      <button onClick={() => console.log(data)}>Print Data</button>
    </div>
  )
}

export default SendDataButton
