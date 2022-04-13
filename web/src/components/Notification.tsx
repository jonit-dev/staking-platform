import { observer } from "mobx-react";
import React from "react";
import { notificationStore } from "../store/Notification.store";

export type NotificationType =
  | "is-primary"
  | "is-link"
  | "is-info"
  | "is-success"
  | "is-warning"
  | "is-danger";

export const Notification: React.FC = observer(() => {
  const { notification } = notificationStore;

  return notification?.isOpen ? (
    <div className={`notification ${notification.type}`}>
      <button
        className="delete"
        onClick={() => notificationStore.clearNotification()}
      />
      {notification.message}
    </div>
  ) : null;
});
