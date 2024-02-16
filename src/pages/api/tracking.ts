export async function GET({ params, request }: { params: any; request: any }) {
  const response = await fetch('https://dummyjson.com/todos')
  // console.log(await response.json())
  return new Response(JSON.stringify(await response.json()))
}
