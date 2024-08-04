import { _decorator, Component, Node } from 'cc';
import { ActionSound, ActionSystem, EventType } from '../Defines';
import { DispatchEvent, EmitSoundOneShot } from '../core/Utils';
import EventManager from '../core/EventManager';
import { Fade } from '../utils/Fade';

const { ccclass, property } = _decorator;

@ccclass('Interstitial')
export class Interstitial extends Component {
    @property(Node)
    loading: Node = null!;

    @property(Fade)
    fadeScreen: Fade;

    isPlayClicked : boolean = false;

    onLoad() {
    }

    start() {
        EventManager.Instance.on(EventType.SYSTEM, this.OnInterruptEvent, this);
        this.fadeScreen.node.active = true;
        this.fadeScreen.out();
    }

    onDestroy() {
        EventManager.Instance.off(EventType.SYSTEM, this.OnInterruptEvent, this);
    }

    update(deltaTime: number) {

    }

    Play() {
        if (this.isPlayClicked) {
            return;
        }
        EventManager.Instance.off(EventType.SYSTEM, this.OnInterruptEvent, this);
        this.isPlayClicked = true;
        EmitSoundOneShot("SFX_START");
        this.fadeScreen.in(() => {
            this.Switch2Loading();
        })
    }

    Switch2Loading() {
        this.loading.active = true;
        this.node.active = false;
    }

    OnInterruptEvent(parameters: any) {
        if (!this.node.active) {
            return;
        }

        switch (parameters.action) {
            case ActionSystem.PAUSE:
                break;

            case ActionSystem.RESUME:
                break;
        }
    }
}
