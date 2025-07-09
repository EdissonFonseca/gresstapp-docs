# Gresst App Synchronization - Technical Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Synchronization Architecture](#synchronization-architecture)
3. [Synchronization Services](#synchronization-services)
4. [APIRequests Queue Management](#apirequests-queue-management)
5. [Synchronization Flow](#synchronization-flow)
6. [APIs and Endpoints](#apis-and-endpoints)
7. [Error Handling and Retries](#error-handling-and-retries)
8. [Local Storage](#local-storage)
9. [Synchronization States](#synchronization-states)
10. [Security Considerations](#security-considerations)

## Introduction

The Gresst mobile application implements a robust synchronization system that enables offline-first operation, maintaining data consistency between the mobile application and web application through REST API calls. The system uses a request queue (APIRequests) to handle operations when there is no connectivity.

### Key Features
- **Offline-First Operation**: The app works without connection and synchronizes when connectivity is available
- **Request Queue**: Automatic handling of pending operations
- **Bidirectional Synchronization**: Server data download and local changes upload
- **Robust Error Handling**: Automatic retries and network failure handling

## Synchronization Architecture

### Main Components

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Components │    │  Core Services   │    │  API Services   │
│                 │    │                  │    │                 │
│ - Header        │───▶│ - SessionService │───▶│ - HttpService   │
│ - Synchronization│   │ - SyncService    │    │ - AuthService   │
│ - Menu          │    │ - RequestsService│    │ - TransactionAPI│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │  Local Storage   │    │  Web API        │
                       │                  │    │                 │
                       │ - Ionic Storage  │    │ - REST Endpoints│
                       │ - APIRequests    │    │ - JWT Auth      │
                       └──────────────────┘    └─────────────────┘
```

## Synchronization Services

### 1. SynchronizationService
Main service that handles data synchronization.

**Main functions:**
- `downloadAuthorizations()`: Downloads user permissions
- `downloadInventory()`: Downloads inventory data
- `downloadMasterData()`: Downloads master data (materials, points, etc.)
- `downloadTransactions()`: Downloads transactions and tasks
- `uploadData()`: Uploads pending requests to server

### 2. SessionService
Manages session state and general synchronization.

**Main functions:**
- `start()`: Application initialization
- `synchronize()`: Complete synchronization
- `hasPendingRequests()`: Checks for pending requests
- `countPendingRequests()`: Counts pending requests

### 3. RequestsService
Manages the API requests queue.

**Main functions:**
- `create()`: Creates new request in queue
- `add()`: Adds existing request
- `remove()`: Removes request from queue
- `clear()`: Clears entire queue

## APIRequests Queue Management

### APIRequest Structure

```typescript
interface APIRequest {
  Object: string;    // Object type (Activity, Task, Transaction, etc.)
  CRUD: string;      // Operation (C=Create, U=Update, D=Delete)
  Data: any;         // Operation data
  Date: Date;        // Request timestamp
  Id: string;        // Object ID
}
```

### Supported Object Types

```typescript
const DATA_TYPE = {
  ACTIVITY: 'Activity',
  INVENTORY: 'Inventory',
  MATERIAL: 'Material',
  PACKAGE: 'Package',
  POINT: 'Point',
  RESIDUE: 'Residue',
  SERVICE: 'Service',
  START_ACTIVITY: 'StartActivity',
  SUPPLY: 'Supply',
  THIRD_PARTY: 'ThirdParty',
  TASK: 'Task',
  TRANSACTION: 'Transaction',
  TREATMENT: 'Treatment',
  VEHICLE: 'Vehicle',
}
```

### CRUD Operations

```typescript
const CRUD_OPERATIONS = {
  CREATE: 'C',
  UPDATE: 'U',
  DELETE: 'D',
  READ: 'R'
}
```

### Queue Flow

1. **Request Creation**: When user performs an action, an `APIRequest` is created
2. **Local Storage**: The request is saved in local storage
3. **Processing**: During synchronization, requests are processed in chronological order
4. **Removal**: Successful requests are removed from the queue

## Synchronization Flow

### 1. Application Initialization

```typescript
async start(): Promise<boolean> {
  try {
    await this.syncService.downloadAuthorizations();
    await this.syncService.downloadInventory();
    await this.syncService.downloadMasterData();
    await this.syncService.downloadTransactions();
    await this.storage.set(STORAGE.REQUESTS, []);
    await this.storage.set(STORAGE.START_DATE, new Date().toISOString());
    return true;
  } catch (error) {
    this.logger.error('Error loading initial data', error);
    return false;
  }
}
```

### 2. Manual/Automatic Synchronization

```typescript
async synchronize(): Promise<boolean> {
  try {
    const isOnline = await this.isOnline();
    if (isOnline) {
      if (await this.uploadData()) {
        await this.syncService.downloadAuthorizations();
        await this.syncService.downloadInventory();
        await this.syncService.downloadMasterData();
        await this.syncService.downloadTransactions();
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    this.logger.error('Error synchronizing data', error);
    return false;
  }
}
```

### 3. Pending Requests Processing

```typescript
async uploadData(): Promise<boolean> {
  try {
    const requests: APIRequest[] = await this.storage.get(STORAGE.REQUESTS) || [];
    requests.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    for (const request of requests) {
      let success = false;
      
      switch (request.Object) {
        case DATA_TYPE.TASK:
          if (request.CRUD === CRUD_OPERATIONS.CREATE) {
            success = await this.transactionsService.createTask(request.Data);
          } else if (request.CRUD === CRUD_OPERATIONS.UPDATE) {
            success = await this.transactionsService.updateTask(request.Data);
          }
          break;
        // ... other cases
      }
      
      if (success) {
        const updatedRequests = requests.filter(r => r !== request);
        await this.storage.set(STORAGE.REQUESTS, updatedRequests);
      } else {
        return false;
      }
    }
    return true;
  } catch (error) {
    this.logger.error('Error in uploadData', error);
    return false;
  }
}
```

## APIs and Endpoints

### Base URL
```
https://qa.api.gresst.com/api
```

### Main Endpoints

#### Authentication
- `POST /authentication/login` - Login
- `POST /authentication/refreshtoken` - Token refresh
- `POST /authentication/ping` - Connectivity verification

#### Transactions
- `GET /apptransactions/get` - Get transactions
- `POST /apptransactions/createtarea` - Create task
- `POST /apptransactions/updatetarea` - Update task
- `POST /apptransactions/createtransaccion` - Create transaction
- `POST /apptransactions/updatetransaccion` - Update transaction
- `POST /apptransactions/createactividad` - Create activity
- `POST /apptransactions/updateactividad` - Update activity

#### Master Data
- `GET /materiales/get` - Get materials
- `POST /materiales/create` - Create material
- `POST /materiales/update` - Update material
- `GET /puntos/get` - Get points
- `POST /puntos/create` - Create point
- `POST /puntos/update` - Update point

#### Inventory
- `GET /inventario/get` - Get inventory
- `POST /inventario/create` - Create inventory entry
- `POST /inventario/update` - Update inventory

### Authentication Headers

```typescript
private async getHeaders(url: string): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (this.needsAuth(url)) {
    const token = await this.storage.get(STORAGE.ACCESS_TOKEN);
    if (token) {
      if (this.isTokenExpired(token)) {
        await this.refreshToken();
        const newToken = await this.storage.get(STORAGE.ACCESS_TOKEN);
        if (newToken) {
          headers['Authorization'] = `Bearer ${newToken}`;
        }
      } else {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  }
  return headers;
}
```

## Error Handling and Retries

### Retry Configuration

```typescript
private readonly retryConfig: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffFactor: 2,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504]
};
```

### Retryable Status Codes
- `408` - Timeout
- `429` - Too Many Requests
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable
- `504` - Gateway Timeout

### 401 Error Handling

```typescript
private async handle401<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
): Promise<{ status: number; data: T }> {
  this.isRefreshing = true;
  try {
    await this.refreshToken();
    const response = await CapacitorHttp.request({
      url: `${this.apiUrl}${url}`,
      headers: await this.getHeaders(url),
      data,
      method
    });
    return {
      status: response.status,
      data: response.data as T
    };
  } catch (refreshError) {
    this.isRefreshing = false;
    this.logger.error('Could not refresh token', refreshError);
    throw refreshError;
  }
}
```

## Local Storage

### Storage Structure

```typescript
const STORAGE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USERNAME: 'username',
  ACCOUNT: 'account',
  INVENTORY: 'inventory',
  MASTER_DATA: 'master_data',
  TRANSACTION: 'transaction',
  REQUESTS: 'requests',
  START_DATE: 'start_date'
}
```

### Storage Service

```typescript
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  async set(key: string, value: any) {
    try {
      await this.storage.set(key, value);
    } catch (error: any) {
      console.error(`Error saving value for key: ${key}`, error);
      throw new Error(`Could not save value for key ${key}: ${error.message}`);
    }
  }

  async get(key: string): Promise<any> {
    try {
      return await this.storage.get(key);
    } catch (error: any) {
      console.error(`Error getting value for key: ${key}`, error);
      throw new Error(`Could not get value for key ${key}: ${error.message}`);
    }
  }
}
```

## Synchronization States

### Visual Indicators

#### Header Component
```html
<ion-button (click)="synchronize()">
  <ion-icon name="sync-outline" color="light"></ion-icon>
  <ion-badge color="danger" *ngIf="pendingRequests > 0">{{ pendingRequests }}</ion-badge>
</ion-button>
```

#### Periodic Update
```typescript
ngOnInit() {
  this.updateSubscription = interval(2000).subscribe(async () => {
    await this.sessionService.countPendingRequests();
    this.pendingRequests = this.synchronizationService.pendingTransactions();
  });
}
```

### Transaction States

```typescript
const STATUS = {
  ACTIVE: "A",     // Active
  APPROVED: "A",   // Approved
  FINISHED: "F",   // Finished
  PENDING: "P",    // Pending
  REJECTED: "R",   // Rejected
  INACTIVE: "I"    // Inactive
}
```

## Security Considerations

### JWT Authentication
- Access tokens with expiration
- Automatic token renewal
- Secure credential storage

### Data Validation
- Client-side validation before sending
- Input data sanitization
- Permission verification per operation

### Error Handling
- Detailed error logging
- No exposure of sensitive information
- Graceful handling of network failures

### Encryption
- Mandatory HTTPS communication
- Encrypted local storage
- Secure JWT tokens

## Conclusion

The Gresst App synchronization system provides a robust and reliable experience for data management in environments with intermittent connectivity. The offline-first architecture ensures users can continue working without interruptions, while the queue system guarantees no operation is lost.

### System Advantages
- **Reliability**: Continuous operation without connection
- **Efficiency**: Intelligent and optimized synchronization
- **Scalability**: Modular and extensible architecture
- **Security**: Secure data handling and authentication
- **User Experience**: Clear synchronization state indicators

### Future Improvements
- Incremental synchronization to optimize bandwidth
- Data compression to reduce network usage
- Real-time synchronization with WebSockets
- Automatic data conflict resolution 
