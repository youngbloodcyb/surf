import { Chart } from "./chart";

export default async function Page() {
  const response = await fetch("http://localhost:5328/api/p/forecast/scripps");
  const data = await response.json();

  return (
    <main>
      <h1>Hello World</h1>
      <div className="w-96">
        <Chart data={data} />
      </div>
    </main>
  );
}
