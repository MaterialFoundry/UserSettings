Hooks.once("init", ()=> {
    game.userSettings = UserSettings;
})

/**
 * UserSettings class
 * Stores settings as a flag in the user object, so the setting isn't lost when switching browsers or clearing cookies.
 * User settings also register as a client setting, so they can be accessed as normal settings. 
 * In the callback of the client settings, the user flags are set, after which any other callback is called.
 */
class UserSettings {
    //Get setting from user flags
    static get(namespace, key) {
        return game.user.getFlag(namespace, key);
    }

    //Save setting to user flag
    static async set(namespace, key, data) {
        return await game.user.setFlag(namespace, key, data);
    }

    //Register a new user setting
    static async register(namespace, key, data) {
        //New onChange function that saves the value to the user flags and then calls the original onChange
        const oldOnChange = data.onChange;
        data.onChange = async function(value) {
            await UserSettings.set(namespace, key, value);
            if (oldOnChange) oldOnChange(value);
        }

        //Register as a normal setting
        await game.settings.register(namespace, key, data);

        //If usersetting doesn't exists yet, create it
        if (game.user.getFlag(namespace, key) === undefined) {
            await game.user.setFlag(namespace, key, data.default);
        }
        //Else set the original setting to it
        else if (UserSettings.get(namespace, key) !== game.settings.get(namespace, key)) {
            game.settings.set(namespace, key, UserSettings.get(namespace, key));
        }   
    }
}