import { useEffect, useState } from 'react'
import style from './RealTime.module.scss'

export const RealTime = (props) => {
    const [dayTime, setDaytime] = useState('')
    const data = props.data || [{
        device_id: '',
        time: '',
        soil_moist: '',
        temperature: '',
        voltage: '',
        humidity: ''
    }
    ]

    const lastData = data[data.length - 1];
    useEffect(()=>
    lastData ? setDaytime(lastData.time.split(/(T|\.)/)): null
    ,[lastData])
    return (
        <div className={style.realTime}>
            {data.length > 1 && <>
                <div className={style.time}>
                    <h3> {dayTime[0]}</h3>
                    <h3> {dayTime[2]}</h3>
                </div>
                <div>
                    <p>T° aria</p>
                    <p>{lastData.temperature} °C</p></div>
                <div>
                    <p>H% suolo</p>
                    <p>{lastData.soil_moist} %H</p>
                </div>
                <div>
                    <p>H% aria</p>
                    <p>{lastData.humidity} %H</p>
                </div>
            </>}
        </div>
    )
}