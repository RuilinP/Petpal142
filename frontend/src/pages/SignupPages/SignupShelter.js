import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SignupShelter from '../../components/Signup/SignupShelter';

function SignupShelterPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <SignupShelter />  
            <Footer/>
        </div>
    );
}

export default SignupShelterPage;
