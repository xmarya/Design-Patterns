import type { User } from "./User.js";

export type NotificationType = "signup" | "new-login" | "reset-password";
export type NotificationDTO = {
  type:NotificationType,
  to: User;
  date: Date;
};

export interface NotificationsStrategy {
  notify(notification: NotificationDTO): void;
}

