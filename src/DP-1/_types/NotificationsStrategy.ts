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


export class SMSNotification implements NotificationsStrategy {
  // phone number
  notify(notification: NotificationDTO): void {
    // write to sms.json
  }
}
