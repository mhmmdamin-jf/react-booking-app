import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

//eslint-disable-next-line
function CheckoutButton({ id, icon, disabled, onClick: onClickFunc, variation }) {
  const { mutate, isLoading: isUpdating } = useCheckOut();
  const handleClick = () => {
    mutate(id);
  }
  return (
    <Button variation={variation} size="small" disabled={isUpdating || disabled} onClick={() => { handleClick(); onClickFunc?.() }} >
      {icon}
      <span  > Check out</span >
    </Button >
  );
}

export default CheckoutButton;
