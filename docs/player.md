# RCPlayer

Represents a connected player on the server.

## Properties

| Name        | Type     | Description                     |
|-------------|----------|---------------------------------|
| `source`    | number   | Player's server ID              |
| `identifier`| string   | Player's identifier             |
| `pid`       | number   | Player's database ID            |
| `group`     | string   | Player's permission group       |
| `coords`    | vector3  | Player's position (getter/setter) |
| `name`      | string   | Player's name                   |
| `nickname`  | string   | Player's nickname               |
| `metadata`  | table    | Metadata object (RCMetadata)    |
| `accounts`  | table    | Currency/accounts (RCAccounts)  |
| `xp`        | number   | Player's experience             |
| `ped`       | number   | Player's ped entity             |
| `state`     | table    | Player's replicated state       |
| `playtime`  | number   | Total playtime in seconds       |
| `heading`   | number   | Entity heading                  |

## Dynamic properties
Some properties are dynamic, that means that when you read from them or write to them, they execute a function.

#### Coords
- If read, it gets the current coords either from natives or ox_lib
- If written to, teleports the player to those coordinates

#### Heading
- If read, it gets the current heading using natives
- If written to, sets the player's heading

#### Ped
- If read, it gets the current ped either from natives or ox_lib
- If written to, fucks everything up

#### State
- If read, it gets the player's state `Player(self.source).state`
- If written to, fucks everything up

#### Playtime
- If read, it gets the current playtime of the player in seconds
- If written to, fucks everything up

#### XP
- If read, it just gets XP from the metadata
- If written to, changes the XP and saves to database and replicates to state

## Metadata
All player metadata is automatically saved to the database on write.
<br>It also replicates into the player's state `state["metadata_<KEY>"]`.
<br>**Never read the metadata from the player's state on server as it can easily be manipulated**.

## Accounts
Similiar to metadata, this also gets automatically saved to database on write.
<br>It also replicates into the player's state `state["accounts_<CURRENCY>"]`.
<br>**Never read the accounts from the player's state on server as it can easily be manipulated**.

## Methods

- `RCPlayer:teleport(x, y, z, heading?)` or `RCPlayer:teleport(coords, heading?)` – Teleport player
- `RCPlayer:setCoords(...)` – Alias for `RCPlayer:teleport`
- `RCPlayer:kick(reason?)` - Kick the player (Default reason: "Kicked")
- `RCPlayer:showNotification(message, delay?)` - Show a notification to the player (not implemented)
- `RCPlayer:getRank()` - Gets the player's rank based on the player's XP
- `RCPlayer:save(cb?)` - Save the player and call the callback function if provided
- `RCPlayer:triggerEvent(eventName, ...)` - Trigger an event for the player
- `RCPlayer:hasDoneStuntJump(id)` - Checks if the player has done a stuntjump