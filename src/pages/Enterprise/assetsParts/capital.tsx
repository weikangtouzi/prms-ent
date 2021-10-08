import Chart from './chart'
import CapitalTable from './capitalTable'
import styles from '../index.less'
const Capital = ()=>{
  return <div className={styles.capital}>
    <Chart/>
    <CapitalTable/>
  </div>
}
export default Capital
