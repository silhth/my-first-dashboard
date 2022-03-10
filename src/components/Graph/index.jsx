
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDataJson } from '../../store/action'
// import { fetchAllData} from '../../store/action' ---------------mockServer------------
/* eslint-disable no-unused-vars */
import { Chart as ChartJS } from 'chart.js/auto'
/* eslint-disable no-unused-vars */
import { Line, Chart } from 'react-chartjs-2'
import { RealTime } from '../RealTime';

import style from './Graph.module.scss'


export const Graph = () => {
    const dispatch = useDispatch();
    const [newData, setNewData] = useState([])
    const [field, setField] = useState("sens-test-sht31-rs485")

    useEffect(() => {
        dispatch(fetchAllDataJson())
    }, [dispatch])

    const myData = useSelector(state => state)


    useEffect(() => {
        myData.length > 1 && setNewData(myData.filter((arr) =>
            arr.result.end_device_ids.device_id === field).map((arr) => {
                let data = {
                    device_id: arr.result.end_device_ids.device_id,
                    time: arr.result.received_at,
                    soil_moist: arr.result.uplink_message.decoded_payload.soil_moist,
                    temperature: arr.result.uplink_message.decoded_payload.temperature,
                    voltage: arr.result.uplink_message.decoded_payload.voltage,
                    humidity: arr.result.uplink_message.decoded_payload.humidity
                };
                return (data)
            }
            )
        )

    }, [myData, field])



    const timeMin = () => newData.map((arr) => arr.time.split(/(T)/)[2].split('.')[0])
    const temp = () => newData.map((arr) => arr.temperature.toFixed(0).toString() + ' C°')

    return (
        <div className={style.wrapper}>
            <div className={style.btn}>
                <button className={field === "sens-test-sht31-rs485" ? style.active : null}
                    onClick={() => setField("sens-test-sht31-rs485")}>🍃Field A </button>
                <button className={field === "sens-natib-1" ? style.active : null}
                    onClick={() => setField("sens-natib-1")}>🌿Field B </button>
            </div>
            <RealTime data={newData} />
            <div className={style.graph}>
                {newData.length > 1 ? <>
                    <h2>{field}</h2>
                    <Line
                        datasetIdKey='id'
                        width={600}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            tooltips: {
                                callbacks: {
                                    label: temp()
                                },
                            }
                        }}
                        data={{
                            labels: timeMin(),
                            datasets: [
                                {
                                    id: 1,
                                    label: 'temperature',
                                    data: newData.map((arr) => arr.temperature),
                                    yAxisID: 'y',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132)'
                                },
                                {
                                    id: 2,
                                    label: 'humidity',
                                    data: newData.map((arr) => arr.humidity),
                                    yAxisID: 'y1',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(155, 199, 172, 0.2)',
                                    borderColor: 'rgba(155, 199, 172)'
                                },
                                {
                                    id: 3,
                                    label: 'soil_moist',
                                    data: newData.map((arr) => arr.soil_moist),
                                    yAxisID: 'y2',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(255, 199, 132, 0.2)',
                                    borderColor: 'rgba(255, 199, 132)'
                                },
                            ],
                        }}
                    /></>
                    : <p>loading</p>}
            </div>
        </div>
    )
}