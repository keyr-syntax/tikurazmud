import { toast } from "react-hot-toast";

function NotifyButton() {
  const notify = () => toast.success("This is a success message!");
  const errorNotify = () => toast.error("This is error");

  return (
    <>
      <button onClick={notify}>Show success</button>
      <button onClick={errorNotify}>Show error</button>
    </>
  );
}

export default NotifyButton;
