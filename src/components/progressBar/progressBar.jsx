import { Progress } from "antd"
import styles from '../progressBar/progressBar.module.css'



const ProgressBar = ({result}) =>{

    return (
        <Progress percent={result} type="circle" size={80} 
        strokeWidth={8} strokeColor={
        result > 0 && result < 50 ? '#ef233c' : 
        (result >= 50 && result < 80 ? '#ffd449' : '#2dc653')
    }/>
    )
}

export default ProgressBar