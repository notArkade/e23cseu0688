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

# Database Choice

PostgreSQL

## Reason for Choosing PostgreSQL

- Supports structured relational data
- Reliable ACID transactions
- Efficient indexing for fast notification retrieval
- Supports JSON fields if additional metadata is needed
- Good scalability for large applications
- Easy integration with REST APIs

# SQL Schema

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# SQL Queries Based on APIs

## 1. Create Notification

```sql
INSERT INTO notifications (
    id,
    user_id,
    title,
    message,
    priority
)
VALUES (
    gen_random_uuid(),
    'user_0001',
    'new alert',
    'test notification',
    'high'
);
```

---

# 2. Get Notifications

```sql
SELECT *
FROM notifications
WHERE user_id = 'user_0001'
ORDER BY created_at DESC;
```

---

# 3. Mark Notification as Read

```sql
UPDATE notifications
SET is_read = TRUE,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'notification_id';
```

---

# 4. Delete Notification

```sql
DELETE FROM notifications
WHERE id = 'notification_id';
```


# System Architecture Overview

Frontend Client
↓
REST API Server
↓
PostgreSQL Database
↓
Redis Cache
↓
WebSocket Server




# STAGE 3

--- Existing Query ---

```sql
SELECT * FROM notifications
WHERE user_id = 1024 AND isRead = false
ORDER BY createdAt DESC;
```

--- OTIMISED QUERY ---

```sql
SELECT id, title, message, priority, created_at
FROM notifications
WHERE user_id = 1024
AND is_read = false
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```




# STAGE 4

--- SOLUTION ---

## 1. Pagination - fetching notifications in smaller batches.

GET /notifications?page=1&limit=10

## 2. Redis Caching

stores unread counts
stores recent notifications

## 3. WebSocket Real-Time Notifications

Push notifications directly instead of frequent polling.




# STAGE 5

## Improvede code (USING PYTHON)

function notify_all(student_ids, message):

    for student_id in student_ids:

        publish_to_queue({
            "student_id": student_id,
            "message": message
        })


worker_process():

    while queue_not_empty():

        job = get_next_job()

        parallel:
            send_email(job.student_id, job.message)
            save_to_db(job.student_id, job.message)
            push_to_app(job.student_id, job.message)



# STAGE 6

## USING PYTHON

class Notification:

    def __init__(self, message, priority):
        self.message = message
        self.priority = priority


class MaxHeap:

    def __init__(self):
        self.heap = []


    def insert(self, notification):
        push_heap(self.heap, notification)


    def get_highest_priority(self):
        return self.heap[0]


    def remove_highest_priority(self):
        pop_heap(self.heap)


heap = MaxHeap()


function process_notifications(notifications):

    for n in notifications:

        heap.insert(
            Notification(
                n["message"],
                n["priority"]
            )
        )


    top_notification = heap.get_highest_priority()

    print(top_notification.message)




