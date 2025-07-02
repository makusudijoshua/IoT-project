// /src/app/api/sensor-data/route.ts

export async function GET() {
  try {
    const res = await fetch(
      "https://temperature-and-humidity-74e76-default-rtdb.firebaseio.com/sensor_data.json",
      {
        next: { revalidate: 0 }, // ensures fresh data every time
      },
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch data" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
