import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import Spinner from "../../ui/Spinner";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const form = useForm();
  const { isLoading, mutate } = useSignUp();
  const handleSubmit = (data) => {
    mutate({ ...data });
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormRow label="Full name" error={form.formState.errors?.name?.message}>
        <Input type="text" id="fullName" {...form.register("name", { required: "name is required." })} />
      </FormRow>

      <FormRow label="Email address" error={form.formState.errors?.email?.message}>
        <Input type="email" id="email" {...form.register("email", {
          required: "email is required.",
          pattern: { value: /\S+@\S+\.\S+/, message: "email is not valid." }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={form.formState?.errors?.password?.message}>
        <Input type="password" id="password" {...form.register("password",
          {
            required: "pass is required.",
            minLength: { value: 6, message: "min is 6." }
          })} />
      </FormRow>

      <FormRow label="Repeat password" error={form.formState?.errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...form.register("passwordConfirm",
          {
            validate: (data) =>
              data === form.getValues("password") || "is not match"
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" >Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
