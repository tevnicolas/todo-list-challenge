export type Task = {
  content: string;
  done: boolean;
  id: number;
};

export type Visibility = 'all' | 'active' | 'complete';

const exampleJSON = `
{
  "tasks": [
    { "content": "Buy milk", "done": false, "id": 704 },
    { "content": "Take car in for oil change", "done": true, "id": 705 },
    { "content": "Pick up birthday present for Mom", "done": false, "id": 706 },
    { "content": "Call Sam", "done": true, "id": 707 }
  ]
}
`;

export async function readExampleJSON(): Promise<Task[]> {
  // fetch request here
  const response = new Response(exampleJSON, {
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();

  return result.tasks;
}
