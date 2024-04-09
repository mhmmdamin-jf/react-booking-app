import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useCheckIn } from "./useCheckIn"
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings"
import { useParams } from "react-router";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { bookingId } = useParams();
  const { data: booking = {}, error: bookingError } = useBooking(bookingId.toString());
  const { mutate = () => { }, isLoading: isUpdating } = useCheckIn();
  const { data = {}, error, isLoading: isLoadingSettingsData } = useSettings();
  const [confirm, setConfirm] = useState(false);
  const [hasBreakfastState, setHasBreakfastState] = useState(false);
  const {
    isPaid,
    // guests,
    totalPrice,
    numGuests,
    // hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    data?.breakfastPrice * numNights * numGuests
  const isLoading = isLoadingSettingsData || isUpdating || isPaid;
  function handleCheckin() {
    if (!confirm) {
      return;
    }
    if (hasBreakfastState) {
      mutate({
        id: bookingId, hasBreakfast: {
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
          hasBreakfast: true
        }
      })
    }
    else if (!hasBreakfastState) {
      mutate({
        id: bookingId, hasBreakfast: {}
      })
    }
  }
  if (isUpdating || isLoadingSettingsData) {
    return (<Spinner />)
  }
  if (error || bookingError) {
    return null;
  }
  console.log(booking)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking !== null && <BookingDataBox booking={booking} />}
      <Box>
        <Checkbox disabled={isLoading} id="confirm" checked={confirm} onChange={() => setConfirm(confirm => !confirm)} >
          Confirm somethig...
        </Checkbox>
      </Box>
      <Box>
        <Checkbox disabled={isLoading} id="confirm" checked={hasBreakfastState} onChange={() => setHasBreakfastState(breakfast => !breakfast)} >
          Also want breakfast?<span>{formatCurrency(optionalBreakfastPrice)}</span>
        </Checkbox>
      </Box>
      <Box>
        Price : {hasBreakfastState ?
          <span>{`${formatCurrency(totalPrice + (optionalBreakfastPrice))} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}</span> :
          <span>{`${formatCurrency(totalPrice)}`}</span>}
      </Box>
      <ButtonGroup>
        <Button disabled={!confirm || isPaid} onClick={handleCheckin}>Check in booking <span>#{bookingId}</span></Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
