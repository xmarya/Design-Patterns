import path from "path";
import { readFile, writeFile, type File } from "../../shared/utils/fileSystem/fs";
import type { NotificationDTO, NotificationsStrategy } from "../_types/NotificationsStrategy.js";
import getNotificationContent from "../utils/getNotificationContent";
import { fileURLToPath } from "url";
export class EmailService implements NotificationsStrategy {
  private file: File;
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    this.file = { dirname: path.dirname(__filename), filename: "email.json" };
  }
  notify(notification: NotificationDTO): void {
    const result = readFile(this.file);

    const existingContent = result.ok === true && (result.content as string).length ? JSON.parse(result.content as string) : [];
    const formattedContent = this.formatNotification(notification);
    existingContent.push(formattedContent);

    writeFile({ file: this.file, content: JSON.stringify(existingContent, null, 2) });
  }

  private formatNotification(notification: NotificationDTO) {
    const { type, to, date } = notification;
    return {
      [to.email]: {
        ...getNotificationContent(type),
        date,
      },
    };
  }
}
