import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SignupSeeker from '../../components/Signup/SignupSeeker';

function SignupSeekerPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <SignupSeeker />  
            <Footer/>
        </div>
    );
}

export default SignupSeekerPage;
