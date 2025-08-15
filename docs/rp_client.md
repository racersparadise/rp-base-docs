# RP (Client)

Base shared object

## PlayerData

### Properties
| Name        | Type     | Description                     |
|-------------|----------|---------------------------------|
|`ped`        |number    | Player's ped entity             |
|`coords`     |vector3   | Player's coordinates            |
|`state`      |table     | Player's state                  |
|`heading`    |number    | Player's heading                |
|`accounts`   |table     | Player's accounts (currency)    |
|`metadata`   |table     | Player's metadata               |
|`nickname`   |string    | Player's nickname               |
|`identifier` |string    | Player's identifier             |
|`group`      |string    | Player's permission group       |
|`xp`         |number    | Player's XP                     |
|`pid`        |number    | Player's database ID            |
|`sid`        |number    | Player's server ID              |

### Dynamic properties

#### Coords
- If read, it gets the current coords either from natives or ox_lib
- If written to, teleports the player to those coordinates

#### Heading
- If read, it gets the current heading using natives
- If written to, sets the player's heading

#### Ped
- If read, it gets the current ped either from natives or ox_lib
- Can't be written to

#### State
- If read, it gets the player's state `LocalPlayer.state`
- Can't be written to

#### XP
- If read, it just gets XP from the metadata
- Can't be written to

#### Sid
- If read, it gets the player's server id from natives or ox_lib
- Can't be written to

## Modules
- [Util](rp_shared?id=util)
- [Log](rp_shared?id=log)
- [Blips](rp_client?id=blips)
- [Converts](rp_client?id=converts)
- [PedController](rp_client?id=pedcontroller)

## RP
- `RP.TriggerServerCallback(name, cb, ...)` - Triggers a server callback
- `RP.Teleport(x, y, z, heading?)` or `RP.Teleport(coords, heading?)` - Teleports the player
- `RP.GetPlayerRank()` - Gets the player's rank from XP
- `RP.RequestModel(modelHash: number|string, timeout?)` - Requests a model with a timeout (default 10000)
-- Synchronous
-- Returns false if model is invalid
- `RP.RequestStreamedTextureDict(dict, cb?)` - Streams a texture dict and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
- `RP.RequestStreamedTextureDictSync(dict)` - Streams a texture dict
-- Synchronous (returns object and blocks execution)
- `RP.SpawnPed(model: string|number, coords, heading?, cb?)` - Spawns a ped and calls the callback function if provided
-- Asynchronous (doesn't return ped, only in callback and doesn't block execution)
-- Will load model if needed
- `RP.SpawnPedSync(model: string|number, coords, heading?)` - Spawns a ped
-- Synchronous (returns ped and blocks execution)
-- Will load model if needed
- `RP.SpawnObject(model: string|number, coords: vector3|table, cb?)` - Spawns an object and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(object)
- `RP.SpawnObjectSync(model: string|number, coords: vector3|table)` - Spawns an object
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
- `RP.SpawnLocalObject(model: string|number, coords: vector3|table, cb?)` - Spawns a local object and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(object)
- `RP.SpawnLocalObjectSync(model: string|number, coords: vector3|table)` - Spawns a local object
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
- `RP.DeleteVehicle(veh)` - Deletes the vehicle
- `RP.SpawnVehicle(model: string|number, coords: vector3|table, heading, cb?)` - Spawns a vehicle and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnVehicleSync(model: string|number, coords: vector3|table, heading)` - Spawns a vehicle
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnLocalVehicle(model: string|number, coords: vector3|table, heading, cb?)` - Spawns a local vehicle and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnLocalVehicleSync(model: string|number, coords: vector3|table, heading)` - Spawns a local vehicle
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.GetVehicleProperties(veh)` - Gets vehicle properties
-- Maybe better to use [lib.getVehicleProperties](https://overextended.dev/ox_lib/Modules/VehicleProperties/Client#libgetvehicleproperties)
- `RP.SetVehicleProperties(veh, props)` - Sets vehicle properties
-- Maybe better to use [lib.setVehicleProperties](https://overextended.dev/ox_lib/Modules/VehicleProperties/Client#libsetvehicleproperties)
- `RP.DrawText3D(pos: vector3|table, text, scale, color: table)` - Draws 3D text - propositional
-- `color` - {r, g, b}
-- Very slow, lot of ms
-- Needs to be called every frame
- `RP.DrawText3DNonProp(pos: vector3|table, text, scale, color: table)` - Draws 3D text - not propositional
-- `color` - {r, g, b}
-- Very slow, lot of ms
-- Needs to be called every frame
- `RP.DrawText(x, y, text, scale, color)` - Draw 2D text
-- `color` - {r, g, b}
-- Needs to be called every frame
-- Better to use [TextUI](https://overextended.dev/ox_lib/Modules/Interface/Client/textui)
- `RP.ShowHelpText(text)` - Show help text
-- Needs to be called every frame
-- Better to use [TextUI](https://overextended.dev/ox_lib/Modules/Interface/Client/textui)
- `RP.KeyBoard(text)` - Show on-screen keyboard
-- `text` - Text to show at the top of the window
-- Returns the input text or nil if cancelled
-- Better to use [Input Dialogs](https://overextended.dev/ox_lib/Modules/Interface/Client/input)
- `RP.ShowNotification(text, duration)` - Show a notification
-- `duration` - ms
-- Not implemented

## Blips
- `RP.Blips.SetBlipInfoTitle(blip, title, rockstarVerified)` - Sets the blip's title and rockstar icon
- `RP.Blips.SetBlipInfoImage(blip, dict, texture)` - Sets the blip's image
- `RP.Blips.SetBlipInfoEconomy(blip, rp, money)` - Sets the blip's RP and money values
- `RP.Blips.AddBlipInfoHeader(blip, leftText, rightText)` - Sets the blip's header
- `RP.Blips.AddBlipInfoName(blip, leftText, rightText)` - Sets the blip's name
- `RP.Blips.AddBlipInfoText(blip, leftText, rightText)` - Sets the blip's text
- `RP.Blips.AddBlipInfoIcon(blip, leftText, rightText, iconId, iconColor, checked)` - Sets the blip's [icon](https://docs.fivem.net/docs/game-references/blips/)
- `RP.Blips.SetBlipPath(blip, path)` - Not actually sure what this does lol
- there's more but idk what half of these do tbh, check old scripts that use these

## Converts
- `RP.Converts.PreferredSpeedUnit()` - Gets the user's preffered unit (kmh|mph)
- `RP.Converts.SpeedToPreferred(speed)` - Converts the speed from GTA units to preferred units
- `RP.Converts.DistanceToPreferred(distance)` - Converts the distance from GTA units to preferred units
- `RP.Converts.FormatPreferredDistance(distance, longUnit?, precision?)` - Format the distance to proper units (m -> km, ft -> mi)
-- `distance` - Preferred distance from `DistanceToPreferred`
-- `longUnit` - true/false, if true will use longer units (m->meter(s), ft->(foot/feet))
-- `precision` - How many numbers to keep after the floating point

## PedController

- Creates radius entitites that fade in/out when stepping in/out of the radius

#### entityOptions (carOptions, pedOptions, objectOptions)

| Name          | Type          | Description               |
|---------------|---------------|---------------------------|
| invincible    | bool          | Invincibility             |
| freeze        | bool          | Freeze entity             |
| blockEvents   | bool          | Block temporary events (peds)|
| invisible     | bool          | Invisibility              |
| noFade        | bool          | Don't fade entity         |
| useFirstBoard | bool          | Use first model for the leaderboard|
| useSecondBoard| bool          | Use second model for the leaderboard|
| useThirdBoard | bool          | Use third model for the leaderboard|

- the use<number>Board options are only used for leaderboard peds, if you have one or more leaderboard peds that can be on the screen at the same time, you need to use another number for each ped because the text will be shared between the boards (one scaleform)

#### boardOptions (leaderboard peds)
- An array with text for the board
- If not defined, will be "N/A"
| Name          | Type              | Description       |
|---------------|-------------------|-------------------|
| 1             | string            | First line        |
| 2             | string            | Second line       |
| 3             | string            | Third line        |

- `onCreate(ent: number)` (car, ped, object) - Called when the entity is created (player steps into radius)
- `onCreate(ped: number, updateBoard: func(boardOptions))` (leaderboard ped) - Same as above but with an additional parameter for the board
- Example:
```lua
local id = RP.PedController.CreateRadiusLeaderboardPed(..., function(ped, updateBoard)
    -- do whatever you want with the ped
    updateBoard({"first line", "second line", "third line"})
end, ...
```

- `RP.PedController.CreateRadiusPed(pos, radius, pedOptions?, onCreate?, onDespawn?)` - Creates a ped that only appears when the player is in radius
-- Returns the radius entity ID
- `RP.PedController.CreateRadiusLeaderboardPed(pos, radius, pedOptions?, onCreate?, onDespawn?)` - Creates a leaderboard ped that only appears when the player is in radius
-- Spawns a ped that holds a sign like in the prison cutscenes with defined text
-- Returns the radius entity ID
- `RP.PedController.CreateRadiusCar(pos, radius, carOptions?, onCreate?, onDespawn?)` - Create a car that only appears when the player is in radius
-- Returns the radius entity ID
- `RP.PedController.CreateRadiusObject(pos, radius, objectOptions?, onCreate?, onDespawn?)` - Create an object that only appears when the player is in radius
-- Returns the radius entity ID
- `RP.DeleteRadiusEntity(id)` - Deletes the radius entity with the specified ID

## Events
- `rp-base:setGroup` - Gets triggered when the user's group changes
-- Networked
-- function(group)
- `rp-base:playerLoaded` - Gets triggered when the player object loads
-- Networked
-- function(player: table)
-- this only gives identifier, group and pid
- `rp-notify:notify` - Show a notification
-- `msg` - the notification
-- `duration` - duration in ms
-- Not implemented in base