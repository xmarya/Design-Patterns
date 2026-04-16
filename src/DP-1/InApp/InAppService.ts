import { writeFile, type File } from "../../shared/fileSystem/fs";
import type { InAppDTO } from "../_types/InAppDTO";
import type { NotificationDTO, NotificationsStrategy } from "../_types/NotificationsStrategy";
import getNotificationContent from "../utils/getNotificationContent";
import readJsonFile from "../../shared/utils/readJsonFile";

export class InAppNotification implements NotificationsStrategy {
  private file: File;
  constructor() {
    this.file = { dirname: __dirname, filename: "in-app.json" };
  }
  notify(notification: NotificationDTO): void {
    const existingContent = readJsonFile<InAppDTO>(this.file);
    const newNotification = this.formatNotification(notification);

    existingContent.push(newNotification);
    writeFile({ file: this.file, content: JSON.stringify(existingContent, null, 2) });
  }

  private formatNotification(newNotification: NotificationDTO): InAppDTO {
    const {
      to: { id: userId },
      type,
      date,
    } = newNotification;

    return {
      [userId]: {
        notiId: Math.random().toString().substring(12), // decreases the id digits.
        ...getNotificationContent(type),
        unread: true,
        date,
      },
    };
  }
  markAsRead({ userId, notificationId }: { userId: string; notificationId: string }) {
    const notifications = readJsonFile<InAppDTO>(this.file);

    notifications.forEach((noti, index) => {
      if (noti[userId]?.notiId === notificationId) {
        notifications[index] = { ...noti, [userId]: { ...noti[userId], unread: false } };
      }
    });
    writeFile({ file: this.file, content: JSON.stringify(notifications, null, 2) });

    return notifications;
  }
  getUserNotifications(userId: string) {
    const exitingContent = readJsonFile<InAppDTO>(this.file);

    const notifications = exitingContent.filter((noti) => noti[userId]);

    return notifications;
  }
}
