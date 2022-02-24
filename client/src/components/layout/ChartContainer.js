import React from 'react'
import { Chart } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

const ChartContainer = (props) => {
  const climbData = {
    boulder: 0,
    sport: 0,
    tr: 0,
    trad: 0
  }

  props.data.forEach(data => {
    climbData[data.type]++
  })
  const total = Object.values(climbData).reduce((a, b) => a + b)

  const options = {
    title: {text: "Completed routes", display: true},
    legend: {display: false},
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            size: 16,
            style: 'bold',
            weight: 900
          }
        }
      }
    }
  };

  const data = {
    labels: ['Boulder', 'Sport', 'Trad', 'TR'],
    datasets: [
      {
        label: 'Completed Climbs',
        backgroundColor: ['#f7464a','#46bfbd','#ffb10d','#949fb1','#4d5360'],
        borderWidth: 1,
        data: [...Object.values(climbData)]
      }
    ]
  }

  return(
    <div className="doughnut">
      <Doughnut 
        options={options}
        data={data}
      />
    </div>
  )
}

export default ChartContainer