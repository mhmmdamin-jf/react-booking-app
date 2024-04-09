import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from './useSettings'
import Spinner from '../../ui/Spinner'
import { useUpdateSetting } from "./useUpdateSetting";
import { Toaster, toast } from "react-hot-toast";
function UpdateSettingsForm() {
  const { data: {
    minbookingLength,
    maxbookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = {}, isLoading } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();
  function handleBlur(value, fieldName) {
    if (value == null || value == 0) {
      toast.error('invalid value');
      return;
    }
    updateSetting({ [fieldName]: value });
  }
  return (<>
    <Toaster position="top-center" containerStyle={{ margin: '10px' }} toastOptions={{ success: { duration: 3000 }, error: { duration: 5000 } }} />
    {isLoading ? <Spinner /> :
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minbookingLength}
            name='minbookingLength'
            disabled={isUpdating}
            onBlur={(e) => handleBlur(e.target.value, e.target.name)}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxbookingLength}
            name='maxbookingLength'
            disabled={isUpdating}
            onBlur={(e) => handleBlur(e.target.value, e.target.name)}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            name='maxGuestsPerBooking'
            disabled={isUpdating}
            onBlur={(e) => handleBlur(e.target.value, e.target.name)}
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            name='breakfastPrice'
            disabled={isUpdating}
            onBlur={(e) => handleBlur(e.target.value, e.target.name)}
          />
        </FormRow>
      </Form>}
  </>);
}

export default UpdateSettingsForm;
