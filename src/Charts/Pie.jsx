import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import './Pie.css'

export const options = {
  titlePosition: "none",
  legend: {
    position: 'bottom',
    width: '110%',
    maxLines: 3,
    isStacked: true

  },
  chartArea: {
    width: '120%',
    marginTop: 0,
    minLines: 3
  },

  legendTextStyle: {
    color: "#000",
    fontName: "Poppins",
    fontSize: 15,
    bold: false,
    italic: false,
  },
  tooltip: {
    trigger: 'none'
  }

};

const PieNew = () => {

  const Status = localStorage.getItem('displaystatus')

  const [gender, setGender] = useState([]);
  const [datalength, setDataLength] = useState()

  const blockId = localStorage.getItem('block_id')
  const mandalId = localStorage.getItem('mandal_id')
  const sectorId = localStorage.getItem('sector_id')
  const boothId = localStorage.getItem('booth_id')

  var url = ''

  if (blockId) {
    if (!mandalId) {
      url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId
    }

    else {
      if (!sectorId) {
        url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId
      }
      else {
        if (!boothId) {
          url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId + `&sector=` + sectorId
        }
        else {
          url = `http://206.189.130.102:5000/api/v1/filter?block=` + blockId + `&mandal=` + mandalId + `&sector=` + sectorId + `&booth_id=` + boothId
        }
      }
    }
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data)

        let updatedList = data.data.find(updatedList => updatedList.rujhanData)

        setGender(updatedList.rujhanData)
        setDataLength(updatedList.rujhanData.length)
      })
  })

  const count = {};

  Array.from(gender).forEach(element => {
    count[element] = (count[element] || 0) + 1;
  });

  const notsurveyed = gender.filter(r=>r===null)
  const notsurveyedlength = notsurveyed.length
  const surveyedlength = datalength - notsurveyedlength

  console.log(count);

  const splitKeyValue = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push({
        'gender': keys[i],
        'quantity': obj[keys[i]]
      });
    };
    return res;
  };


  const chartData2 = splitKeyValue(count)
  console.log(chartData2)

  const chartData = chartData2.map((val, index) => {
    return {
      genderdata: val.gender, numbers: val.quantity
    }
  })

  console.log(chartData)

  const name = chartData.map(val => val.genderdata)
  const value = chartData.map(val => val.numbers)

  const p = (value ?? [])[0];
  const q = (value ?? [])[1];
  const r = (value ?? [])[2];
  const s = (value ?? [])[3];
  const t = (value ?? [])[4];
  const u = (value ?? [])[5];
  const v = (value ?? [])[6];
  const w = (value ?? [])[7];
  const x = (value ?? [])[8];
  const y = (value ?? [])[9];

  const a = (name ?? [])[0];
  const b = (name ?? [])[1];
  const c = (name ?? [])[2];
  const d = (name ?? [])[3];
  const e = (name ?? [])[4];
  const f = (name ?? [])[5];
  const g = (name ?? [])[6];
  const h = (name ?? [])[7];
  const i = (name ?? [])[8];
  const j = (name ?? [])[9];
  

  const data = [
    ['name', 'value'],
    [a, p],
    [b, q],
    [c, r],
    [d, s],
    [e, t],
    [f, u],
    [g, v],
    [h, w],
    [i, x],
    [j, y],

  ];

  return (
    (Status && 
      <>
        <h1 className="piecharttitle" style={{ marginTop: 0 }}>Rujhans</h1>
        <Paper>
          {!datalength ?

            <Typography style={{fontWeight: 'bold'}}>Either block is not selected or data is not available...</Typography>
            : <>
            <Typography style={{fontWeight: 'bold', paddingTop: '5%'}}>Total Voters: {datalength} 
                  &nbsp;&nbsp;&nbsp; Sureveyed: {surveyedlength} &nbsp;&nbsp;&nbsp; Not Surveyed: {notsurveyedlength}</Typography> 
                  <Chart
                  chartType="PieChart"
                  options={options}
                  data={data}
                  width={"100%"}
                  height={"380px"}
                  fontFamily={'Poppins'}
                  fontSize={'15px'}
                  legendToggle={false}
                />
                
                </>}
            </Paper> 
      </>
        )
        );
}

        export default PieNew;
