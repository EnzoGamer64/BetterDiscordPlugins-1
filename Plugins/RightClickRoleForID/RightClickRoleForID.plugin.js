//META{"name":"RightClickRoleForID","website":"https://github.com/Mega-Mewthree/BetterDiscordPlugins/Plugins/RightClickRoleForID","source":"https://github.com/Mega-Mewthree/BetterDiscordPlugins/Plugins/DiscordCakeDay/RightClickRoleForID.plugin.js"}*//

/*
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

*/

/*
MIT License

Copyright (c) 2018 Mega_Mewthree

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Created July 28th, 2018.

class RightClickRoleForID {
  getName() {
    return "RightClickRoleForID";
  }
  getShortName() {
    return "RightClickRoleForID";
  }
  getDescription() {
    return 'Right-clicking a role in role menus or member popups will copy the role ID to your clipboard.\n\nMy Discord server: https://nebula.mooo.info/discord-invite\nDM me @Lucario 🌌 V5.0.0#7902 or create an issue at https://github.com/Mega-Mewthree/BetterDiscordPlugins for support.';
  }
  getVersion() {
    return "0.0.1";
  }
  getAuthor() {
    return "Mega_Mewthree"; //Current Discord account: @Lucario 🌌 V5.0.0#7902 (438469378418409483)
  }
  constructor() {}
  load() {}
  unload() {}
  start() {
    let libraryScript = document.getElementById("zeresLibraryScript");
    if (!window.ZeresLibrary || window.ZeresLibrary.isOutdated) {
      if (libraryScript) libraryScript.parentElement.removeChild(libraryScript);
      libraryScript = document.createElement("script");
      libraryScript.setAttribute("type", "text/javascript");
      libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
      libraryScript.setAttribute("id", "zeresLibraryScript");
      document.head.appendChild(libraryScript);
    }
    if (window.ZeresLibrary) this.initialize();
    else libraryScript.addEventListener("load", () => { this.initialize(); });
  }
  stop() {
    this.active = false;
  }
  initialize() {
    PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), `https://raw.githubusercontent.com/Mega-Mewthree/BetterDiscordPlugins/master/Plugins/${this.getName()}/${this.getName()}.plugin.js`);
    this.active = true;
    PluginUtilities.showToast("RightClickRoleForID has started!");
  }
  observer({addedNodes}) {
    let len = addedNodes.length;
    let change;
    while (len--){
      change = addedNodes[len];
      if (typeof change.className === "string") {
        console.log(change.className);
        if (
          change.className.indexOf("flex-") > -1 &&
          change.className.indexOf("horizontal-") > -1 &&
          change.className.indexOf("directionRow-") > -1 &&
          change.className.indexOf("justifyStart-") > -1 &&
          change.className.indexOf("alignStart-") > -1 &&
          change.className.indexOf("noWrap-") > -1
        ) {
          try {
            const roleHolder = change.children[0].children[0].children[0].children[0].children[0].children[0];
            const roles = roleHolder[Object.keys(roleHolder).find(k => k.startsWith("__reactEventHandlers"))].children;
            let len = roles.length;
            while (len-- > 1) {
              const role = roles[len];
              if (!role.props.id) continue;
              roleHolder.children[len].oncontextmenu = () => {
                if (!this.active) return;
                DiscordNative.clipboard.copy(role.props.id);
                PluginUtilities.showToast("Copied Role ID!", {type: "success"});
              };
            }
          } catch (e) {}
        } else if ((change.className.indexOf("itemSelected") > -1 && change.className.indexOf("role") > -1) || change.className.indexOf("draggable") > -1) {
          try {
            const roleHolder = change.parentNode;
            const roles = roleHolder[Object.keys(roleHolder).find(k => k.startsWith("__reactEventHandlers"))].children;
            let len = roles.length;
            while (len-- > 1) {
              const role = roles[len];
              if (!role.props.id) continue;
              roleHolder.children[len].oncontextmenu = () => {
                if (!this.active) return;
                DiscordNative.clipboard.copy(role.props.id);
                PluginUtilities.showToast("Copied Role ID!", {type: "success"});
              };
            }
          } catch (e) {}
        } else if (
          change.className.indexOf("noArrow-") > -1 &&
          change.className.indexOf("noShadow-") > -1 &&
          change.className.indexOf("popout-") > -1 &&
          change.className.indexOf("popoutLeft-") > -1
        ) {
          try {
            const roleHolder = change.children[0].children[1].children[1];
            const roles = roleHolder[Object.keys(roleHolder).find(k => k.startsWith("__reactEventHandlers"))].children[0];
            let len = roles.length;
            while (len--) {
              const role = roles[len];
              if (!role.key) continue;
              roleHolder.children[len].oncontextmenu = () => {
                if (!this.active) return;
                DiscordNative.clipboard.copy(role.key);
                PluginUtilities.showToast("Copied Role ID!", {type: "success"});
              };
            }
          } catch (e) {}
        }
      }
    }
  }
}

/*
-----BEGIN PGP SIGNATURE-----

iQEzBAEBCAAdFiEEGTGecftnrhRz9oomf4qgY6FcSQsFAltcHmIACgkQf4qgY6Fc
SQvNNgf+Lkk9DXiprU96Bv1yQpZ8UUGNWJhpcByTLha06+XVDBI7U347iBZpWdm0
0jx7LdFCctt6Gxf12ngy0GGPLOgnGu3ibNvImpOtzswu027fh1UKjtqZ3KQwbSDp
6gJbsk9E5XJl+MqtthD4KaqHK6S95J7bj8XnSwi4S74uVbkclrSI5Oez4RD7osRT
TiIdpf+cR4c4fi7L64OIBrDfo1H5pN3bUabHHFE3A1OlCPl4gfcSOojw1u1nCJU+
QbUB5HQ6REuqlPcbxVNj36tz6bxcRwvSelrGfiitNpfHKIcL+sWQif+0MsJMdknC
0SlkXQhc8wFkybAmeZTnPmCFLGhOEw==
=/q7s
-----END PGP SIGNATURE-----
*/
