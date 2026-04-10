import type { NotificationType } from "../_types/NotificationsStrategy";

const notificationContent = {
  signup: {
    subject: "Welcome! 🎉",
    content: "We are happy to have you. complete your profile to start with us.",
  },
  "new-login": {
    subject: "Login attempt",
    content: "This email is to inform you about a login attempt to your account.",
  },
  "reset-password": {
    subject: "Your account password has been reset",
    content: `This email is to inform you about a password reset attempt to your account. 
      If you don't know about this process please contact us immediately`,
  },
} satisfies Record<NotificationType, { subject: string; content: string }>;

const getNotificationContent = (type: NotificationType) => notificationContent[type];

export default getNotificationContent;
