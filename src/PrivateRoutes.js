import {Outlet, Navigate} from 'react-router-dom'
import { withCookies } from 'react-cookie';
import {useNavigate} from 'react-router'

const PrivateRoutes = ({cookies }) => {
  //let auth = {'token': true}
  //let authentication = localStorage.getItem('token')
  //let authentication = localStorage.getItem('token')
  //let auth = authentication == null ? false : true

  //let [Cookie, setCookie] = useCookies(['E-mail'])
  const navigate = useNavigate();
  let authentication = false;
  const email = cookies.get('E-mail');
    if (email && email !== '') {
      //console.log('Email cookie:', email);
      authentication = true;
    }
  console.log(email);
  //let authentication = document.cookie.includes('E-mail');

  return(
    authentication ? <Outlet/> :<Navigate to="/login"/> //navigate("/login")
  )
}

export default withCookies(PrivateRoutes);
