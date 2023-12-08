import { useParams } from 'react-router-dom';
import LeaveCommentBox from '../../components/Comments/LeaveReviewBox/LeaveCommentBox'; 
import '../styles/reviews.css'
import '../styles/custom.css'
import '../styles/main.css'
import '../styles/daterangepicker-bs3.css'
import '../styles/fix-pos-icon.css'
import CommentList from '../../components/Comments/CommentList/CommentList';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

function ApplicationCommentPage() {
    const { applicationId } = useParams();

    return (
        <div className='bg-secondary'>
            <Header/>
            <main>
            <div className="container white-container p-3 mt-sm-4 mb-sm-4">

                <section id="reviews" className="my-5">
                    <div className="section-heading mb-4">
                        <h2>Application Reviews</h2>
                    </div>

                    <div className="container">
                        <div id="reviewBody" className="row d-flex justify-content-center">
                            <div className="col-lg-10 col-12 pb-4">

                            <LeaveCommentBox applicationId={applicationId} />
                            <CommentList applicationId={applicationId}/>

                            </div>
                        </div>
                    </div>

                </section>
            </div>    
        </main>
        <Footer/>
        </div>
    );
}

export default ApplicationCommentPage;
