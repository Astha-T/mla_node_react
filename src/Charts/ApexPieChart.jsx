import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Paper from '@material-ui/core/Paper';

const PiechartApex = () => {
    const [party, setParty] = useState([]);
    const [rujhaan, setRujhaan] = useState([]);

    useEffect(() => {
        const partylist = [];
        const rujhaanlist = [];
        const getdata = async () => {
            const reqData = await fetch("http://206.189.130.102:5000/getdata");
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                partylist.push(resData[i].partyName);
                rujhaanlist.push(parseInt(resData[i].value));
            }
            setParty(partylist);
            setRujhaan(rujhaanlist);
            console.log(rujhaan)
        }

        getdata();

    }, []);

    return (
        <React.Fragment>
             <h1 className="piecharttitle2">Rujhaan Live</h1>
             <Paper className='marginRujhaan' id='paper'>
             
            <div style={{paddingTop: '10%'}}>
                <Chart
                    type="pie"
                    width='100%'
                    height='200%'
                    paddingTop='10%'

                    series={rujhaan}
                    labels= {party}

                    options={{
                       
                        noData: { text: "No Data Available..." },
                        // colors:["#f90000","#f0f"],
                        labels: party,
                          plotOptions: {
                            pie: {
                            dataLabels: {
                                position: 'bottom'
                              }
                            }
                          }
                    }}
                >
                </Chart>
            </div>
            </Paper>
        </React.Fragment>
    );
}
export default PiechartApex;