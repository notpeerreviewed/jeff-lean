import React from "react";
import * as d3 from "d3";

const HorizontalBarplot = ({ data, width = 800, height = 600 }) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 150 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // X scale (values)
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d.students)])
    .range([0, innerWidth]);

  // Y scale (categories)
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Bars */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={0}
            y={yScale(d.country)}
            width={xScale(d.students)}
            height={yScale.bandwidth()}
            fill="steelblue"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={-10}
            y={yScale(d.country) + yScale.bandwidth() / 2 + 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={12}
          >
            {d.country}
          </text>
        ))}

        {/* Value labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={xScale(d.students) + 5}
            y={yScale(d.country) + yScale.bandwidth() / 2 + 2}
            dominantBaseline="middle"
            fontSize={12}
            fill="#333"
          >
            {d.students}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default HorizontalBarplot;
