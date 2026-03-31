Practice 1 — The Notification Dispatcher
# Context: You're building a SaaS app. When a user completes an action (e.g., signs up, upgrades a plan, resets password), the system must notify them through multiple channels: email, SMS, and in-app notification.

# Problem: The notification logic is currently hardcoded per action. Adding a new channel (e.g., Slack, push notification) requires touching every action's handler. Decouple the channel delivery mechanism from the triggering logic so new channels can be plugged in with zero changes to existing code.