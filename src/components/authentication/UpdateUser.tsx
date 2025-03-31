import Heading from "../../ui/Heading";
import UpdateUserDataForm from "./UpdateUserDataForm";
import UpdateUserPasswordForm from "./UpdateUserPasswordForm";

export default function UpdateUser() {
  return (
    <>
      <Heading title="Update your account" />
      <UpdateUserDataForm />
      <UpdateUserPasswordForm />
    </>
  );
}
