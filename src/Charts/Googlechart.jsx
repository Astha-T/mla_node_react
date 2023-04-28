import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import $ from 'jquery';
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
        width: '100%',
        marginTop: 0,
        minLines: 3
    },

    legendTextStyle: {
        color: "#000",
        fontName: "Poppins",
        fontSize: 13,
        bold: false,
        italic: false,
    },
    tooltip: {
        enableInteractivity: false,
        trigger: 'none'
    }

};

export default function Googlechart() {

    const [item, setItem] = React.useState([]);
    const [datalength, setDataLength] = useState()

    const getdata = () => {
        fetch(`http://206.189.130.102:5000/getdata`)
            .then(response => {
                return response.json()
            }).then(data => {
                setItem({ data })
                setDataLength(data.length)
            })
    }

    useEffect(() => {
        getdata();
    }, [])

    const party = item.data?.map(val => val.partyName)
    const value = item.data?.map(val => val.value)

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

    const a = (party ?? [])[0];
    const b = (party ?? [])[1];
    const c = (party ?? [])[2];
    const d = (party ?? [])[3];
    const e = (party ?? [])[4];
    const f = (party ?? [])[5];
    const g = (party ?? [])[6];
    const h = (party ?? [])[7];
    const i = (party ?? [])[8];
    const j = (party ?? [])[9];

    const data = [
        ['party', 'value'],
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


    const Reload = () => {
        $("#chart").reload(window.location.href + " #chart>*", "")
    }

    setTimeout(Reload, 5000)

    return (
        <>
            <h1 className="piecharttitle2">Rujhaan Live</h1>
            <Paper className='marginRujhaan' id='paper'>
                {!datalength ?

                    <Typography style={{ fontWeight: 'bold' }}>No Data Available...</Typography>
                    :<Chart
                        chartType="PieChart"
                        id='chart'
                        // data={chartData2}
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"430px"}
                        fontFamily={'Poppins'}
                        fontSize={'15px'}
                        legendToggle={false}
                    />
                }
            </Paper>
        </>
    );
}
