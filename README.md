# CopyMailTo

A minimal Chrome/Firefox extension that intercepts `mailto:` and `tel:` link clicks, copies the value to your clipboard, and shows a toast notification — instead of opening your mail or phone app.

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

- Listens for clicks on `mailto:` and `tel:` links across all pages
- Extracts just the email address or phone number
- Copies it to the clipboard
- Shows a small toast in the bottom-right corner that dismisses after 2.5s

![Toast notification showing "Email copied" with the address](https://github.com/user-attachments/assets/placeholder)

## Test it

Once installed, click this link: [code@umang.dev](mailto:code@umang.dev)

The email address should be copied to your clipboard and a toast should appear — no mail app opened.

## Why

Clicking a `mailto:` link almost never does what you want — it launches a mail app you may not use, or throws an error. This extension makes those links actually useful.

## Permissions

- `content_scripts` on all URLs — needed to intercept link clicks on any page
- No network requests, no data collection, no background service worker
