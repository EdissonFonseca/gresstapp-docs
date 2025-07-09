# Gresst App Synchronization - User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [How Synchronization Works](#how-synchronization-works)
3. [Online Mode](#online-mode)
4. [Offline Mode](#offline-mode)
5. [Reconnection Process](#reconnection-process)
6. [What Gets Synchronized](#what-gets-synchronized)
7. [Visual Indicators](#visual-indicators)
8. [Common Scenarios](#common-scenarios)
9. [Troubleshooting](#troubleshooting)

## Introduction

The Gresst mobile app is designed to work seamlessly whether you have an internet connection or not. This guide explains how the app keeps your data synchronized between your mobile device and the web application, ensuring you never lose your work.

### Key Features
- **Works Offline**: You can continue using the app even without internet
- **Automatic Sync**: Changes are saved locally and sent to the server when connected
- **No Data Loss**: All your work is preserved, even if you lose connection
- **Smart Queue**: The app remembers what needs to be sent to the server

## How Synchronization Works

Think of the Gresst app like a smart notebook that works in two ways:

1. **When you're online**: Your changes are sent immediately to the server
2. **When you're offline**: Your changes are saved in a "pending list" and sent later

The app uses a queue system - imagine it as a to-do list of things that need to be sent to the server. When you perform actions in the app, they're added to this list and processed when you have internet connection.

## Online Mode

### What Happens When You're Connected

When your device has a stable internet connection:

1. **Immediate Sync**: Most of your actions are sent to the server right away
2. **Real-time Updates**: You see the latest data from other users
3. **Instant Feedback**: Confirmations and updates happen immediately
4. **Background Sync**: The app periodically checks for new data

### Visual Indicators
- The sync button in the header shows no red badge
- Actions complete quickly with immediate feedback
- You see real-time updates from other team members

### What Gets Synced Immediately
- Creating new tasks
- Updating existing records
- Adding inventory entries
- Submitting forms
- Photo uploads

## Offline Mode

### What Happens When You Lose Connection

When your internet connection is lost or unstable:

1. **Local Storage**: All your work is saved on your device
2. **Queue Building**: Actions are added to a "pending" list
3. **Continued Work**: You can keep using the app normally
4. **Visual Warnings**: The app shows you're working offline

### Visual Indicators
- The sync button shows a red badge with the number of pending items
- You might see "Offline Mode" or "No Connection" messages
- Actions complete locally but show as "pending sync"

### What You Can Do Offline
- Create new tasks and activities
- Update existing records
- Add inventory entries
- Take photos
- Fill out forms
- View previously downloaded data

### What Gets Queued
- All create/update operations
- Photo uploads
- Form submissions
- Data modifications

## Reconnection Process

### What Happens When You Get Back Online

When your internet connection is restored:

1. **Automatic Detection**: The app detects the connection is back
2. **Queue Processing**: All pending items are sent to the server
3. **Data Download**: Latest data is downloaded from the server
4. **Conflict Resolution**: Any conflicts are resolved automatically
5. **Status Update**: Visual indicators return to normal

### Step-by-Step Reconnection

```
1. Connection Restored
   ↓
2. Check Pending Items
   ↓
3. Send Queued Data
   ↓
4. Download Updates
   ↓
5. Update Local Data
   ↓
6. Clear Pending Queue
   ↓
7. Return to Online Mode
```

### Visual Indicators During Reconnection
- Sync button shows spinning animation
- Progress indicators for upload/download
- "Syncing..." messages
- Badge count decreases as items are processed

### What Happens If Reconnection Fails
- Pending items remain in the queue
- You can continue working offline
- The app will try again automatically
- Manual sync option is always available

## What Gets Synchronized

### Data Types

**User Information**
- Account details and permissions
- User preferences and settings

**Business Data**
- Tasks and activities
- Transactions and workflows
- Inventory records
- Material information
- Location data (points)
- Treatment records

**Files and Media**
- Photos taken in the app
- Document uploads
- Signature captures

### Synchronization Priority

1. **High Priority** (sent first)
   - Critical business data
   - User actions
   - Form submissions

2. **Medium Priority**
   - Photo uploads
   - Large data sets
   - Background updates

3. **Low Priority**
   - Optional data
   - Historical records
   - Non-critical updates

## Visual Indicators

### Header Sync Button

**Online Mode**
```
[🔄] (no badge)
```

**Offline Mode**
```
[🔄] [3] (red badge with count)
```

**Syncing**
```
[🔄] (spinning animation)
```

### Status Messages

**Online**
- "Connected"
- "All data synced"
- "Up to date"

**Offline**
- "Working offline"
- "3 items pending sync"
- "No internet connection"

**Syncing**
- "Syncing data..."
- "Uploading 2 of 5 items"
- "Downloading updates..."

## Common Scenarios

### Scenario 1: Working in the Field

**Situation**: You're at a remote location with poor internet

**What Happens**:
1. You start working - app detects poor connection
2. All your work is saved locally
3. Sync button shows pending count
4. You continue working normally
5. When you return to good signal, everything syncs automatically

### Scenario 2: Intermittent Connection

**Situation**: Your connection keeps dropping

**What Happens**:
1. App switches between online/offline modes
2. Completed items are removed from queue
3. Failed items remain for retry
4. You see real-time status updates
5. No data is lost during connection drops

### Scenario 3: Long Offline Period

**Situation**: You're offline for several days

**What Happens**:
1. All work is saved locally
2. Queue builds up over time
3. When you reconnect, everything syncs in order
4. You get latest data from other users
5. Any conflicts are resolved automatically

### Scenario 4: Multiple Users

**Situation**: Several people are working on the same data

**What Happens**:
1. Each user's changes are queued locally
2. When syncing, changes are merged intelligently
3. Conflicts are resolved based on timestamps
4. Everyone sees the latest combined data
5. No work is lost from any user

## Troubleshooting

### Common Issues

**Sync Button Shows High Number**
- Check your internet connection
- Try manual sync
- Restart the app if needed

**Items Not Syncing**
- Verify you're logged in
- Check if the server is accessible
- Try again later

**Data Missing After Sync**
- Check if you're looking at the right date range
- Verify your filters
- Contact support if issue persists

**App Seems Slow**
- Large sync queue might be processing
- Wait for background sync to complete
- Check your internet speed

### Manual Sync

If automatic sync isn't working:

1. Go to the main menu
2. Tap "Synchronization"
3. Tap "Sync Now"
4. Wait for the process to complete

### When to Contact Support

- Sync button stuck on high number for hours
- Data appears to be lost
- App crashes during sync
- Cannot connect to server for extended period

## Best Practices

### For Reliable Synchronization

1. **Regular Sync**: Sync manually if you've been offline for a while
2. **Check Connection**: Ensure good internet before important work
3. **Patience**: Let sync complete before closing the app
4. **Backup**: Important data is automatically backed up locally

### For Optimal Performance

1. **WiFi Preferred**: Use WiFi when possible for faster sync
2. **Close Other Apps**: Free up memory for better performance
3. **Regular Updates**: Keep the app updated for best functionality
4. **Clear Cache**: If sync issues persist, clear app cache

## Summary

The Gresst app's synchronization system ensures you can work confidently in any environment:

- **Always Available**: Work offline when needed
- **Automatic**: Sync happens in the background
- **Reliable**: No data loss, even with poor connections
- **Smart**: Handles conflicts and merges data automatically
- **Transparent**: Clear visual indicators of sync status

This system allows you to focus on your work without worrying about connectivity issues, knowing that all your data will be properly synchronized when possible. 
