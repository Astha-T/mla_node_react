import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Tooltip,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import Typography from "@material-ui/core/Typography";

const BarEducation = () => {

  const Status = localStorage.getItem('displaystatus')

  const [education, setEducation] = useState([])
  const [datalength, setDataLength] = useState('')

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

        let updatedList = data.data.find(updatedList => updatedList.educationData)

        setEducation(updatedList.educationData)
        setDataLength(updatedList.educationData.length)
      })
  })

  const count = {};

  Array.from(education).forEach(element => {
    count[element] = (count[element] || 0) + 1;
  });

  console.log(count);

  const splitKeyValue = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push({
        'education': keys[i],
        'quantity': obj[keys[i]]
      });
    };
    return res;
  };

  const notsurveyed = education.filter(r=>r===null)
  const notsurveyedlength = notsurveyed.length
  const surveyedlength = datalength - notsurveyedlength

  const chartData2 = splitKeyValue(count)
  console.log(chartData2)

  console.log(education)

  const chartData = chartData2.map((val, index) => {
    return {
      state: val.education, votes: val.quantity
    }
  })

  return (
    (Status &&
      <>
        <h1 className="piecharttitle" style={{ marginBottom: '2%', paddingTop: '2%', paddingBottom: '2%' }}>Education Count</h1>
        <Paper style={{ marginBottom: '5%' }}>
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

export default BarEducation;
