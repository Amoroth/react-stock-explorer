import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'

const stockChart = (props) => {
  let graphSizeX = window.innerWidth < 620 ? 350 : 500
  let graphSizeY = window.innerWidth < 620 ? 400 : 250
  return (
    <svg
      role="img"
      style={{position: 'static', pointerEvents: 'none', width: '100%', height: '100%'}}
      viewBox={`0 0 ${graphSizeX} ${graphSizeY}`}
    >
      <VictoryChart
        height={graphSizeY}
        width={graphSizeX}
        theme={VictoryTheme.material}
        standalone={false}
        style={{parent: {position: 'static'}}}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          style={{ axis: {stroke: '#344955'}, tickLabels: {fill: '#344955'} }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
          style={{ axis: {stroke: '#344955'}, tickLabels: {fill: '#344955'} }}
        />
        <VictoryLine
          data={props.data}
          x="quarter"
          y="earnings"
          labelComponent={<VictoryTooltip/>}
          style={{data: {stroke: '#344955'}}}
        />
      </VictoryChart>
    </svg>
  )
}

export default stockChart