import type { NotificationDTO } from "../_types/NotificationsStrategy";
import { SmsService } from "./SmsService";
import users from "../../shared/infra/_db/users.db.json";
import readJsonFile from "../../shared/utils/fileSystem/readJsonFile";
import { writeFile } from "../../shared/utils/fileSystem/fs";

describe("SMS Service", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
    writeFile({ file: { dirname: __dirname, filename: "sms.json" }, content: JSON.stringify("") });
  });
  it("exists", () => {
    const smsService = new SmsService();
    expect(smsService.notify).toBeDefined();
  });

  it("should send a notification to user 003's phone number", () => {
    const now = new Date();
    vi.setSystemTime(now);

    const notification: NotificationDTO = {
      to: users["003"],
      type: "signup",
      date: now,
    };
    const smsService = new SmsService();

    smsService.notify(notification);
    const userPhone = users["003"].phoneNumber;
    const content = readJsonFile({ dirname: __dirname, filename: "sms.json" });

    expect(content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          [userPhone]: {
            subject: expect.stringMatching(/welcome/i),
            content: expect.any(String),
            date: expect.stringMatching(now.toISOString()),
          },
        }),
      ]),
    );
  });
});
