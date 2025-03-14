import * as d3 from 'd3';
import { useMemo } from 'react';

type BarChartProps = {
  width?: number;
  height?: number;
  sorted?: boolean;
  data: { name: string; value: number }[];
};

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

// All of this code was gracefully lifted from the following:
//
//   https://www.react-graph-gallery.com/barplot
//
// It's actually baffling how difficult it is to find a simple charting library
// for React. All the options are just way over-the-top.
export const BarChart = ({
  width = 400,
  height = 300,
  sorted = true,
  data,
}: BarChartProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis is for groups since the bar plot is horizontal
  const groups = (sorted ? data.sort((a, b) => b.value - a.value) : data).map(
    (d) => d.name,
  );
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

  // X axis
  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.value));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const y = yScale(d.name);

    return (
      <g key={i}>
        <rect
          className="fill-primary/50 stroke-primary"
          x={xScale(0)}
          y={yScale(d.name)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale(d.value) - 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          opacity={xScale(d.value) > 90 ? 1 : 0} // hide label if bar is not wide enough
        >
          {d.value}
        </text>
        <text
          x={xScale(0) + 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.name}
        </text>
      </g>
    );
  });

  const grid = xScale.ticks(5).map((value, i) => (
    <g key={i}>
      <line
        className="stroke-gray-200/80"
        x1={xScale(value)}
        x2={xScale(value)}
        y1={0}
        y2={boundsHeight}
      />
      <text
        className="stroke-gray-200/80"
        x={xScale(value)}
        y={boundsHeight + 10}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={9}
      >
        {value}
      </text>
    </g>
  ));

  return (
    <div className="flex justify-center">
      {Boolean(width && height) && (
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
          >
            {grid}
            {allShapes}
          </g>
        </svg>
      )}
    </div>
  );
};
