import { EmailService } from "./EmailService.js";
import users from "../../shared/_db/users.db.json";
import type { NotificationDTO } from "../_types/NotificationsStrategy.js";
import { readFile, writeFile, type File } from "../../shared/fileSystem/fs.js";
import { expect } from "vitest";

describe("Email Service", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
    writeFile({ file: { dirname: __dirname, filename: "email.json" }, content: JSON.stringify("") });
  });

  it("should exist", () => {
    const emailService = new EmailService();
    expect(emailService).toBeDefined();
    expect(emailService.notify).toBeDefined();
  });

  it("should notify user 001 email: james@email.com", () => {
    const now = new Date();
    vi.setSystemTime(now);

    const notification: NotificationDTO = {
      type: "new-login",
      to: users["001"],
      date: now,
    };
    const emailService = new EmailService();
    emailService.notify(notification);

    const file: File = { dirname: __dirname, filename: "email-notifications.json" };
    const result = readFile(file);

    if (result.ok)
      expect(JSON.parse(result.content as string)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "james@email.com": { subject: expect.stringMatching(/login/i), content: expect.any(String), date: expect.any(String) },
          }),
        ]),
      );
  });
});
