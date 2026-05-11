# STAGE 1

--- Core Actions ---

1. create notifications
2. get notifications
3. fetch notifications by ID
4. mark notificatios as read
5. delete function
6. live notification updates

--- notifications JSON schema ---

{
  "id": "notif_0001",
  "userId": "user_0001",
  "title": "title",
  "message": "message",
  "priority": "high",
  "isRead": false,
  "createdAt": "2026-01-01_10:00:00",
  "updatedAt": "2026-01-01_10:00:00"
}


## POST NOTIFICATIONS

ENDPOINT:

POST /notifications

REQUEST:

{
  "userIds": ["user_0001"],
  "title": "new alert",
  "message": "test notification",
  "priority": "high"
}

RESPONSE:

{
  "success": true,
  "message": "notification created successfully"
}

## GET NOTIFICATIONS

ENDPOINT:

GET /notifications

REQUEST:

{
  "success": true,
  "data": {
    "notifications": []
  }
}

## MARK AS READ NOTIFICATIONS

ENDPOINT:

PATCH /notifications/{notificationId}/read

REQUEST:

{
  "isRead": true
}

RESPONSE:

{
  "success": true,
  "message": "notification marked as read"
}

## DELETE NOTIFICATIONS

ENDPOINT:

DELETE /notifications/{notificationId}

RESPONSE:

{
  "success": true,
  "message": "notification deleted successfully"
}

# STAGE 2

