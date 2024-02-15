export async function GET({ params, request }) {
  const response = await fetch('https://dummyjson.com/todos')
  return new Response(await response.json())
}
