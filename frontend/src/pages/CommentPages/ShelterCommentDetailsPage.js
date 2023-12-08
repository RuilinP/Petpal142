import { useParams } from 'react-router-dom';
import '../styles/reviews.css'
import '../styles/custom.css'
import '../styles/main.css'
import '../styles/daterangepicker-bs3.css'
import '../styles/fix-pos-icon.css'
import LeaveReplyBox from '../../components/Comments/LeaveReviewBox/LeaveReplyBox';
import ReplyList from '../../components/Comments/ReplyList/ReplyList';
import Footer from '../../components/common/footer';
import Header from '../../components/common/header';

function ShelterCommentDetails() {
    const { shelterId, commentId } = useParams();

    return (
        <div className='bg-secondary'>
            <Header/>
            <main>
                <div className="container white-container p-3 mt-sm-4 mb-sm-4">

                    <section id="reviews" className="my-5">
                        <div className="section-heading mb-4">
                            <h2>Comment Details</h2>
                        </div>

                        <div className="container">
                            <div id="reviewBody" className="row d-flex justify-content-center">
                                <div className="col-lg-10 col-12 pb-4">

                                <LeaveReplyBox shelterId={shelterId} commentId={commentId} />
                                <ReplyList commentId={commentId} shelterId={shelterId}/>

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

export default ShelterCommentDetails;
