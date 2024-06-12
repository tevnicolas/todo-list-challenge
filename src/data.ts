export type Task = {
  content: string;
  done: boolean;
  id: number;
};

const mockJSONObject = `
{
  "tasks": [
    { "content": "Buy milk", "done": false, "id": 1 },
    { "content": "Take car in for oil change", "done": true, "id": 2 },
    { "content": "Pick up birthday present for Mom", "done": false, "id": 3 },
    { "content": "Call Sam", "done": true, "id": 4 }
  ]
}
`;

export async function readTasks(): Promise<Task[]> {
  // this line would be a fetch request
  const response = new Response(mockJSONObject, {
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();

  return result.tasks;
}
