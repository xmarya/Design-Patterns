import users from "../../shared/_db/users.db.json";
import { writeFile } from "../../shared/fileSystem/fs";
import type { NotificationDTO } from "../_types/NotificationsStrategy";
import { InAppNotification } from "./InAppService";

describe("In App notifications service", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
    writeFile({ file: { dirname: __dirname, filename: "in-app.json" }, content: JSON.stringify("") });
  });

  it("exist", () => {
    const inAppService = new InAppNotification();
    expect(inAppService).toBeDefined();
  });

  it("should send the reset-password notification to userId:002", () => {
    const now = new Date();
    vi.setSystemTime(now);

    const notification: NotificationDTO = {
      to: users["002"],
      type: "reset-password",
      date: now,
    };
    const inAppService = new InAppNotification();
    inAppService.notify(notification);

    const result = inAppService.getUserNotifications("002");
    expect(result.length).not.toEqual([]);
    expect(result.length).toBeGreaterThan(0);

    const newNoti = result.filter((noti) => noti["002"]?.date.toString() === now.toISOString())[0];

    expect(newNoti).toBeDefined();
    expect(newNoti?.subject).toContain(/reset/i);
  });

  it("should mark the selected notification as read", () => {
    const inAppService = new InAppNotification();
    const userId = users["002"].id;
    const result = inAppService.getUserNotifications(userId);

    const unreadNoti = result.filter((noti) => noti[userId]?.unread);
    const unreadNotiId = unreadNoti[0]?.[userId]?.notiId;
    if (unreadNotiId) {
      const notifications = inAppService.markAsRead({ userId, notificationId: unreadNotiId });
      const updatedNoti = notifications.filter((noti) => noti[userId]?.notiId === unreadNotiId)[0];

      expect(updatedNoti).toMatchObject({ [userId]: { unread: false } });
    }
  });
});
