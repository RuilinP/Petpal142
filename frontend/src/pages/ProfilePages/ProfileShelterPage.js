import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import ProfileShelter from '../../components/Profiles/ProfileShelter';

function ProfileShelterPage() {

    return (
        <div className='min-vh-100 d-flex flex-column bg-secondary'>
            <Header/>
            <ProfileShelter />  
            <Footer/>
        </div>
    );
}

export default ProfileShelterPage;
