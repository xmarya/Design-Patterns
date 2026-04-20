import type { NotificationDTO, NotificationsStrategy } from "../_types/NotificationsStrategy";
import { writeFile, type File } from "../../shared/fileSystem/fs";
import getNotificationContent from "../utils/getNotificationContent";
import readJsonFile from "../../shared/utils/readJsonFile";
export class SmsService implements NotificationsStrategy {
  private file: File = { dirname: __dirname, filename: "sms.json" };
  notify(notification: NotificationDTO): void {
    // write to sms.json
    const content = readJsonFile(this.file);
    content.push(this.formatNotification(notification));
    writeFile({ file: this.file, content: JSON.stringify(content, null, 2) });
  }

  private formatNotification(notification: NotificationDTO) {
    const {
      to: { phoneNumber },
      type,
      date,
    } = notification;

    return {
      [phoneNumber]: {
        ...getNotificationContent(type),
        date,
      },
    };
  }
}
