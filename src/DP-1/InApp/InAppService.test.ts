import { InAppNotification } from "./InAppService";
import users from "../../shared/_db/users.db.json";
import type { NotificationDTO } from "../_types/NotificationsStrategy";
import type { InAppDTO } from "../_types/InAppDTO";
import readJsonFile from "../../shared/utils/readJsonFile";

describe("In App notifications service", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
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

 
});
