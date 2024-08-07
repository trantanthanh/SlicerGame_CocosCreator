import { assetManager, ImageAsset, SpriteFrame, Texture2D } from "cc";
import EventManager from "./EventManager";
import { ActionSound, EventType } from "../Defines";

export function EmitSoundOneShot(...soundTrack: string[]) {
    let paramaters = {
        action: ActionSound.PLAY_ONE_SHOT,
        data: {
            soundTrack: soundTrack,
        }
    }
    EventManager.Instance.emit(EventType.SOUND, paramaters);
}

export function PlaySound(soundTrack: string, isLoop: boolean = false) {
    let paramaters = {
        action: ActionSound.PLAY,
        data: {
            soundTrack: soundTrack,
            loop: isLoop
        }
    }
    EventManager.Instance.emit(EventType.SOUND, paramaters);
}

export function PauseMusic()
{
    let paramaters = {
        action: ActionSound.PAUSE,
    }
    EventManager.Instance.emit(EventType.SOUND, paramaters);
}

/**
 * Random a float number
 * @param min
 * @param max
 * @returns number
 */
export function Rand(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

/**
 * Random a integer number min max inclusive
 * @param min
 * @param max
 * @returns number
 */
export function RandInt(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

/**
 * Get SpriteFrame from URL
 * @param url
 * @returns SpriteFrame
 */
export function GetSpriteFrameFromUrl(url: string): Promise<SpriteFrame> {
    return new Promise<SpriteFrame>((resolve, reject) => {
        assetManager.loadRemote<ImageAsset>(url, { xhrMimeType: "image/png" }, (error, imageAsset) => {
            if (!error) {
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;

                resolve(spriteFrame);
            }
            else {
                reject(null);
            }
        });
    });
}

/**
 * Handle interrupt on web
 */
export function RegisterVisibilityChange() {

    let hidden: string
    let visibilityChange: string;

    // Opera 12.10 and Firefox 18 and later support
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    }
    else if (typeof (<any>document).msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    }
    else if (typeof (<any>document).webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if ((<any>document)[hidden]) {
            (<any>window).onGamePause();
        }
        else {
            (<any>window).onGameResume();
        }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
        console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    }
    else {
        // Handle page visibility change
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}

/**
 * Dispatch event
 * @param eventName
 */
export function DispatchEvent(eventName: string) {
    let event;
    try {
        event = new Event(eventName);
    }
    catch (e) {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    document.dispatchEvent(event);
}

/**
 * Add debug log to screen
 * @param value
 */
export function AddLogText(value: string) {
    let mainWindow = (<any>window);
    if (mainWindow.mMainDivLogText == undefined) {
        let logStyle = document.createElement('style');
        logStyle.innerText = `
            .main_div_log_text{width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none; text-align: left; overflow: hidden; margin: 0; padding: 0;}
            .main_div_log_text div{width: 100%; height: 100%; padding: 0; margin: 0; text-align: left; overflow-x: hidden; overflow-y: auto; pointer-events: none;}
            .main_div_log_text div p{display: inline; margin: 0; padding: 0; font-family: 'Arial'; color: #00ff00; background-color: rgba(0, 0, 0, 0.3); font-size: 2vmax;}
        `;

        mainWindow.mMainDivLogText = document.createElement('div');
        mainWindow.mMainDivLogText.classList.add('main_div_log_text');
        mainWindow.mDivLogText = document.createElement('div');
        document.head.appendChild(logStyle);
        document.body.appendChild(mainWindow.mMainDivLogText);
        mainWindow.mMainDivLogText.appendChild(mainWindow.mDivLogText);
    }

    let newP = document.createElement('p');
    newP.innerText = '' + value;
    newP.appendChild(document.createElement('br'));

    mainWindow.mDivLogText.appendChild(newP);
    mainWindow.mDivLogText.scrollTop = mainWindow.mDivLogText.scrollHeight;

    while (mainWindow.mDivLogText.childNodes.length > 2 && mainWindow.mDivLogText.lastChild.offsetTop >= 0.95 * mainWindow.mDivLogText.getBoundingClientRect().height) {
        mainWindow.mDivLogText.removeChild(mainWindow.mDivLogText.firstChild);
    }
}