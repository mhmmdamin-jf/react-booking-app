import Button from "../../ui/Button";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

function LogoutButton() {
      const { mutate, isLoading } = useLogout();
      const handleClick = () => {
            mutate();
      }
      return (
            <Button onClick={handleClick} Button variations="none" size="sm">
                  {isLoading ? <SpinnerMini /> : <HiOutlineArrowRightOnRectangle />}
            </Button >
      )
}

export default LogoutButton
