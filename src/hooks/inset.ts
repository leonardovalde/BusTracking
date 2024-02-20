// cSpell:disable
interface DataType {
  record: {
    Buses: {
      BusID: number
      NumeroBus: number
      Marca: string
      Modelo: string
      AnioFabricacion: string
      Placa: string
      Movimientos: {
        Timestamp: string
        Coordenadas: { latitud: number; longitud: number }
      }[]
    }[]
  }
}
export async function insertMovement(
  busId: number,
  Timestamp: string,
  lat: number,
  long: number
) {
  const request = await fetch(
    'https://api.jsonbin.io/v3/b/65d41a00dc74654018a71f4b',
    {
      headers: {
        'X-Master-Key':
          '$2b$10$hAg1IY6H3gNak8GGZForAeezhle1vMIxX7fCqeHSlvzHNw4.zAyBe',
        'Content-Type': 'application/json',
      },
    }
  )
  const data: DataType = await request.json()

  await addMovement(data, busId, lat, long, Timestamp).then(
    async (newBuses) => {
      const putRequest = await fetch(
        'https://api.jsonbin.io/v3/b/65d41a00dc74654018a71f4b',
        {
          method: 'PUT',
          headers: {
            'X-Master-Key':
              '$2b$10$hAg1IY6H3gNak8GGZForAeezhle1vMIxX7fCqeHSlvzHNw4.zAyBe',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Buses: newBuses }),
        }
      )
      return await putRequest.json()
    }
  )
}

async function addMovement(
  data: DataType,
  busId: number,
  lat: number,
  long: number,
  Timestamp: string
) {
  // console.log(data.record.record)

  const buses = data.record.Buses.map((bus) => {
    if (bus.BusID === busId) {
      return {
        ...bus,
        Movimientos: bus.Movimientos
          ? [
              ...bus.Movimientos,
              {
                Coordenadas: { latitud: lat, longitud: long },
                Timestamp,
              },
            ]
          : [
              {
                Coordenadas: { latitud: lat, longitud: long },
                Timestamp,
              },
            ],
      }
    } else {
      return bus
    }
  })

  return buses
}

export async function resetMovements(busId: number) {
  const request = await fetch(
    'https://api.jsonbin.io/v3/b/65d41a00dc74654018a71f4b',
    {
      headers: {
        'X-Master-Key':
          '$2b$10$hAg1IY6H3gNak8GGZForAeezhle1vMIxX7fCqeHSlvzHNw4.zAyBe',
        'Content-Type': 'application/json',
      },
    }
  )
  await request.json().then(async (data) => {
    const cleanMovements = data.record.Buses.map((bus: any) => {
      if (bus.BusID === busId) {
        return {
          ...bus,
          Movimientos: [],
        }
      } else {
        return bus
      }
    })
    await fetch('https://api.jsonbin.io/v3/b/65d41a00dc74654018a71f4b', {
      method: 'PUT',
      headers: {
        'X-Master-Key':
          '$2b$10$hAg1IY6H3gNak8GGZForAeezhle1vMIxX7fCqeHSlvzHNw4.zAyBe',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Buses: cleanMovements }),
    })
  })
}
