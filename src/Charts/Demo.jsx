import React ,{useEffect, useState} from 'react'
import { withStyles } from "@material-ui/core/styles";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Label

} from "@devexpress/dx-react-chart-material-ui";

import {Tooltip } from 'recharts';

export default function PieChart() {

  const [item, setItem] = useState([])

  useEffect(() => {
    fetch('http://206.189.130.102:5000/getdata')
      .then(res => res.json())
      .then(data => {
        setItem(data)
      })
  })

    const chartData = item.map((val, index) =>
    {
      return{
        state: val.partyName,
         votes: val.value,
      }
    })

  // { state: "Arkansas", votes: 5 },
  // { state: "Oklahoma", votes: 2 },
  // { state: "New Mexico", votes: 3 },
  // { state: "Colorado", votes: 10 }

const legendStyles = () => ({
  root: {
    display: "inline",
    flexDirection: "coloumn"
  }
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);

  return (
 
        <Chart data={chartData} style={{height:'fit-content'}}>
          <PieSeries valueField="votes" argumentField="state">
            {/* <Chart.Label label='votes'/> */}
          </PieSeries>
          <Title text="RUJHAAN Live" />
          <Legend  position="bottom" />
          {/* <Tooltip/> */}
        </Chart>

     
  );
}
