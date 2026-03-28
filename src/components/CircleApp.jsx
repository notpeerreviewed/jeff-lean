import Circle from "./Circle";

const data = [10, 40, 80, 130, 160, 200, 250, 280, 320, 370];

export default function CircleApp() {
  return (
    <div style={{ position: "relative", width: 450, height: 80 }}>
      {data.map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: 15 }}>
          <Circle />
        </div>
      ))}
    </div>
  );
}
