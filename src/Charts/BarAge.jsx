import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import Typography from "@material-ui/core/Typography";

const BarAge = () => {

  const Status = localStorage.getItem('displaystatus')

  const [age, setAge] = useState([])
  const [datalength, setDataLength] = useState()

  const blockId = localStorage.getItem('block_id')
  const mandalId = localStorage.getItem('mandal_id')
  const sectorId = localStorage.getItem('sector_id')
  const boothId = localStorage.getItem('booth_id')

  var url = ''

  if(!blockId){
    url = `http://206.189.130.102:5000/api/v1/filter`
  }else{
    if (!mandalId) {
      url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId
    }else if(!sectorId){
      url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId
    }else if(!boothId){
      url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId + `&sector=` + sectorId
    }else {
      url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId + `&sector=` + sectorId + `&booth_id=` + boothId
    }
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data)

        let updatedList = data.data.find(updatedList => updatedList.AgeData)

        setAge(updatedList.AgeData)
        setDataLength(updatedList.AgeData.length)
      })
  })

  console.log(age)
  var quantity1 = 0
  var quantity2 = 0
  var quantity3 = 0
  var quantity4 = 0
  var quantity5 = 0
  var quantity6 = 0
  var quantity7 = 0
  var quantity8 = 0

  for (let i = 0; i <= age.length; i++) {
    if (age[i] >= 18 && age[i] <= 25) {
      quantity1 = quantity1 + 1
    }
    else if (age[i] >= 26 && age[i] <= 35) {
      quantity2 = quantity2 + 1
    }
    else if (age[i] >= 36 && age[i] <= 45) {
      quantity3 = quantity3 + 1
    }
    else if (age[i] >= 46 && age[i] <= 55) {
      quantity4 = quantity4 + 1
    }
    else if (age[i] >= 56 && age[i] <= 65) {
      quantity5 = quantity5 + 1
    }
    else if (age[i] >= 66 && age[i] <= 75) {
      quantity6 = quantity6 + 1
    }
    else if (age[i] >= 76 && age[i] <= 85) {
      quantity7 = quantity7 + 1
    }
    else if (age[i] >= 86) {
      quantity8 = quantity8 + 1
    }
  }

  const chartData3 = {
    '18-25': quantity1, '26-35': quantity2, '36-45': quantity3, '46-55': quantity4,
    '56-65': quantity5, '66-75': quantity6, '76-85': quantity7, '85+': quantity8
  }

  const splitKeyValue = obj => {
    const keys = Object.keys(obj);
    console.log(keys)
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push({
        'age': keys[i],
        'quantity': obj[keys[i]]
      });
    };

    return res;
  };

  const notsurveyed = age.filter(r=>r===null)
  const notsurveyedlength = notsurveyed.length
  const surveyedlength = datalength - notsurveyedlength

  const chartData2 = splitKeyValue(chartData3)
  console.log(chartData2)

  const chartData = chartData2.map((val, index) => {
    return {
      state: val.age, votes: val.quantity
    }
  })

  return (
    (Status && 
    <>
        <h1 className="piecharttitle" style={{ marginBottom: '2%', paddingTop: '2%', paddingBottom: '2%' }}>Age Count</h1>
        <Paper style={{ marginBottom: '5%' }}>
            {datalength ?
                <Chart
                  data={chartData}
                  style={{ paddingTop: '10%' }}
                >
                  <ArgumentAxis />
                  <ValueAxis />
                  <Typography style={{fontWeight: 'bold', paddingTop: '5%'}}>Total Voters: {datalength} 
                  &nbsp;&nbsp;&nbsp; Sureveyed: {surveyedlength} &nbsp;&nbsp;&nbsp; Not Surveyed: {notsurveyedlength}</Typography>
                  <BarSeries valueField="votes" argumentField="state" />
                  {/* <Title text="Age Count" /> */}
                  <EventTracker />
                  <Tooltip />
                </Chart>
                :<Typography style={{fontWeight: 'bold'}}>Either block is not selected or data is not available...</Typography>
                }
          </Paper>
    </>)

        );
}

        export default BarAge;
