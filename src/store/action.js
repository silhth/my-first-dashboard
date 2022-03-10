
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