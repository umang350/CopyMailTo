# CopyMailTo

A minimal Chrome extension that intercepts `mailto:` link clicks, copies the email address to your clipboard, and shows a toast notification — instead of opening your mail app.

## Install

**Chrome**
1. Clone or download this repo
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the repo folder

**Firefox**
1. Clone or download this repo
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** and select any file in the repo folder

## How it works

- Listens for clicks on `mailto:` links across all pages
- Extracts just the email address (strips subject, cc, body params)
- Copies it to the clipboard
- Shows a small toast in the bottom-right corner that dismisses after 2.5s

![Toast notification showing "Email copied" with the address](https://github.com/user-attachments/assets/placeholder)

## Why

Clicking a `mailto:` link almost never does what you want — it launches a mail app you may not use, or throws an error. This extension makes those links actually useful.

## Permissions

- `content_scripts` on all URLs — needed to intercept link clicks on any page
- No network requests, no data collection, no background service worker
