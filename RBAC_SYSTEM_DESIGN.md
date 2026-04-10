# Role-Based Access Control (RBAC) System Design

## Overview
A vendor-scoped RBAC system where Super Admins (Vendors) create roles, assign permissions, and manage staff access to different modules.

---

## System Architecture

### User Types
```
┌─────────────────────────────────────────┐
│         Vendor (Super Admin)            │
│  • Creates & manages Roles              │
│  • Assigns permissions to Roles         │
│  • Assigns Staff to Roles               │
│  • Full system control                  │
└─────────────────────────────────────────┘
         ↓
    ┌────────────┬────────────┐
    ↓            ↓            ↓
┌────────┐  ┌────────┐  ┌──────────┐
│ Staff1 │  │ Staff2 │  │ Staff3   │
│ Role:  │  │ Role:  │  │ Role:    │
│Manager │  │Support │  │ Viewer   │
└────────┘  └────────┘  └──────────┘
```

---

## Data Model

### Tables
```
VendorRole
├── id (PK)
├── vendor_id (FK)
├── name          "Event Manager"
├── slug          "event_manager"
├── description   "Manages events and configurations"
├── is_active     1
└── created_at

RolePermission (Junction Table)
├── role_id (FK)
├── permission_id (FK)
├── requires_approval (boolean)
└── vendor_id (FK)

Permission
├── id (PK)
├── name          "View Events"
├── slug          "events.view"
├── module        "events"
└── module_id (FK)

VendorStaff
├── id (PK)
├── vendor_id (FK)
├── role_id (FK) ← Can be NULL after role deletion
├── name
├── email
├── is_active
└── created_at
```

---

## Role Assignment Workflow

### Step 1: Vendor Creates a Role
```
Admin Panel → Roles → "Create Role"
├── Name: "Event Manager"
├── Description: "Manages events and registrations"
└── Status: Active
```

### Step 2: Vendor Assigns Permissions to Role
```
Role: "Event Manager"
├── ✅ events.view
├── ✅ events.create
├── ✅ events.edit
├── ✅ events.delete
├── ✅ clients.view
└── ❌ clients.delete  (restricted)
```

### Step 3: Vendor Assigns Staff to Role
```
Staff: John Doe
├── Role: "Event Manager"  ← Gets all Event Manager permissions
├── Access: All events modules
└── Status: Active
```

### Result: Staff Permissions
```
John Doe (Staff) → has Role "Event Manager"
  ↓
Inherits permissions:
  ├── events.view    ✅ (can see events)
  ├── events.create  ✅ (can create events)
  ├── events.edit    ✅ (can edit events)
  ├── events.delete  ✅ (can delete events)
  ├── clients.view   ✅ (can view clients)
  └── clients.delete ❌ (cannot delete clients)
```

---

## Role Deletion Scenario

### Situation
```
Role "Event Manager" has 5 assigned Staff members
Vendor clicks: Delete Role
```

### Current Behavior (After Fix)
```
1. ✅ Role is DELETED (no blocking)
2. ✅ All 5 Staff members → role_id = NULL
3. ✅ Staff loses ALL permissions
4. ✅ UI shows modules as DISABLED/LOCKED
5. ⚠️  Staff cannot access any modules
6. ✅ Admin must reassign to another role
```

### Staff UI When role_id = NULL
```
Dashboard → Events Module
├── 🔒 View Events     [DISABLED]
├── 🔒 Create Event    [DISABLED]
├── 🔒 Edit Event      [DISABLED]
├── 🔒 Delete Event    [DISABLED]
└── ⚠️  Message: "No role assigned. Contact admin to restore access."
```

### Admin Resolution
```
Admin Panel → Staff Management → John Doe
├── Current Role: [NONE - No access]
├── Reassign Role: [Dropdown]
│   ├── Event Manager
│   ├── Client Support
│   └── Reports Viewer
└── Button: "Reassign" → John Doe now has permissions
```

---

## Modules & Permissions Structure

### Modules Available
```
1. Dashboard      → dashboard.view, dashboard.analytics
2. Clients        → clients.view, clients.create, clients.edit, clients.delete
3. Staff          → staff.view, staff.create, staff.edit, staff.delete
4. Roles          → roles.view, roles.create, roles.edit, roles.delete
5. Events         → events.view, events.create, events.edit, events.delete
6. Communication  → communication.view, communication.send
7. Reports        → reports.view, reports.export
8. Settings       → settings.view, settings.edit
```

### Permission Naming Convention
```
Format: {module}.{action}

Examples:
├── events.view       (can view events)
├── events.create     (can create events)
├── events.edit       (can edit events)
├── events.delete     (can delete events)
├── clients.view      (can view clients)
├── reports.export    (can export reports)
└── settings.edit     (can edit settings)
```

---

## Staff Module Access Rules

### Module Visibility
```
Staff sees module in sidebar/navigation IF:
  • Role has permission: "{module}.view"
  • Role is active (is_active = 1)
  • Staff is active (is_active = 1)
```

### Module Actions
```
Staff can:
  • VIEW   → Requires: {module}.view permission
  • CREATE → Requires: {module}.create permission
  • EDIT   → Requires: {module}.edit permission
  • DELETE → Requires: {module}.delete permission
```

### No Role (role_id = NULL)
```
Staff:
  ├── Sidebar shows NO modules (empty)
  ├── ALL module sections DISABLED
  ├── Cannot create, edit, or delete anything
  ├── Can only see login/profile pages
  └── Message: "Please contact admin to assign a role"
```

---

## Key Features

### ✅ Implemented
- [x] Create Roles with custom name & description
- [x] Assign permissions to Roles
- [x] Assign Staff to Roles
- [x] Permission inheritance (Staff → Role permissions)
- [x] View all Roles and their permissions
- [x] Edit existing Roles
- [x] Delete Roles (allow, no blocking)
- [x] Staff loses access when role is deleted (role_id = NULL)
- [x] UI shows disabled modules when staff has no role

### 🔄 To Implement
- [ ] Staff reassignment endpoint (change role_id)
- [ ] Bulk reassign staff when deleting role (optional)
- [ ] Permission approval workflow (requires_approval flag)
- [ ] Role templates (pre-built role sets)
- [ ] Activity logging (who assigned what when)

---

## API Endpoints

### Role Management (Vendor)
```
GET    /api/v1/vendors/staff/portal/roles
       → Get all roles for vendor
       
POST   /api/v1/vendors/staff/portal/roles
       → Create new role
       
GET    /api/v1/vendors/staff/portal/roles/:id
       → Get role by ID with permissions
       
PUT    /api/v1/vendors/staff/portal/roles/:id
       → Update role (name, description, status)
       
DELETE /api/v1/vendors/staff/portal/roles/:id
       → Delete role (staff role_id → NULL)
       
PUT    /api/v1/vendors/staff/portal/roles/:id/permissions
       → Assign permissions to role
```

### Staff Management (Vendor)
```
GET    /api/v1/vendors/staff/portal/staff
       → Get all staff with their roles
       
GET    /api/v1/vendors/staff/portal/staff/:id
       → Get staff details including role & permissions
       
PUT    /api/v1/vendors/staff/portal/staff/:id/role
       → UPDATE STAFF ROLE (reassign)
       Payload: { role_id: 5 }
```

---

## Frontend Components

### Page: Role Management
```
📄 /dashboard/roles
├── List all roles
├── View role details
├── Edit role
├── Delete role
├── Assign permissions
└── Show assigned staff count
```

### Page: Staff Management  
```
📄 /dashboard/staff
├── List all staff
├── View staff details
├── Edit staff info
├── CHANGE STAFF ROLE (vital)
├── Show current role & permissions
└── Show "No role" warning if role_id = NULL
```

---

## Error Handling

### Backend Responses
```
Success:
  Status: 200
  { "success": true, "data": { role }, "message": "Role updated" }

Role Not Found:
  Status: 404
  { "success": false, "message": "Role not found" }

Invalid Permissions:
  Status: 400
  { "success": false, "message": "Some permissions are invalid" }

Unauthorized:
  Status: 403
  { "success": false, "message": "Insufficient permissions" }
```

---

## Examples

### Example 1: Create "Event Manager" Role
```javascript
POST /api/v1/vendors/staff/portal/roles
{
  "name": "Event Manager",
  "description": "Manages events and registrations",
  "permissions": [
    { "permission_id": 1, "requires_approval": false },  // events.view
    { "permission_id": 2, "requires_approval": false },  // events.create
    { "permission_id": 3, "requires_approval": false },  // events.edit
    { "permission_id": 4, "requires_approval": true }    // events.delete (needs approval)
  ]
}
```

### Example 2: Assign Staff to Role
```javascript
PUT /api/v1/vendors/staff/portal/staff/15/role
{
  "role_id": 3  // Assign to "Event Manager" role
}
```

### Example 3: Delete Role (causes staff loss of access)
```javascript
DELETE /api/v1/vendors/staff/portal/roles/3

Response:
{
  "success": true,
  "message": "Role deleted successfully",
  "affectedStaff": 5  // 5 staff members now have role_id = NULL
}
```

---

## Security Notes

- ✅ All permissions scoped to vendor_id
- ✅ Staff can only see modules they have permission for
- ✅ Permission checks happen on backend (authoritative)
- ✅ Frontend UI respects permissions (UX layer)
- ✅ Deleted roles don't cascade-delete staff (manual reassignment required)

---

## Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Create Roles | ✅ Done | Vendor creates roles |
| Assign Permissions | ✅ Done | Admin assigns perms to roles |
| Assign Staff | ✅ Done | Staff get role permissions |
| Delete Roles | ✅ Done | Staff role_id → NULL |
| Show Disabled UI | ⏳ TODO | Show locked modules when no role |
| Reassign Staff | ⏳ TODO | Admin changes staff role |
| Lock/Unlock Modules | ⏳ TODO | Based on staff permissions |

