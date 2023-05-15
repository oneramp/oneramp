import React from "react"
import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis/dist"
import {
  VictoryChart,
  VictoryLine,
  VictoryLegend,
  VictoryLabel,
  VictoryBar,
  VictoryTheme,
} from "victory"

const generateRandomData = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 2000))
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "black",
      },
    },
    title: {
      display: true,
      text: "Deposit and Withdraw Activity",
      color: "black",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // Light gray
      },
      ticks: {
        color: "black",
      },
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // Light gray
      },
      ticks: {
        color: "black",
      },
    },
  },
}

const getDateLabels = (numberOfDays) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - numberOfDays + 1)
  const labels = []
  const options = { day: "numeric", month: "short" }
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + i)
    labels.push(currentDate.toLocaleDateString(undefined, options))
  }
  return labels
}

const labels = getDateLabels(10)

const depositData = {
  name: "Deposits",
  data: generateRandomData(labels.length),
  style: {
    data: { stroke: "rgba(54, 162, 235, 1)" },
  },
}

const withdrawData = {
  name: "Withdrawals",
  data: generateRandomData(labels.length),
  style: {
    data: { stroke: "rgba(255, 99, 132, 1)" },
  },
}

const data = [depositData, withdrawData]

const AllActivityChart = () => {
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 },
  ]
  return (
    <div>
      <XYPlot height={300} width={300}>
        <LineSeries data={data} />
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  )
}

export default AllActivityChart
