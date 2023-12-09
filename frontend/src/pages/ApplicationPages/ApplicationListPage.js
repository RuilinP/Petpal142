import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import ApplicationList from '../../components/pet/adoption/ApplicationList';

function ApplicationListPage() {

    return (
        <div className='bg-secondary d-flex flex-column min-vh-100'>
            <Header/>
            <main className="flex-1 d-flex flex-column bg-secondary">
                <div className="flex-grow-1 container white-container p-3 mt-sm-4 mb-sm-4">
                    <ApplicationList />
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default ApplicationListPage;
