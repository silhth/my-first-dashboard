
import mydata from '../data/db.json'
//------------------------Mockserver---------------------------------
//import axios from 'axios';
// export const fetchAllData = () => {
//     return async (dispatch) => {
//         const {data} = await axios.get('http://localhost:3000/data')
//         dispatch({type: "getAllData", payload: data})        
//     }
// }

export const fetchAllDataJson = () => {
    return (dispatch) => {
        const {data} = mydata
        dispatch({type: "getAllDataJson", payload: data})        
    }
}

export const filterData = (myData) => {
    return (dispatch) => {
        const data = myData.map((arr) => {
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
            })
        dispatch({type: 'filterData', payload: data})        
    }
}

export const nextDay = (day) => {
    return (dispatch) => {
        dispatch({type: "nextDay", payload: day + 1})        
    }
}

export const previusDay = (day) => {
    return (dispatch) => {
        dispatch({type: "previusDay", payload: day - 1})        
    }
}