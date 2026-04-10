import { readFile, writeFile, type File } from "../../shared/fileSystem/fs";
import type { NotificationDTO, NotificationsStrategy } from "../_types/NotificationsStrategy.js";
import getNotificationContent from "../utils/getNotificationContent";
export class EmailService implements NotificationsStrategy {
  notify(notification: NotificationDTO): void {
    const file: File = { dirname: __dirname, filename: "email-notifications.json" };
    const result = readFile(file);

    const existingContent = result.ok === true && (result.content as string).length ? JSON.parse(result.content as string) : [];
    const formattedContent = this.formatEmailNotification(notification);
    existingContent.push(formattedContent);

    writeFile({ file, content: JSON.stringify(existingContent, null, 2) });
  }

  private formatEmailNotification(notification: NotificationDTO) {
    const { type, to, date } = notification;
    return {
      [to.email]: {
        ...getNotificationContent(type),
        date,
      },
    };
  }
}
