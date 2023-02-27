# 0ad-TTS-speaking-population
speaking population. An experimental solution for mod developers who work in Linux.

[WFG tts Forum post](https://wildfiregames.com/forum/topic/97986-tts-inside-the-game)

This mod has been primarily tested on Ubuntu.

It uses a huge amount of source code from everywhere.
Thank you very much!!!

especially from:
- boonGui ( https://github.com/LangLangBart/boonGUI )
- espeak ( https://github.com/eeejay/espeak )
- autoKey ( https://github.com/autokey/autokey )
- 0ad_TTS_userCfg ( https://gitlab.com/-/ide/project/sl5net/0ad_tts_for_mods/tree/main/-/0ad_TTS_userCfg/ )

<a href="https://www.youtube.com/watch?v=b_-AXmcDIRs" target="_blank"><img src="http://img.youtube.com/vi/b_-AXmcDIRs/0.jpg" alt="Thumbnail" width="320" height="200" />

# Installation

1. Download
1. extract folder
1. Copy extracted folder into mods folder, typically located at:

- Linux: `~/.local/share/0ad/mods/`
- macOS: `~/Library/Application\ Support/0ad/mods/`
- Windows: `~\Documents\My Games\0ad\mods\`

Launch `0 A.D.` and open the `Settings` > `Mod Selection` menu.
Select the `ttsSpeakingPopulation` mod, Enable it and Save Configuration, restart the game.



## Recomanded Config:

![Screenshot_20221120_083249](https://user-images.githubusercontent.com/5634759/202891078-87dd47d1-9448-423e-85f3-2e30cb78146e.jpg)

## "AutoCiv Hotkey-Profiles" (extra Goody)

should work platform independent (tested in ubuntu)

![Screenshot_20221208_082103](https://user-images.githubusercontent.com/5634759/206384044-feef5147-8302-4820-838a-ef1b3b3fb2f4.jpg)

there at the moment 2 profiles included.

the 3 top features of the intuitive-Projile are:

- ALT+FirstLetter of the Creature / selects Creature or Creatures
- Ctrl+FirstLetter of the Building / selects Building or the Buildings
- FirstLetter of the Building (press several times for toggling) / build the Building


## "mod Profile Selector" (extra Goody)

should work platform independent (tested in ubuntu)

![Screenshot_20221208_081720](https://user-images.githubusercontent.com/5634759/206383669-4c2f81ec-b90b-412d-875d-c454741bcf1b.jpg)


# install if you want use TTS for Linux with autoKey (Python)

## examples - maybe you need to do it a little bit different
```sh
sudo apt-get install espeak

sudo dpkg -i  ./autokey-common_0.96.0_all.deb
sudo dpkg -i  ./autokey-qt_0.96.0_all.deb
```
copy and start

https://gitlab.com/-/ide/project/sl5net/0ad_tts_for_mods/tree/main/-/0ad_TTS_userCfg/

