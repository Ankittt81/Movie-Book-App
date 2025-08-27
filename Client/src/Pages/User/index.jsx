import {Tabs} from 'antd'
import Booking from './Bookings'


const User=()=> {
  const items=[
    {
      key:'1',
      label:'Bookings',
      children:<Booking/>
    }
  ]
  return (
    <>
    <h1>User Profile Page</h1>
    <Tabs defaultActiveKey='2' items={items}/>
    </>
    
  )
}

export default User