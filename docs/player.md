# Player System

The Player System is the core of the RP Framework, providing a comprehensive `RCPlayer` object that represents a connected player on the server.

## Overview

The `RCPlayer` object encapsulates all player-related functionality including properties, methods, metadata management, and state synchronization. It automatically handles database persistence, network replication, and provides a clean API for player manipulation.

## Properties

### Core Properties

| Property | Type | Description | Access |
|----------|------|-------------|---------|
| `source` | `number` | Player's server ID | Read-only |
| `identifier` | `string` | Player's unique identifier | Read-only |
| `pid` | `number` | Player's database ID | Read-only |
| `group` | `string` | Player's permission group | Read/Write |
| `name` | `string` | Player's display name | Read/Write |
| `nickname` | `string` | Player's nickname | Read/Write |
| `xp` | `number` | Player's experience points | Read/Write |

### Dynamic Properties

These properties provide real-time data and can trigger actions when accessed or modified:

| Property | Type | Description | Behavior |
|----------|------|-------------|----------|
| `coords` | `vector3` | Player's position | **Read**: Gets current coordinates<br>**Write**: Teleports player |
| `heading` | `number` | Player's facing direction | **Read**: Gets current heading<br>**Write**: Sets player heading |
| `ped` | `number` | Player's ped entity | **Read**: Gets current ped<br>**Write**: Not recommended |
| `state` | `table` | Player's replicated state | **Read**: Gets player state<br>**Write**: Not recommended |
| `playtime` | `number` | Total playtime in seconds | **Read**: Gets current playtime<br>**Write**: Not recommended |

### Complex Objects

| Property | Type | Description |
|----------|------|-------------|
| `metadata` | `RCMetadata` | Player's metadata object |
| `accounts` | `RCAccounts` | Player's currency/accounts object |

## Metadata System

The metadata system provides persistent storage for custom player data with automatic database persistence and network replication.

### Features
- **Automatic Persistence** - All metadata changes are automatically saved to the database
- **State Replication** - Metadata is replicated to the player's state as `state["metadata_<KEY>"]`
- **Server-Side Security** - Never read metadata from player state on server (can be manipulated)

### Usage Example
```lua
local player = RP.GetPlayerFromSource(source)

-- Set metadata
player.metadata.job = "police"
player.metadata.jobGrade = 3
player.metadata.phoneNumber = "555-0123"

-- Metadata is automatically saved and replicated
```

## Accounts System

The accounts system manages player currencies and financial data with the same persistence and replication features as metadata.

### Features
- **Automatic Persistence** - Account changes are automatically saved to the database
- **State Replication** - Accounts are replicated as `state["accounts_<CURRENCY>"]`
- **Server-Side Security** - Never read accounts from player state on server

### Usage Example
```lua
local player = RP.GetPlayerFromSource(source)

-- Modify accounts
player.accounts.money = player.accounts.money + 1000
player.accounts.bank = player.accounts.bank - 500

-- Changes are automatically saved and replicated
```

## Methods

### Player Control

| Method | Parameters | Description |
|--------|------------|-------------|
| `teleport(x, y, z, heading?)` | `number, number, number, number?` | Teleports player to coordinates |
| `teleport(coords, heading?)` | `vector3, number?` | Teleports player using vector3 coordinates |
| `setCoords(...)` | Same as `teleport` | Alias for `teleport` method |
| `kick(reason?)` | `string?` | Kicks player from server (default: "Kicked") |

### Data Management

| Method | Parameters | Description |
|--------|------------|-------------|
| `save(callback?)` | `function?` | Saves player data to database |
| `getRank()` | None | Returns player's rank based on XP |
| `hasDoneStuntJump(id)` | `number` | Checks if player completed stunt jump |

### Event System

| Method | Parameters | Description |
|--------|------------|-------------|
| `triggerEvent(eventName, ...)` | `string, ...` | Triggers an event for the player |
| `showNotification(message, delay?)` | `string, number?` | Shows notification to player |

## Examples

### Basic Player Management
```lua
local player = RP.GetPlayerFromSource(source)
if player then
    -- Check player status
    if player.group == "admin" then
        -- Admin actions
        player:teleport(100.0, 200.0, 30.0)
        -- or teleport like this
        player.coords = vector3(100.0, 200.0, 30.0)
    end

    -- Modify player data
    player.metadata.lastLogin = os.time()
    player.accounts.money += 100
end
```

### Player Teleportation
```lua
local player = RP.GetPlayerFromSource(source)

-- Method 1: Individual coordinates and heading
player:teleport(100.0, 200.0, 30.0, 90.0)

-- Method 2: Vector3 coordinates and heading
local coords = vector3(100.0, 200.0, 30.0)
player:teleport(coords, 90.0)

-- Method 3: Using setCoords alias
player:setCoords(coords)

-- Method 4: Writing to coords
player.coords = coords
player.heading = 90.0
```

### Metadata and Accounts
```lua
local player = RP.GetPlayerFromSource(source)

-- Set player metadata
player.metadata.job = "mechanic"
player.metadata.jobGrade = 2
player.metadata.phoneNumber = "555-0123"

-- Modify player accounts
player.accounts.money += 500
player.accounts.bank -= 200

-- Save all changes
player:save(function()
    print("Player data saved successfully")
end)
```

## Best Practices

### Security
- **Never trust client data** - Always validate on server
- **Use server-side metadata** - Don't read from player state
- **Validate permissions** - Check player group before actions

### Performance
- **Batch metadata changes** - Make multiple changes before saving
- **Use callbacks** - Handle save operations asynchronously
- **Cache frequently accessed data** - Avoid repeated property access

### Data Management
- **Use meaningful keys** - Descriptive metadata names
- **Validate data types** - Ensure consistent data structure
- **Use compound operators** - Leverage `+=`, `-=`, `*=` for cleaner code
- **Use safe navigation** - Leverage `?.` operator for nested table access when needed