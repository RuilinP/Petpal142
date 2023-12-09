import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SignupSeekerContinued from '../../components/Signup/SignupSeekerContinued';

function SignupSeekerContinuedPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <SignupSeekerContinued />  
            <Footer/>
        </div>
    );
}

export default SignupSeekerContinuedPage;
