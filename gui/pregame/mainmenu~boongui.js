var boonGUIConfig = {
	"needsToSave": false,
	"needsToReloadHotkeys": false,
	"set": function(key, value)
	{
		Engine.ConfigDB_CreateValue("user", key, value);
		this.needsToSave = true;
		this.needsToReloadHotkeys = this.needsToReloadHotkeys || key.startsWith("hotkey.");
	},
	"get": function(key) { return Engine.ConfigDB_GetValue("user", key); },
	"save": function()
	{
		if (this.needsToSave) Engine.ConfigDB_WriteFile("user", "config/user.cfg");
		if (this.needsToReloadHotkeys) Engine.ReloadHotkeys();
	}
};

function boongui_initCheck()
{
	const state = {
		"needsRestart": false,
		"reasons": [],
		"showMessage": false
	};

	// Check settings
	{
		const settings = Engine.ReadJSONFile("boongui_data/default_config.json");

		const allHotkeys = new Set(Object.keys(Engine.GetHotkeyMap()));
		for (const key in settings)
		{
			if (key.startsWith("hotkey."))
			{
				if (!allHotkeys.has(key.substring("hotkey.".length)))
				{
					boonGUIConfig.set(key, settings[key]);
					state.showMessage = true;
				}
			}
			else if (boonGUIConfig.get(key) == "")
				boonGUIConfig.set(key, settings[key]);

			else if ((key == "xres" || key == "yres") && boonGUIConfig.get(key) == "0")
				boonGUIConfig.set(key, settings[key]);
		}
		boonGUIConfig.save();

	}
	if (state.showMessage)
	{
		function addReason(title, hotkey)
		{
			state.reasons.push(setStringTags(`${title}:`, { "font": "sans-bold-18" }));
			state.reasons.push(colorizeHotkey(`%(hotkey)s`, hotkey));
			state.reasons.push("");
		}

		addReason("Take the view of a unit", "boongui.camera.follow.fps");
		addReason("Toggle the stats overlay", "boongui.session.stats.toggle");
		addReason("Popup the quit dialog", "boongui.session.gui.exit");
		addReason("Next stats tab", "boongui.session.stats.nextMode");
		addReason("Previous stats tab", "boongui.session.stats.previousMode");
	}
	return state;
}

autociv_patchApplyN("init", function(target, that, args)
{
	const state = boongui_initCheck();
	if (state.showMessage)
	{
		const message = state.reasons.join("\n");
		const title = setStringTags("boonGUI hotkeys", { "font": "sans-bold-18" });
		messageBox(450, 400, message, title, ["Ok"], [() => { }]);
	}

	return target.apply(that, args);
}

);


// warn('check_tts_Settings()');
function check_tts_Settings(){
	    // Check settings
	if (Engine.ConfigDB_GetValue("user", "profile.autociv.intuitive") === "true")
    {
        const settings = Engine.ReadJSONFile("0ad_tts_data/intuitive_config.json");
        // Reset all autociv settings to default. Custom autociv settings added won't be affected.
        // if ( false && Engine.ConfigDB_GetValue("user", "profile.autociv.intuitive"))
        // {
        // Engine.ConfigDB_WriteValueToFile("user", "profile.autociv.intuitive","false", "config/user.cfg"); // dont reset always. only once


		
		const allHotkeys = new Set(Object.keys(Engine.GetHotkeyMap()));

		// Engine.ConfigDB_WriteValueToFile("user", "profile.autociv.intuitive","false", "config/user.cfg"); // dont reset always. only once
		boonGUIConfig.set("profile.autociv.intuitive", "false");

		for (const key in settings)
		{
			// state.showMessage = true;
			let value = settings[key];
			// value = settings[key].replace(/\\\"/g,''); 
			// if(value.substring("\\\"".length)) // \" is into"
			if(value.search("dumpf")){ // \" is into"{
				let value2 = value.split(/",\s"/);
				for (let key2 in value2){
					// warn("value= " + value);
					// warn("value3= " + value2[key2]);
					boonGUIConfig.set(key, value2[key2].replace(/"/g,'') );
				}
				continue; 
			}
			boonGUIConfig.set(key, value);
		}
	}
	// if (state.showMessage)
	// {
	// 	function addReason(title, hotkey)
	// 	{
	// 		state.reasons.push(setStringTags(`${title}:`, { "font": "sans-bold-18" }));
	// 		state.reasons.push(colorizeHotkey(`%(hotkey)s`, hotkey));
	// 		state.reasons.push("");
	// 	}

	// 	addReason("Take the view of a unit", "boongui.camera.follow.fps");
	// 	addReason("Toggle the stats overlay", "boongui.session.stats.toggle");
	// 	addReason("Popup the quit dialog", "boongui.session.gui.exit");
	// 	addReason("Next stats tab", "boongui.session.stats.nextMode");
	// 	addReason("Previous stats tab", "boongui.session.stats.previousMode");
	// }
	// return state;
}

check_tts_Settings();