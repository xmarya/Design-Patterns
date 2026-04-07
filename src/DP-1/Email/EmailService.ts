import { isFileExist, readFile, writeFile, type File } from "../../shared/fileSystem/fs";
import type { NotificationDTO, NotificationsStrategy } from "../_types/NotificationsStrategy.js";
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
    const content = type === "new-login" ? this.getLoginContent() : type === "reset-password" ? this.getResetContent() : this.getSignupContent();
    return {
      [to.email]: {
        ...content,
        date,
      },
    };
  }

  private getSignupContent() {
    return {
      subject: "Welcome! 🎉",
      content: "We are happy to have you. complete your profile to start with us.",
    };
  }
  private getLoginContent() {
    return {
      subject: "Login attempt",
      content: "This email is to inform you about a login attempt to your account.",
    };
  }

  private getResetContent() {
    return {
      subject: "Your account password has been reset",
      content: `This email is to inform you about a password reset attempt to your account. 
      If you don't know about this process please contact us immediately`,
    };
  }
}
