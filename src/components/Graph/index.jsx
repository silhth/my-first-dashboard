
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterData, nextDay, previusDay } from '../../store/action'
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
    const [showTime, setShowTime] = useState([]);
    const [newData, setNewData] = useState([]);
    const toDay = useSelector(state => state.day)


    useEffect(() => allData.length > 1 && dispatch(filterData(allData)),
        [dispatch, allData.length]);

    useEffect(() => {
        if (allData.length > 1) {

            const data = allData.filter((arr) => arr.device_id === field && arr.day === toDay);
            setNewData(data)
            const myTime = data.map((arr) => arr.time.split(/(-|T|:|\.)/));
            setShowTime(myTime && myTime.map((arr) => `${arr[4]}-${arr[2]} ${arr[6]}:${arr[8]}`))
        }
    }, [allData, field, toDay])



    const nextDays = () => {
        toDay < allData[allData.length - 1].day && dispatch(nextDay(toDay));
    }
    const previusDays = () => {
        toDay > allData[0].day && dispatch(previusDay(toDay));
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
                {newData.length > 1 ? <>
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
                            labels: showTime,
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
                    <p onClick={previusDays}>⯇</p>
                    <p onClick={nextDays}>⯈</p>
                </div>
            </div>

        </div>
    )
}