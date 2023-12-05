import { useParams } from 'react-router-dom';
import LeaveCommentBox from '../../components/Comments/LeaveReviewBox/LeaveCommentBox'; 
import './reviews.css'

function ShelterReviews() {
    const { shelterId } = useParams();
    console.log("ShelterCommentsPage is rendered");

    return (
        <div>
            <LeaveCommentBox shelterId={shelterId} />
        </div>
    );
}

export default ShelterReviews;
