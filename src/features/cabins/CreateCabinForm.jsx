import styled from "styled-components";
import { useForm } from 'react-hook-form'
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useEditCabin } from "./useEditCabin";
import { useInsertCabin } from './useInsertCabin'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm(prop) {
  const { isCreating, insertCabin } = useInsertCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isEditing || isCreating;
  const { cabinItem } = prop;
  const { id } = cabinItem ? cabinItem : 0;
  const isEditSession = Boolean(id);
  const { register, getValues, handleSubmit, reset, formState } = useForm({ defaultValues: cabinItem });
  function submitHandler(data) {
    if (isEditSession) { editCabin({ newCabin: data, id }, { onSuccess: () => reset() }); }
    else { insertCabin({ newCabin: data }, { onSuccess: () => reset() }); }
  }
  function FormRowComponent(data) {
    return (
      <FormRow>
        {data.label && <Label htmlFor={String(data.label).toLowerCase().replace(' ', '')}>{data.label}</Label>}
        {data.Input}
        {data.error && <Error>{data.error?.message}</Error>}
      </FormRow>
    );
  }
  return (
    <>
      <Form type={prop.onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(submitHandler)}>
        <FormRowComponent label='Cabin name' error={formState?.errors?.name} Input={<Input type="text" id="name" {...register('name', { required: "this field is required", minLength: val => Number(val) > 3 || 'should be greater than 3' })} />} />
        <FormRowComponent label={'Maximum capacity'} error={formState?.errors?.maxCapacity} Input={<Input type="number" id="maxCapacity" {...register('maxCapacity', { required: "is req", validate: val => 0 < Number(val) || 'should be greather than zero' })} />} />
        <FormRowComponent label={'Regular price'} error={formState?.errors?.regularPrice} Input={<Input type="number" id="regularPrice" {...register('regularPrice', { required: "this field is required" })} />} />
        <FormRowComponent label={'Discount'} error={formState?.errors?.discount} Input={<Input type="number" id="discount" {...register('discount', { required: "this field is required", maxLength: val => Number(val) >= Number(getValues().reqularPrice) || 'should be less than regular price' })} />} />
        <FormRowComponent label={'Description for website'} error={formState?.errors?.description} Input={<Textarea type="number" id="description" defaultValue="" {...register('description')} />} />
        <FormRowComponent label={'Cabin photo'} error={formState?.errors?.cabinPhoto} Input={<FileInput onClick={e => console.log(e)} id="image" accept="image/*" {...register('cabinPhoto', { required: id ? false : 'photo is requierd' })} />} />
        <FormRow>
          <Button onClick={() => { reset(); prop.onCloseModal?.(); }} variation="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit" disabled={isWorking}>{isEditSession ? 'Edit' : 'Add'}</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
