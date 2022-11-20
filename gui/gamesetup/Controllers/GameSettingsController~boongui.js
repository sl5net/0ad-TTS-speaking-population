
// this messageBox happens when you open a game config
// const message = setStringTags("hi from GameSettingsController~boongui.js", { "font": "sans-bold-20" });
// const title = setStringTags("have nice game config", { "font": "sans-bold-14" });
// messageBox(300, 300, message + "\n\n( GameSettingsController~boongui.js )" , title, ["Ok"], [() => { 		
// }]);




GameSettingsController.prototype.switchToLoadingPage = function(attributes)
{

	Engine.SwitchGuiPage("page_loading.xml", {
		"attribs": attributes?.initAttributes || g_GameSettings.toInitAttributes(),
		"playerAssignments": g_PlayerAssignments
	});

	Engine.PlayUISound("audio/interface/ui/switchToLoadingPage.ogg", false);

	



};


// warn('gui/gamesetup/Controllers/GameSettingsController~boongui.js Check settings');
// 0ad-tts/intuitive_config.json
function check_tts_Settings()
    // Check settings
    {
        // let settings = Engine.ReadJSONFile("autociv_data/default_config.json");
        let settings = Engine.ReadJSONFile("0ad_tts_data/intuitive_config.json");
        // Reset all autociv settings to default. Custom autociv settings added won't be affected.
        if ( false && Engine.ConfigDB_GetValue("user", "profile.autociv.intuitive"))
        {
            Engine.ConfigDB_WriteValueToFile("user", "profile.autociv.intuitive","false", "config/user.cfg"); // dont reset always. only once
            
            warn("RESET ALL")
            for (let key in settings)
                config.set(key, settings[key]);
            // config.save()
            state.reasons.add("AutoCiv settings changed to intuitive by user.");
            return state;
        }

        const allHotkeys = new Set(Object.keys(Engine.GetHotkeyMap()))
        // Normal check. Check for entries missing
        for (let key in settings)
        {
            if (key.startsWith("hotkey."))
            {
                if (!allHotkeys.has(key.substring("hotkey.".length)))
                {
                    // config.set(key, settings[key]);
                    state.reasons.add("New AutoCiv hotkey(s) added.");
                }
            }
            else if (config.get(key) == "")
            {
                // config.set(key, settings[key]);
                state.reasons.add("New AutoCiv setting(s) added.");
            }
        }
    }
// check_tts_Settings();