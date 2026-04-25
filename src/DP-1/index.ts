import type { NotificationDTO, NotificationsStrategy } from "./_types/NotificationsStrategy";
import users from "../shared/infra/_db/users.db.json";
import { EmailService } from "./Email/EmailService";
import { SmsService } from "./SMS/SmsService";
import { InAppNotification } from "./InApp/InAppService";

function sendNotification(data: NotificationDTO, notifier: NotificationsStrategy) {
  notifier.notify(data);
}

sendNotification(
  {
    type: "signup",
    to: users["003"],
    date: new Date(),
  },
  new InAppNotification(),
);
sendNotification(
  {
    type: "new-login",
    to: users["003"],
    date: new Date(),
  },
  new EmailService(),
);
sendNotification(
  {
    type: "reset-password",
    to: users["003"],
    date: new Date(),
  },
  new SmsService(),
);
