import * as d3 from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { data } from "../scripts/gap_data.js";
import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const MARGIN = { top: 20, right: 20, bottom: 60, left: 100 };
const width = 600;
const height = 500;

const BUBBLE_MIN_SIZE = 2;
const BUBBLE_MAX_SIZE = 20;

export default function GapminderChart() {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [scaleType, setScaleType] = useState("linear");

  const xScaleLinear = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.gdpPercap)])
    .range([0, boundsWidth]);

  const xScaleLog = d3
    .scaleLog()
    .domain([1, d3.max(data, (d) => d.gdpPercap)])
    .range([0, boundsWidth]);

  const xScale = scaleType === "log" ? xScaleLog : xScaleLinear;

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.lifeExp), d3.max(data, (d) => d.lifeExp)])
    .range([boundsHeight, 0]);

  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.pop)])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);

  const groups = data
    .map((d) => d.continent)
    .filter((x, i, a) => a.indexOf(x) == i);

  const colorScale = d3
    .scaleOrdinal()
    .domain(groups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  // ✅ KEY-BASED SPRINGS (correct pattern)
  const [springs] = useSprings(
    data.length,
    (index) => {
      const d = data[index];
      return {
        cx: xScale(d.gdpPercap),
        cy: yScale(d.lifeExp),
        r: sizeScale(d.pop),
        config: { tension: 120, friction: 14 },
      };
    },
    [data, xScale, yScale, sizeScale], // dependencies
  );

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setScaleType("log")}>Log scale</button>
        <button onClick={() => setScaleType("linear")}>Linear scale</button>
      </div>
      <svg width={600} height={500}>
        <rect width={width} height={height} fill="none" fillOpacity={0.5} />

        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <rect
            width={boundsWidth}
            height={boundsHeight}
            fill="lightgrey"
            fillOpacity={0.3}
          />

          {springs.map((props, i) => {
            const d = data[i];

            return (
              <animated.circle
                key={d.country} // stable React key
                cx={props.cx}
                cy={props.cy}
                r={props.r}
                stroke={colorScale(d.continent)}
                fill={colorScale(d.continent)}
                fillOpacity={0.4}
                strokeWidth={1}
              />
            );
          })}

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={100}
              label={"GDP Per Capita"}
            />
          </g>

          <AxisLeft yScale={yScale} pixelsPerTick={60} label={"Age"} />
        </g>
      </svg>
    </div>
  );
}
