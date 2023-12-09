import './styles/custom.css'
import '../assets/styles/main.css'
import './styles/fix-pos-icon.css'
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import Login from '../components/Login';

function LoginPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <Login />  
            <Footer/>
        </div>
    );
}

export default LoginPage;
