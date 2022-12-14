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
	if (false ||  Engine.ConfigDB_GetValue("user", "profile.autociv.intuitive") === "true")
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
			if(value.search('"\s*,\s*"')){ // \" is into"{
				let value2 = value.split(/"\s*,\s*"/);
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
}

check_tts_Settings();

function saveThisModProfile(nr, autoLabelManually){
	const modsFromUserCfg_const = Engine.ConfigDB_GetValue("user", "mod.enabledmods");
	const name = "modProfile.p" + nr
	const modProfile = Engine.ConfigDB_GetValue("user", name);
	const nameLabel = "modProfile.p" + nr + "label"
	
	// warn("check if ModProfiles has changed")

	if(!modProfile){
		// warn("133")
		let clean = "";
		switch(nr){
			case 0: // p0
				clean = modsFromUserCfg_const.replaceAll(/[^\w\d\-]+/g,' ');
				break;
			case 1:
				clean = "autociv LocalRatings-master better_summary_charts";
				break;
			case 2:
				clean = "community-mod feldmap autociv better_summary_charts";
				break;
			case 3:
				clean = "LocalRatings-master better_summary_charts";
				break;
			case 4:
				clean = "community-maps-2 kush-extreme 10ad autociv";
				break;
			case 4:
				clean = "mainland-twilight autociv LocalRatings-master ";
				break;
		}
		clean = clean.replaceAll(/\b((mod\s+public)|ttsSpeakingPopulation)\b\s*/g,''); // mod\s+public is default. boring to save it


		Engine.ConfigDB_WriteValueToFile("user", name, clean, "config/user.cfg"); // fill it if its empty

		const cleanLabel = clean.replaceAll(/([^ ]{3})[^ ]+/g,'$1');
		Engine.ConfigDB_WriteValueToFile("user", nameLabel, cleanLabel, "config/user.cfg"); // fill it if its empty
		Engine.ConfigDB_CreateValue("user", nameLabel, cleanLabel);
	}else{
		let clean = modProfile.replaceAll(/[^\w\d\-]+/g,' ');
		clean = clean.replaceAll(/\b((mod\s+public)|ttsSpeakingPopulation)\b\s*/g,''); // mod\s+public is default. boring to save it

		// warn("146:" + modProfile)
		// warn("147:" + clean)
		if(clean != modProfile){ // correct profile if necesarry
			Engine.ConfigDB_WriteValueToFile("user", name, clean, "config/user.cfg"); // 
			Engine.ConfigDB_CreateValue("user", name, clean); // to see it early in the memory
			warn("modProfile.p" + nr + ' saved with =' + clean + '=');

			
		}


		if(!autoLabelManually){
				const cleanLabel = clean.replaceAll(/([^ ]{3})[^ ]+/g,'$1');
				Engine.ConfigDB_WriteValueToFile("user", nameLabel, cleanLabel, "config/user.cfg"); // fill it if its empty
				Engine.ConfigDB_CreateValue("user", nameLabel, cleanLabel);

				warn("autoLabel" + nr + ' saved with =' + cleanLabel + '=');
		}

	}
}
function enableThisModProfile(nr){ 
	if(Engine.ConfigDB_GetValue("user", "modProfile.p" + nr + "enabled")== "true"){
		const modsFromUserCfg_const = Engine.ConfigDB_GetValue("user", "mod.enabledmods");
		const profKey = "modProfile.p" + nr;
		const modProfile = Engine.ConfigDB_GetValue("user", profKey);
		let clean = "mod public " + modProfile.replaceAll(/\b((mod\s+public)|ttsSpeakingPopulation)\b\s*/g,' '); // mod\s+public is default. boring to save it
		clean = "mod public " + modProfile.replaceAll(/\b(mod\s+public)\b\s*/g,'') + " ttsSpeakingPopulation" ; // mod\s+public is default. boring to save it in normal profiles. but dont forget it by enaable mods
		if(clean != modsFromUserCfg_const){
			warn("save:" + nr);
			warn(clean);
			error("RESTART NECESSARY");
			warn(clean);
			warn("is enabled next when 0ad is started.");
			// warn(modsFromUserCfg_const);
			// warn("_____________________"); 			
			Engine.ConfigDB_WriteValueToFile("user", "modProfile.backup", modsFromUserCfg_const, "config/user.cfg"); 
			Engine.ConfigDB_WriteValueToFile("user", "mod.enabledmods", clean, "config/user.cfg"); 
			// return true;
			// state.needsRestart = true;
			// configSaveToMemoryAndToDisk(key, settings[key]);
			Engine.ConfigDB_CreateValue("user", "mod.enabledmods", clean);
			// state.reasons.add("New mode-profile settings added.");

		}else{
			// warn("dont save " + nr);
		}
		return true;
	}
	return false;
}

function check_modProfileSelector_settings(){ 
	// Check settings
	const autoLabelManually = (Engine.ConfigDB_GetValue("user", "modProfile.autoLabelManually") == "true");
	[...Array(6)].forEach(( _, k0_5 ) => saveThisModProfile(k0_5, autoLabelManually));  
	// return false; 
 	let k0_5 = -1;
	while(++k0_5 <= 5){
		let nameOfCheckBox = "modProfile.p" + k0_5 + "enabled";
		if(Engine.ConfigDB_GetValue("user", nameOfCheckBox) == "true"){
			if(enableThisModProfile(k0_5)){
				warn("" + k0_5 + " was enabled as your default mod-configuration."); 
				Engine.ConfigDB_WriteValueToFile("user", nameOfCheckBox, "false", "config/user.cfg"); 
				Engine.ConfigDB_CreateValue("user", nameOfCheckBox, "false");
				warn(k0_5 + " checkBox disabled (if enabled have conflict with the normal mod selector)"); 
				return true; 
			};
			break; 
		}
	}
	return false;
} 

check_modProfileSelector_settings(); // info
