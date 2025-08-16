# Server API

The Server API provides server-side functionality for player management, server callbacks, and server-specific operations within the RP Framework.

## Overview

The Server API is the primary interface for server-side operations, offering comprehensive player management capabilities, server callback registration, and challenge score management. All functions are designed to work efficiently in server environments with proper error handling and validation.

## Player Management

### Player Retrieval Functions

These functions provide different ways to access player objects based on various identifiers:

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.GetPlayerFromSource(src)` | `number` | `RCPlayer\|nil` | Gets player object from server ID |
| `RP.GetPlayerFromId(src)` | `number` | `RCPlayer\|nil` | Alias for `GetPlayerFromSource` |
| `RP.GetPlayerFromIdentifier(identifier)` | `string` | `RCPlayer\|nil` | Gets player object from identifier |
| `RP.GetPlayerFromPid(pid)` | `number` | `RCPlayer\|nil` | Gets player object from database ID |

### Usage Examples

```lua
-- Get player by server ID (most common)
local player = RP.GetPlayerFromSource(source)
if player then
    print("Player found:", player.name)
else
    print("Player not found or offline")
end

-- Get player by identifier
local player = RP.GetPlayerFromIdentifier("steam:110000100000000")
if player then
    print("Player found by identifier:", player.name)
end

-- Get player by database ID
local player = RP.GetPlayerFromPid(12345)
if player then
    print("Player found by PID:", player.name)
end
```

### Online Status Checking

Functions to check if players are currently online:

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.IsIdentifierOnline(identifier)` | `string\|table` | `boolean, number?` | Checks if identifier is online |
| `RP.IsPidOnline(pid)` | `number` | `boolean, number?` | Checks if PID is online |

### Usage Examples

```lua
-- Check single identifier
local online, source = RP.IsIdentifierOnline("steam:110000100000000")
if online then
    print("Player is online with source:", source)
else
    print("Player is offline")
end

-- Check multiple identifiers (returns on first match)
local identifiers = {"steam:110000100000000", "license:1234567890abcdef"}
local online, source = RP.IsIdentifierOnline(identifiers)
if online then
    print("One of the identifiers is online:", source)
end

-- Check by PID
local online, source = RP.IsPidOnline(12345)
if online then
    print("Player with PID 12345 is online:", source)
end
```

## Server Callbacks

The server callback system allows clients to request data from the server with proper response handling.

### Callback Registration

| Function | Parameters | Description |
|----------|------------|-------------|
| `RP.RegisterServerCallback(name, handler)` | `string, function` | Registers a server callback handler |

### Usage Example

```lua
-- Register a callback for getting player data
RP.RegisterServerCallback('rp:getPlayerData', function(source, cb, playerId)
    local player = RP.GetPlayerFromSource(playerId)
    if player then
        cb({
            name = player.name,
            group = player.group,
            xp = player.xp,
            metadata = player.metadata
        })
    else
        cb(nil)
    end
end)

-- Client can now call this callback
-- RP.TriggerServerCallback('rp:getPlayerData', function(data)
--     if data then
--         print("Player data:", data.name)
--     end
-- end, playerId)
```

## Challenge System

The challenge system manages player achievements and scores with database persistence.

### Challenge Score Management

| Function | Parameters | Description |
|----------|------------|-------------|
| `RP.UpdateChallengeScore(player, challengeId, score, saveGreater)` | `RCPlayer\|number, number, number, boolean` | Updates challenge score for a player |

### Parameters

- **`player`** - Player object or source ID
- **`challengeId`** - Unique identifier for the challenge
- **`score`** - New score value to set
- **`saveGreater`** - If true, only updates if new score is higher (GREATEST). If false, only updates if new score is lower (LEAST)

### Usage Example

```lua
-- Update challenge score (always save if lower - good for time-based challenges)
local player = RP.GetPlayerFromSource(source)
RP.UpdateChallengeScore(player, "race_time_001", 120.5, false)

-- Update challenge score (only if higher - good for point-based challenges)
RP.UpdateChallengeScore(player, "drift_points_001", 1500, true)

-- Using source ID directly
RP.UpdateChallengeScore(source, "kill_count_001", 25, false)
```

### Challenge System Features

- **Automatic Attempt Tracking** - Always increments attempt counter
- **Score Comparison Logic** - Uses LEAST (false) or GREATEST (true) operators
- **Database Persistence** - All scores are automatically saved
- **Player Flexibility** - Accepts both player objects and source IDs
- **Challenge Types** - Supports both "lower is better" (time) and "higher is better" (points) challenges

## Best Practices

### Player Management

- **Always check for nil** - Verify player objects exist before use
- **Use appropriate functions** - Choose the right retrieval method for your use case
- **Handle offline players** - Check online status before operations
- **Cache player objects** - Store frequently accessed player references
- **Use safe navigation** - Leverage `?.` operator for nested table access
- **Use compound operators** - Leverage `+=`, `-=`, `*=` for cleaner code

### Server Callbacks

- **Use descriptive names** - Clear, namespaced callback names
- **Validate parameters** - Check input data before processing
- **Handle errors gracefully** - Provide meaningful error responses
- **Use callbacks consistently** - Standardize callback patterns across resources

### Challenge System

- **Choose appropriate saveGreater** - Consider whether higher scores should always overwrite
- **Use consistent challenge IDs** - Maintain naming conventions for challenges
- **Monitor performance** - Challenge updates involve database operations
- **Handle edge cases** - Consider what happens with invalid scores or players

### Error Handling

```lua
-- Example of robust player handling
local function safePlayerOperation(source)
    local player = RP.GetPlayerFromSource(source)
    if not player then
        RP.Log.warning("Player not found for source:", source)
        return false
    end
    
    -- Player object is guaranteed to have all properties populated
    -- Proceed with operation
    return true
end
```

### Performance Considerations

- **Batch operations** - Group related player operations when possible
- **Cache frequently accessed data** - Store player objects for repeated use
- **Use appropriate functions** - Choose efficient methods for your use case
- **Monitor database queries** - Challenge updates involve database operations

## Integration Examples

### Complete Player Management System

```lua
-- Player join handler
AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    deferrals.defer()
    
    -- Check if player is already online
    local online, existingSource = RP.IsIdentifierOnline(GetPlayerIdentifiers(source)[1])
    if online then
        deferrals.done("Player already connected from another session")
        return
    end
    
    deferrals.done()
end)

-- Player data request callback
RP.RegisterServerCallback('rp:requestPlayerData', function(source, cb)
    local player = RP.GetPlayerFromSource(source)
    if player then
        cb({
            success = true,
            data = {
                name = player.name,
                group = player.group,
                xp = player.xp,
                metadata = player.metadata
            }
        })
    else
        cb({
            success = false,
            error = "Player not found"
        })
    end
end)

-- Challenge completion handler
RegisterNetEvent('rp:completeChallenge')
AddEventHandler('rp:completeChallenge', function(challengeId, score)
    local player = RP.GetPlayerFromSource(source)
    if player then
        RP.UpdateChallengeScore(player, challengeId, score, true)
        TriggerClientEvent('rp:challengeCompleted', source, challengeId, score)
    end
end)
```

The Server API provides a robust foundation for server-side operations with comprehensive player management, efficient callback systems, and flexible challenge management capabilities.