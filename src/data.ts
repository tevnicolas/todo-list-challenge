export type Task = {
  content: string;
  done: boolean;
};

const mockJSONObject = `
{
  "tasks": [
    { "content": "Buy milk", "done": false },
    { "content": "Take car in for oil change", "done": true },
    { "content": "Pick up birthday present for Mom", "done": false },
    { "content": "Call Sam", "done": true }
  ]
}
`;

export async function readTasks(): Promise<Task[]> {
  // here would be a fetch request
  const response = new Response(mockJSONObject, {
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();

  return result.tasks;
}
