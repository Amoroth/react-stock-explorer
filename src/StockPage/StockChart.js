import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'

const stockChart = (props) => {
  let graphSizeX = window.innerWidth < 620 ? 350 : 500
  let graphSizeY = window.innerWidth < 620 ? 400 : 250
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
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
        domainPadding={{y: [20, 20]}}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={(y) => {
            const date = new Date(y)
            return `${date.getDate()} ${months[date.getMonth()]}`
          }}
          fixLabelOverlap={true}
          style={{ axis: {stroke: '#344955'}, tickLabels: {fill: '#344955'} }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x}`)}
          style={{ axis: {stroke: '#344955'}, tickLabels: {fill: '#344955'} }}
        />
        <VictoryLine
          data={props.data}
          x="date"
          y="close"
          labelComponent={<VictoryTooltip/>}
          style={{data: {stroke: '#344955'}}}
        />
      </VictoryChart>
    </svg>
  )
}

export default stockChart