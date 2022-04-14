import { toast } from "react-toastify";

type ToastType = "info" | "success" | "warning" | "error" | "default";

export const showError = (message: string) => toast.error(message);

export const showMessage = (message: string, type: ToastType) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
    default:
      toast.info(message);
  }
};
