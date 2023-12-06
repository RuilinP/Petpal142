import { useParams } from 'react-router-dom';
import LeaveCommentBox from '../../components/Comments/LeaveReviewBox/LeaveCommentBox'; 
import '../styles/reviews.css'
import '../styles/custom.css'
import '../styles/main.css'
import '../styles/daterangepicker-bs3.css'
import '../styles/fix-pos-icon.css'
import CommentList from '../../components/Comments/CommentList/CommentList';
import AverageRating from '../../components/Comments/CommentList/AvgRating';

function ShelterReviews() {
    const { shelterId } = useParams();

    return (
        <main>
            <div className="container white-container p-3 mt-sm-4 mb-sm-4">

                <section id="reviews" className="my-5">
                    <div className="section-heading mb-4">
                        <h2>Shelter Reviews</h2>
                    </div>

                    <AverageRating shelterId={shelterId} />

                    <div className="container">
                        <div id="reviewBody" className="row d-flex justify-content-center">
                            <div className="col-lg-10 col-12 pb-4">

                            <LeaveCommentBox shelterId={shelterId} />
                            <CommentList shelterId={shelterId}/>

                            </div>
                        </div>
                    </div>

                </section>
            </div>    
        </main>
    );
}

export default ShelterReviews;
