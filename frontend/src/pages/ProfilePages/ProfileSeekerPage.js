import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import ProfileSeeker from '../../components/Profiles/ProfileSeeker';

function ProfileSeekerPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <ProfileSeeker />  
            <Footer/>
        </div>
    );
}

export default ProfileSeekerPage;
