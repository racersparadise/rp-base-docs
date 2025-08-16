# Client API

The Client API provides client-side functionality for player data access, entity management, and client-specific operations within the RP Framework.

## Overview

The Client API offers comprehensive client-side capabilities including player data access, entity spawning and management, and utility functions. All functions are designed for efficient client-side execution with proper error handling.

## Player Data

The `RP.PlayerData` object provides access to the current player's information and state.

### Properties

| Property | Type | Description | Access |
|----------|------|-------------|---------|
| `identifier` | `string` | Player's identifier | Read-only |
| `group` | `string` | Player's permission group | Read-only |
| `pid` | `number` | Player's database ID | Read-only |

**Note**: The client-side `RP.PlayerData` only contains basic player information. For full player data, use server-side functions.

### Usage Examples

```lua
-- Access basic player data
local playerIdentifier = RP.PlayerData.identifier
local playerGroup = RP.PlayerData.group
local playerPid = RP.PlayerData.pid

-- Check player status
if RP.PlayerData.group == "admin" then
    print("Player is an admin")
end
```

## Core Functions

### Player Management

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.TriggerServerCallback(name, cb, ...)` | `string, function, ...` | None | Triggers a server callback |
| `RP.Teleport(x, y, z, heading?)` | `number, number, number, number?` | None | Teleports the player |
| `RP.Teleport(coords, heading?)` | `vector3, number?` | None | Teleports using vector3 coordinates |
| `RP.GetPlayerRank()` | None | `string` | Gets the player's rank from XP |
| `RP.GetPlayerData()` | None | `table` | Gets the current player data |

### Usage Examples

```lua
-- Trigger server callback
RP.TriggerServerCallback('rp:getPlayerData', function(data)
    if data then
        print("Player data received:", data.name)
    end
end)

-- Teleport player
RP.Teleport(100.0, 200.0, 30.0, 90.0)

-- Get player rank
local rank = RP.GetPlayerRank()
print("Player rank:", rank)

-- Get player data
local playerData = RP.GetPlayerData()
print("Player identifier:", playerData.identifier)
```

## Entity Management

### Model Loading

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.RequestModel(modelHash, cb?)` | `number\|string, function?` | None | Requests a model with optional callback |

### Entity Spawning

#### Object Spawning

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.SpawnObject(model, coords, cb?)` | `string\|number, vector3, function?` | None | Spawns object asynchronously |
| `RP.SpawnObjectSync(model, coords)` | `string\|number, vector3` | `number` | Spawns object synchronously |
| `RP.SpawnLocalObject(model, coords, cb?)` | `string\|number, vector3, function?` | None | Spawns local object asynchronously |
| `RP.SpawnLocalObjectSync(model, coords)` | `string\|number, vector3` | `number` | Spawns local object synchronously |

#### Vehicle Spawning

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.SpawnVehicle(model, coords, heading, cb?)` | `string\|number, vector3, number, function?` | None | Spawns vehicle asynchronously |
| `RP.SpawnVehicleSync(model, coords, heading)` | `string\|number, vector3, number` | `number` | Spawns vehicle synchronously |
| `RP.SpawnLocalVehicle(model, coords, heading, cb?)` | `string\|number, vector3, number, function?` | None | Spawns local vehicle asynchronously |
| `RP.SpawnLocalVehicleSync(model, coords, heading)` | `string\|number, vector3, number` | `number` | Spawns local vehicle synchronously |

### Entity Management

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.DeleteVehicle(veh)` | `number` | None | Deletes a vehicle |
| `RP.DeleteObject(obj)` | `number` | None | Deletes an object |
| `RP.GetVehicleProperties(veh)` | `number` | `table` | Gets vehicle properties |
| `RP.SetVehicleProperties(veh, props)` | `number, table` | None | Sets vehicle properties |

### Usage Examples

```lua
-- Spawn an object
RP.SpawnObject("prop_box_wood02a", vector3(100.0, 200.0, 30.0), function(obj)
    if obj then
        print("Object spawned:", obj)
        -- Set object properties
        SetEntityHeading(obj, 90.0)
    end
end)

-- Spawn vehicle synchronously
local vehicle = RP.SpawnVehicleSync("adder", vector3(100.0, 200.0, 30.0), 90.0)
if vehicle then
    print("Vehicle spawned:", vehicle)
    -- Get and set properties
    local props = RP.GetVehicleProperties(vehicle)
    props.color1 = 120
    RP.SetVehicleProperties(vehicle, props)
end

-- Spawn local object (only visible to current player)
RP.SpawnLocalObject("prop_box_wood02a", vector3(100.0, 200.0, 30.0), function(obj)
    if obj then
        print("Local object spawned:", obj)
    end
end)

-- Delete entities
RP.DeleteVehicle(vehicle)
RP.DeleteObject(object)
```

## Utility Functions

### Mathematical Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.RoundFloat(num, prec)` | `number, number` | `number` | Rounds a number to specified precision |
| `RP.Util.GroupDigits(num)` | `number` | `string` | Formats a number with comma separators |

### String Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.RandomString(length)` | `number` | `string` | Generates a random alphanumeric string |
| `RP.Util.Trim(value)` | `string` | `string\|nil` | Removes leading/trailing whitespace |

### Spatial Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.GetDistance(v1, v2, useZ)` | `vector3, vector3, boolean` | `number` | Calculates distance between positions |

### Text Rendering

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.DrawText3D(pos, text, scale, color)` | `vector3\|table, string, number, table` | None | Draws 3D text (proportional) |
| `RP.DrawText3DNonProp(pos, text, scale, color)` | `vector3\|table, string, number, table` | None | Draws 3D text (non-proportional) |
| `RP.DrawText(x, y, text, scale, color)` | `number, number, string, number, table` | None | Draws 2D text |

### User Interface

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.ShowHelpText(text)` | `string` | None | Shows help text |
| `RP.KeyBoard(text)` | `string` | `string\|nil` | Shows on-screen keyboard |
| `RP.ShowNotification(text, duration)` | `string, number` | None | Shows notification |

### Texture Streaming

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.RequestStreamedTextureDict(dict, cb?)` | `string, function?` | None | Streams texture dict asynchronously |
| `RP.RequestStreamedTextureDictSync(dict)` | `string` | None | Streams texture dict synchronously |

### Experience System

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.GetLevelFromXP(xp)` | `number` | `number` | Gets level from XP |
| `RP.GetXPFromLevel(level)` | `number` | `number` | Gets XP from level |

### Usage Examples

```lua
-- Mathematical operations
local rounded = RP.Util.RoundFloat(3.14159, 2)
print(rounded) -- Output: 3.14

local formatted = RP.Util.GroupDigits(1234567)
print(formatted) -- Output: 1,234,567

-- String operations
local randomID = RP.Util.RandomString(8)
print(randomID) -- Output: "aB3k9mP2"

local cleanString = RP.Util.Trim("  hello world  ")
print(cleanString) -- Output: "hello world"

-- Distance calculation
local pos1 = vector3(100.0, 200.0, 30.0)
local pos2 = vector3(150.0, 250.0, 35.0)

local distance2D = RP.Util.GetDistance(pos1, pos2, false)
local distance3D = RP.Util.GetDistance(pos1, pos2, true)

print("2D Distance:", distance2D)
print("3D Distance:", distance3D)

-- High-performance alternative using vector operations
local distance2D = #(pos1.xy - pos2.xy)
local distance3D = #(pos1 - pos2)

-- Text rendering examples
local coords = vector3(100.0, 200.0, 30.0)
RP.DrawText3D(coords, "Press E to interact", 0.5, {r = 255, g = 255, b = 255})

-- Show on-screen keyboard
local playerName = RP.KeyBoard("Enter your name:")
if playerName then
    print("Player entered name:", playerName)
end

-- Draw 2D text (call every frame)
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        RP.DrawText(100, 100, "Hello World", 0.5, {r = 255, g = 0, b = 0})
    end
end)

-- Texture streaming
RP.RequestStreamedTextureDict("generic_textures", function()
    print("Texture dictionary loaded")
end)

-- Experience system
local playerXP = 1000
local level = RP.GetLevelFromXP(playerXP)
local requiredXP = RP.GetXPFromLevel(level + 1)
print("Current level:", level)
print("XP needed for next level:", requiredXP - playerXP)
```

## Logging System

The logging system provides structured logging capabilities with different severity levels.

### Log Levels

| Level | Function | Description | Use Case |
|-------|----------|-------------|----------|
| **Info** | `RP.Log.info(...)` | General information messages | Status updates, user actions |
| **Warning** | `RP.Log.warning(...)` | Warning messages | Non-critical issues, deprecated usage |
| **Error** | `RP.Log.error(...)` | Error messages | Critical failures, exceptions |
| **Debug** | `RP.Log.debug(...)` | Debug information | Development debugging (only shown if debug enabled) |
| **Custom** | `RP.Log.custom(...)` | Custom formatted messages | Resource-specific logging |

### Usage Examples

```lua
-- Basic logging
RP.Log.info("Player joined:", playerName)
RP.Log.warning("Deprecated function called")
RP.Log.error("Database connection failed")

-- Debug logging (only shown when debug is enabled)
RP.Log.debug("Processing player data:", json.encode(playerData))

-- Custom logging with resource prefix
RP.Log.custom("Custom message with resource prefix")
-- Output: [resource_name] Custom message with resource prefix
```

## Blips Module

The Blips module provides comprehensive blip customization and management capabilities for creating rich, interactive map markers.

### Core Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Blips.SetTitle(blip, title, rockstarVerified, rp, money, dict, tex)` | `number, string, boolean, string, string, string, string` | None | Sets blip title and verification status |
| `RP.Blips.SetBlipInfoEconomy(blip, rp, money)` | `number, string, string` | None | Sets blip economy values |
| `RP.Blips.SetBlipInfo(blip, info)` | `number, table` | None | Sets blip information array |
| `RP.Blips.AddBlipInfoText(blip, leftText, rightText)` | `number, string, string` | None | Adds text information to blip |
| `RP.Blips.AddBlipInfoName(blip, leftText, rightText)` | `number, string, string` | None | Adds name information to blip |
| `RP.Blips.AddBlipInfoHeader(blip, leftText, rightText)` | `number, string, string` | None | Adds header information to blip |
| `RP.Blips.AddBlipInfoIcon(blip, leftText, rightText, iconId, iconColor, checked)` | `number, string, string, number, number, boolean` | None | Adds icon information to blip |
| `RP.Blips.SetBlipPath(blip, path)` | `number, table` | None | Sets blip path for GPS routing |

### Display Management

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Blips.ShowDisplay(show)` | `boolean` | None | Shows/hides the blip information display |
| `RP.Blips.UpdateDisplay()` | None | None | Updates the blip information display |
| `RP.Blips.ClearDisplay()` | None | None | Clears all blip information |

### Usage Examples

```lua
-- Create a custom blip
local blip = AddBlipForCoord(100.0, 200.0, 30.0)

-- Set basic blip information
RP.Blips.SetTitle(blip, "Custom Location", false, "1000", "$500", "generic_textures", "tick_32")

-- Add detailed information
RP.Blips.AddBlipInfoHeader(blip, "Status", "Active")
RP.Blips.AddBlipInfoName(blip, "Location", "Downtown")
RP.Blips.AddBlipInfoText(blip, "Description", "A custom racing location")
RP.Blips.AddBlipInfoIcon(blip, "Checkpoint", "Completed", 1, 2, true)

-- Set GPS path
RP.Blips.SetBlipPath(blip, {
    vector3(100.0, 200.0, 30.0),
    vector3(150.0, 250.0, 30.0),
    vector3(200.0, 300.0, 30.0)
})

-- Show and update display
RP.Blips.ShowDisplay(true)
RP.Blips.UpdateDisplay()
```

## Conversions Module

The Conversions module handles unit conversions and formatting for speed and distance based on user preferences.

### Unit Conversion Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Converts.PreferredDistanceUnit()` | None | `string` | Gets user's preferred distance unit (`m` or `ft`) |
| `RP.Converts.PreferredSpeedUnit()` | None | `string` | Gets user's preferred speed unit (`kmh` or `mph`) |
| `RP.Converts.SpeedToPreferred(speed)` | `number` | `number` | Converts speed from GTA units to preferred units |
| `RP.Converts.DistanceToPreferred(distance)` | `number` | `number` | Converts distance from GTA units to preferred units |
| `RP.Converts.FormatPreferredDistance(distance, longUnit?, precision?)` | `number, boolean?, number?` | `number, string` | Formats distance with proper units |

### Parameters

- **`distance`** - Distance value to format
- **`longUnit`** - If true, uses longer units (m→meter(s), ft→foot/feet)
- **`precision`** - Number of decimal places to keep

### Usage Examples

```lua
-- Get user's preferred units
local distanceUnit = RP.Converts.PreferredDistanceUnit()
local speedUnit = RP.Converts.PreferredSpeedUnit()
print("Preferred distance unit:", distanceUnit) -- "m" or "ft"
print("Preferred speed unit:", speedUnit) -- "kmh" or "mph"

-- Convert GTA units to preferred units
local gtaSpeed = 30.0
local preferredSpeed = RP.Converts.SpeedToPreferred(gtaSpeed)
print("Speed in preferred units:", preferredSpeed)

local gtaDistance = 100.0
local preferredDistance = RP.Converts.DistanceToPreferred(gtaDistance)
print("Distance in preferred units:", preferredDistance)

-- Format distance with proper units
local distance, unit = RP.Converts.FormatPreferredDistance(preferredDistance, true, 2)
print("Formatted distance:", distance, unit) -- e.g., "1.00 km" or "328.08 ft"

-- Short unit format
local distance, unit = RP.Converts.FormatPreferredDistance(preferredDistance, false, 1)
print("Short format:", distance, unit) -- e.g., "1.0 km" or "328.1 ft"
```

## PedController Module

The PedController module creates radius-based entities that dynamically appear and disappear based on player proximity, providing efficient entity management and dynamic world population.
The created entities get automatically cleaned up on resource stop/restart.

### Overview

Creates radius entities that fade in/out when stepping in/out of the radius, providing efficient entity management and dynamic world population.

### Entity Options

| Option | Type | Description |
|--------|------|-------------|
| `model` | `string\|number` | Entity model to spawn |
| `heading` | `number` | Entity heading (facing direction) |
| `invincible` | `boolean` | Makes entity invincible |
| `godmode` | `boolean` | Alias for invincible |
| `freeze` | `boolean` | Freezes entity in place |
| `blockEvents` | `boolean` | Blocks temporary events (peds only) |
| `invisible` | `boolean` | Makes entity invisible |
| `nofade` | `boolean` | Disables fade in/out effect |
| `fadeTime` | `number` | Custom fade time in milliseconds |
| `useFirstBoard` | `boolean` | Uses first model for leaderboard |
| `useSecondBoard` | `boolean` | Uses second model for leaderboard |
| `useThirdBoard` | `boolean` | Uses third model for leaderboard |

### Board Options (Leaderboard Peds)

An array with text for the board. If not defined, displays "N/A".

| Index | Type | Description |
|-------|------|-------------|
| `1` | `string` | First line of text |
| `2` | `string` | Second line of text |
| `3` | `string` | Third line of text |

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.PedController.CreateRadiusPed(pos, radius, pedOptions?, onCreate?, onDespawn?)` | `vector3, number, table?, function?, function?` | `number` | Creates radius-based ped |
| `RP.PedController.CreateRadiusLeaderboardPed(pos, radius, pedOptions?, onCreate?, onDespawn?)` | `vector3, number, table?, function?, function?` | `number` | Creates radius-based leaderboard ped |
| `RP.PedController.CreateRadiusCar(pos, radius, carOptions?, onCreate?, onDespawn?)` | `vector3, number, table?, function?, function?` | `number` | Creates radius-based car |
| `RP.PedController.CreateRadiusObject(pos, radius, objectOptions?, onCreate?, onDespawn?)` | `vector3, number, table?, function?, function?` | `number` | Creates radius-based object |
| `RP.PedController.DeleteRadiusEntity(id)` | `number` | None | Deletes radius entity |

### Callback Functions

- **`onCreate(ent: number)`** - Called when entity is created (player steps into radius)
- **`onCreate(ped: number, updateBoard: function)`** - Same as above but with board update function for leaderboard peds
- **`onDespawn(ent: number)`** - Called when entity is despawned (player steps out of radius)

### Usage Examples

```lua
-- Create a basic radius ped
local pedId = RP.PedController.CreateRadiusPed(
    vector3(100.0, 200.0, 30.0), -- Position
    50.0, -- Radius
    { -- Ped options
        model = "a_m_m_business_01",
        invincible = true,
        freeze = true,
        heading = 90.0
    },
    function(ped) -- On create
        print("Ped created:", ped)
        -- Customize ped
        SetEntityHeading(ped, 90.0)
    end,
    function(ped) -- On despawn
        print("Ped despawned:", ped)
    end
)

-- Create a leaderboard ped
local leaderboardId = RP.PedController.CreateRadiusLeaderboardPed(
    vector3(150.0, 250.0, 30.0), -- Position
    30.0, -- Radius
    { -- Ped options
        model = "a_m_m_business_01",
        invincible = true,
        useFirstBoard = true,
        heading = 180.0
    },
    function(ped, updateBoard) -- On create with board update
        print("Leaderboard ped created:", ped)
        -- Update board text
        updateBoard({"First Place", "Second Place", "Third Place"})
    end
)

-- Create a radius car
local carId = RP.PedController.CreateRadiusCar(
    vector3(200.0, 300.0, 30.0), -- Position
    40.0, -- Radius
    { -- Car options
        model = "adder",
        invincible = true,
        freeze = true,
        heading = 270.0
    }
)

-- Create a radius object
local objectId = RP.PedController.CreateRadiusObject(
    vector3(250.0, 350.0, 30.0), -- Position
    25.0, -- Radius
    { -- Object options
        model = "prop_box_wood02a",
        invincible = true,
        heading = 0.0
    }
)

-- Delete radius entity
RP.PedController.DeleteRadiusEntity(pedId)
```

## Events

### Client Events

| Event | Description | Parameters | Networked |
|-------|-------------|------------|-----------|
| `rp-base:playerLoaded` | Triggered when player object loads | `function(player: table)` | No |
| `rp-base:playerSessionStarted` | Triggered when player session starts | None | No |

### Event Details

- **`rp-base:playerLoaded`** - Provides basic player data (identifier, group, pid) when player loads
- **`rp-base:playerSessionStarted`** - Triggered when the player's network session begins

### Usage Examples

```lua
-- Listen for player loaded
AddEventHandler('rp-base:playerLoaded', function(playerData)
    print("Player loaded:", playerData.identifier)
    print("Player group:", playerData.group)
    print("Player PID:", playerData.pid)
end)

-- Listen for session start
AddEventHandler('rp-base:playerSessionStarted', function()
    print("Player session started")
    -- Initialize client-side systems
end)
```

## Best Practices

### Performance
- **Use local entities** for single-player effects
- **Batch entity operations** when possible
- **Clean up entities** properly to prevent memory leaks
- **Use appropriate spawn methods** (sync vs async) based on needs

### Entity Management
- **Check entity validity** before operations
- **Handle spawn failures** gracefully
- **Use local objects** for temporary effects
- **Optimize entity options** for your use case

### Error Handling
- **Validate entity IDs** before operations
- **Check function returns** for success/failure
- **Handle callback errors** gracefully
- **Provide fallback behavior** for failed operations

### Code Examples

```lua
-- Example of robust entity handling
local function safeEntityOperation(entityId)
    if not entityId or not DoesEntityExist(entityId) then
        RP.Log.warning("Invalid entity ID:", entityId)
        return false
    end
    
    -- Proceed with operation
    return true
end

-- Example of entity cleanup
local spawnedEntities = {}

local function cleanupEntities()
    for _, entity in ipairs(spawnedEntities) do
        if DoesEntityExist(entity) then
            DeleteEntity(entity)
        end
    end
    spawnedEntities = {}
end

-- Example of batch spawning
local function spawnMultipleObjects(models, coords)
    for i, model in ipairs(models) do
        RP.SpawnObject(model, coords[i], function(obj)
            if obj then
                table.insert(spawnedEntities, obj)
            end
        end)
    end
end
```

## Integration Examples

### Complete Entity Management System

```lua
local spawnedEntities = {}

-- Spawn entities around player
local function spawnWorldEntities()
    local playerCoords = GetEntityCoords(PlayerPedId())
    
    -- Spawn nearby objects
    local objectId = RP.SpawnObject("prop_box_wood02a", 
        playerCoords + vector3(50.0, 0.0, 0.0), 
        function(obj)
            if obj then
                table.insert(spawnedEntities, {type = "object", id = obj})
            end
        end
    )
end

-- Clean up entities
local function cleanupEntities()
    for _, entity in ipairs(spawnedEntities) do
        if entity.type == "object" then
            RP.DeleteObject(entity.id)
        elseif entity.type == "vehicle" then
            RP.DeleteVehicle(entity.id)
        end
    end
    spawnedEntities = {}
end

-- Initialize system
Citizen.CreateThread(function()
    spawnWorldEntities()
    
    -- Clean up on resource stop
    AddEventHandler('onResourceStop', function(resourceName)
        if GetCurrentResourceName() == resourceName then
            cleanupEntities()
        end
    end)
end)
```