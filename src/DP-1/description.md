Practice 1 — The Notification Dispatcher
# Context: You're building a SaaS app. When a user completes an action (e.g., signs up, upgrades a plan, resets password), the system must notify them through multiple channels: email, SMS, and in-app notification.

# Problem: The notification logic is currently hardcoded per action. Adding a new channel (e.g., Slack, push notification) requires touching every action's handler. Decouple the channel delivery mechanism from the triggering logic so new channels can be plugged in with zero changes to existing code.

# My Solution: Since there are 3 different channels -and the may increase-, each has it own setup/logic; that means the right DP is a Behavioral Design Pattern.

# Features:
    - I want to separate each channel notifications in a file.
    - The notifications count of each service (channel) should be increase.
    - The notifications count should be cleared/marked as read.
    - In-App notification needs on the user id.
    - Email notification needs on the user email address.
    - SMS notification needs on the user phone number.

# Future Enhancements: The solution could be a combination between the Strategy and the Factory, in which we can notify the user only via their preferred channels.