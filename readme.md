# 🔐 Secure Login & Brute Force Detection API

A **production-ready secure authentication API** built with  
**Node.js, TypeScript, MongoDB (Mongoose)**  
focused on **account protection, brute-force detection, and security auditing**.

> Designed with real-world attack scenarios in mind.

---

## 🚀 Features

- Secure user authentication
- Password hashing with **bcrypt (salted)**
- Brute-force detection (IP & Email based)
- Temporary account lockout
- Login attempt audit logging
- Auto cleanup of old logs (TTL index)
- Type-safe (TypeScript strict mode)
- Optimized MongoDB indexes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Security | bcrypt |
| Auth | JWT |
| Architecture | REST API |

---
# Security Architecture Diagram

```
┌──────────────┐
│   Client     │
│ (Browser/API)│
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  Auth Controller │
└──────┬───────────┘
       │
       ▼
┌───────────────────────┐
│  Security Middleware  │
│  - Rate Limit         │
│  - Brute Force Check  │
└──────┬────────────────┘
       │
       ▼
┌───────────────────────┐
│ Authentication Logic  │
│ - bcrypt compare      │
│ - JWT issue           │
└──────┬────────────────┘
       │
       ▼
┌───────────────────────┐
│ MongoDB               │
│ - Users               │
│ - LoginAttempts       │
│ - TTL Cleanup         │
└───────────────────────┘
```

## Login Attempt Audit Log
---
Each login attempt is recorded:
---
```
{
  "email": "user@example.com",
  "ipAddress": "192.168.1.10",
  "success": false,
  "failureReason": "invalid_credentials",
  "createdAt": "2025-01-27T10:15:00Z"
}
```