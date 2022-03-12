
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextDay, previusDay, setDay } from '../../store/action'
// import { fetchAllData} from '../../store/action' ---------------mockServer------------
/* eslint-disable no-unused-vars */
import { Chart as ChartJS } from 'chart.js/auto'
/* eslint-disable no-unused-vars */
import { Line, Chart } from 'react-chartjs-2'
import { RealTime } from '../RealTime';

import style from './Graph.module.scss'


export const Graph = () => {
    const dispatch = useDispatch();
    const allData = useSelector(state => state.data);
    const [field, setField] = useState("sens-test-sht31-rs485");
    const [newData, setNewData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const toDay = useSelector(state => state.day)
    const [hide, setHide] =useState(false) 
    const [unActiveNext, setUnActiveNext] =useState(false)
    const [unActivePrev, setUnActivePrev] =useState(false) 



    useEffect(() => {
        allData.length > 1 && setNewData(allData.filter((arr) =>
            arr.result.end_device_ids.device_id === field).map((arr) => {
                let data = {
                    device_id: arr.result.end_device_ids.device_id,
                    time: arr.result.received_at,
                    day: new Date(arr.result.received_at).getDate(),
                    soil_moist: arr.result.uplink_message.decoded_payload.soil_moist,
                    temperature: arr.result.uplink_message.decoded_payload.temperature,
                    voltage: arr.result.uplink_message.decoded_payload.voltage,
                    humidity: arr.result.uplink_message.decoded_payload.humidity
                };
                return (data)
            }
            )
        )
    }, [allData, field])

    useEffect(() => {
        if (newData.length > 1) {
            setDailyData(newData.filter((arr) => arr.day === toDay))}
    }, [newData, field, toDay])



    const myTime = dailyData.map((arr) => arr.time.split(/(-|T|:|\.)/));
    const showTime = ()=>myTime && myTime.map((arr) => `${arr[4]}-${arr[2]} ${arr[6]}:${arr[8]}`)

    const myDay = dailyData.length > 1 && dailyData[50].time.split(/(-|T|:|\.)/)
    const showDay = myDay && myDay[4] + "-"+ myDay[2]

    const nextDays = () => {
        toDay < newData[newData.length - 1].day && dispatch(nextDay(toDay));
        toDay === newData[newData.length - 1].day -1 && setUnActiveNext(true)
        toDay >= newData[0].day && setUnActivePrev(false)
        setHide(false)
    }
    const previusDays = () => {
        toDay > newData[0].day && dispatch(previusDay(toDay));
        toDay <= newData[newData.length - 1].day && setUnActiveNext(false)
        toDay=== newData[0].day +1 && setUnActivePrev(true)
        setHide(false)
    }

    const showAllData =() =>{
        setDailyData(newData); 
        setHide(true); 
        setUnActiveNext(false)}
    

    const showDayByDay =()=>{
        setHide(false); 
        setUnActiveNext(false); 
        if (toDay> newData[0].day) {
        dispatch(setDay(toDay-1)); setUnActiveNext(false)
        } else {dispatch(setDay(toDay+1)); setUnActivePrev(false)}
    }


    return (
        <div className={style.wrapper}>
            <div className={style.btn}>
                <button className={field === "sens-test-sht31-rs485" ? style.active : null}
                    onClick={() => setField("sens-test-sht31-rs485")}>🍃Field A </button>
                <button className={field === "sens-natib-1" ? style.active : null}
                    onClick={() => setField("sens-natib-1")}>🌿Field B </button>

                <RealTime data={newData} />
            </div>
            <div className={style.graph}>
                {dailyData.length > 1 ? <>
                    <h2>{field}</h2>
                    <Line
                        datasetIdKey='id'
                        width={600}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            elements: {
                                point: {
                                    radius: 0
                                },
                                line: {
                                    borderWidth: 1

                                }
                            }
                        }}
                        data={{
                            labels: showTime(),
                            datasets: [
                                {
                                    id: 1,
                                    label: 'temperature',
                                    data: dailyData.map((arr) => arr.temperature),
                                    yAxisID: 'y',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132)'
                                },
                                {
                                    id: 2,
                                    label: 'humidity',
                                    data: dailyData.map((arr) => arr.humidity),
                                    yAxisID: 'y1',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(155, 199, 172, 0.2)',
                                    borderColor: 'rgba(155, 199, 172)'
                                },
                                {
                                    id: 3,
                                    label: 'soil_moist',
                                    data: dailyData.map((arr) => arr.soil_moist),
                                    yAxisID: 'y1',
                                    fill: 'origin',
                                    backgroundColor: 'rgba(255, 199, 132, 0.2)',
                                    borderColor: 'rgba(255, 199, 132)'
                                },
                            ],
                        }}
                    /></>
                    : <p>loading</p>}
                <div className={style.day}>
                    <p className={hide || unActivePrev ? style.hide : null } onClick={previusDays}>⯇</p>
                    <p className= { hide || unActiveNext ? style.hide : null } onClick={nextDays}>⯈</p>  
                    <div>
                        <p className={hide && style.hide}>{showDay}</p>
                        {hide === false ?
                        <p onClick={showAllData}> show all DATA </p>:
                        <p onClick={showDayByDay}> show DAY by DAY </p>}
                    </div>   
                </div>
                    
            </div>

        </div>
    )
}