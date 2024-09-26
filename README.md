User Settings is a simple library module that adds user settings to Foundry VTT.<br>
Normal client settings will be stored as browser cookies, which means that when the user switches browsers, computers, or deletes their cookies, all their client settings are lost.<br>
This module will store the client settings as a user flag to solve this issue.

This module does nothing on its own, but can be used by other modules.

## usage
1. Add User Settings as to the "relationships" in your module's module.json:
```json
"relationships": {
  "requires": [
    {
      "id": "userSettings",
      "type": "module",
      "manifest": "https://github.com/MaterialFoundry/UserSettings/releases/latest/download/module.json",
      "compatibility": {
          "verified": "1.0.0"
      }
    }
  ]
}
```

2. Register a setting as normal, but use `game.userSettings.register` instead of `game.settings.register`:
```js
game.userSettings.register("namespace", "key", {
  name: "SettingName",
  hint: "SettingHint",
  scope: "client",
  config: true,
  default: false,
  type: Boolean
});
```

That's all!<br>
Settings can be set or gotten as usual: `game.settings.set("namespace", key, value)` and `game.settings.get(namespace, key)`.<br>