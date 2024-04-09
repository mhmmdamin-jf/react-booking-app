import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams } from "react-router";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useBooking();
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking(booking?.id);
  const status = booking?.status;
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const handleDelete = () => {
    deleteBooking();
  }
  if (isLoading || isDeleting) {
    return (<Spinner />)
  }
  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{booking?.id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <Modal.Window>
          <ConfirmDelete disabled={isDeleting} onConfirm={handleDelete} resourceName={booking?.Guests?.fullName + "booking"} />
        </Modal.Window>
        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && <Button onClick={() => navigate(`/check-in/${booking?.id}`)}>
            Check in
          </Button>}
          {status === "checked-in" && <>
            <CheckoutButton disabled={isLoading || isDeleting} id={bookingId} />
            <Modal.Open>
              <Button >
                Delete
              </Button>
            </Modal.Open>
          </>}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>

    </>
  );
}

export default BookingDetail;
