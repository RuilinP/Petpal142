import { Card } from "react-bootstrap";
import propTypes from "prop-types";


const ErrorCard = (props) => {

	const { error } = props;

	return (
		<Card bg="danger" text="white" className="my-2">
			<Card.Body>
				<Card.Title>{error.message}</Card.Title>
			</Card.Body>
		</Card>
	)
}

ErrorCard.propTypes = {
	error: propTypes.object.isRequired
}

export default ErrorCard;