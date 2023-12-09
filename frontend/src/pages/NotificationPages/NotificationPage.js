import '../styles/custom.css'
import '../../assets/styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import NotificationList from '../../components/Notifications/NotificationList';

function NotificationPage() {

    return (
        <div className='bg-secondary'>
            <Header/>
            <main className="bg-secondary">
                <div className="container white-container p-3 mt-sm-4 mb-sm-4">
                    <div className="section-heading mt-5">
                        <h2>Notifications</h2>
                    </div>

                    <NotificationList />
                    
                </div>
            </main>
        <Footer/>
        </div>
    );
}

export default NotificationPage;
