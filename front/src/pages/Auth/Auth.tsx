import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Login } from '../../components/Login/Login'
import { Registration } from '../../components/Registration/Registration'


export const Auth: FC = () => {
    const {authType} = useParams()
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        {authType==="login" ? <Login/> : authType==="registration" && <Registration/>}
    </div>
  )
}
