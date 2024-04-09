import styled from "styled-components";
import { format, isToday } from "date-fns";
import { TbEyeFilled } from "react-icons/tb";
import Tag from "../../ui/Tag";
import { Table } from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { BsBoxArrowUp, BsBoxArrowDown, BsTrash3 } from "react-icons/bs";
import CheckoutButton from "../check-in-out/CheckoutButton"
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Spinner from "../../ui/Spinner"
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
//eslint-disable-next-line
function BookingRow({ booking: { id: bookingId, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, Guests: { fullName: guestName, email }, Cabins: { name: cabinName }, }, columns }) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking(bookingId);
  const handleDelete = () => {
    deleteBooking();
  }
  if (isDeleting) { return (<Spinner />) }
  return (
    <Table.Row columns={columns}>
      <Cabin  > {cabinName}</Cabin >
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      {/* eslint-disable-next-line */}
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/booking/${bookingId}`)}>
              <TbEyeFilled />
              <span>See details</span>
            </Menus.Button>
            {status === "unconfirmed" &&
              <Menus.Button onClick={() => navigate(`/check-in/${bookingId}`)}>
                <BsBoxArrowDown />
                <span>Check In</span>
              </Menus.Button>
            }
            {status === "checked-in" &&
              <>
                <Menus.Button >
                  <CheckoutButton variation="none" icon={<BsBoxArrowUp />} disabled={isDeleting} id={bookingId} />
                </Menus.Button>
                <Modal.Open opens="delete-booking">
                  <Menus.Button >
                    <BsTrash3 />
                    <span>Delete Cabin</span>
                  </Menus.Button>
                </Modal.Open>
                <Modal.Window>
                  <ConfirmDelete disabled={isDeleting} onConfirm={handleDelete} resourceName={guestName} />
                </Modal.Window>
              </>
            }
          </Menus.List>
        </Menus>
      </Modal>
    </Table.Row >
  );
}

export default BookingRow;
