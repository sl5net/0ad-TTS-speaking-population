
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

