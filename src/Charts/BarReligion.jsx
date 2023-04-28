import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const BarReligion = () => {

  const Status = localStorage.getItem('displaystatus')

  const [religion, setReligion] = useState([])
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

        let updatedList = data.data.find(updatedList => updatedList.religionData)

        setReligion(updatedList.religionData)
        setDataLength(updatedList.religionData.length)
      })
  }, [])

  const count = {};

  Array.from(religion).forEach(element => {
    count[element] = (count[element] || 0) + 1;
  });

  const notsurveyed = religion.filter(r=>r===null)
  const notsurveyedlength = notsurveyed.length
  const surveyedlength = datalength - notsurveyedlength

  // religion.filter(if) 

  console.log(count);

  const splitKeyValue = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push({
        'religion': keys[i],
        'quantity': obj[keys[i]]
      });
    };
    return res;
  };

  const chartData2 = splitKeyValue(count)
  console.log(chartData2)

  console.log(religion)

  const chartData = chartData2.map((val, index) => {
    return {
      state: val.religion, votes: val.quantity
    }
  })

  return (
    (Status &&
      <>
        <h1 className="piecharttitle" style={{ marginBottom: '2%', paddingTop: '2%', paddingBottom: '2%' }}>Religion Count</h1>
        <Paper style={{ marginBottom: '5%' }} >
          {!datalength ?

            <Typography style={{fontWeight: 'bold'}}>Either block is not selected or data is not available...</Typography>
            : <Chart
                  data={chartData}
                  style={{ paddingTop: '10%' }}
                >
                  <ArgumentAxis />
                  <ValueAxis />
                  <Typography style={{fontWeight: 'bold', paddingTop: '5%'}}>Total Voters: {datalength} 
                  &nbsp;&nbsp;&nbsp; Sureveyed: {surveyedlength} &nbsp;&nbsp;&nbsp; Not Surveyed: {notsurveyedlength}</Typography>
                  <BarSeries valueField="votes" argumentField="state" />
                  <EventTracker />
                  <Tooltip />
                </Chart>}
        </Paper>
        </>)
  );
}

export default BarReligion;
