
import { _decorator, Component, AudioClip, AudioSource, game, director } from 'cc';
import EventManager from '../core/EventManager';
import { RandInt } from '../core/Utils';
import { ActionSound, EventType } from '../Defines';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('SoundMgr')
@requireComponent(AudioSource)
export class SoundMgr extends Component {
    soundIndexs: any = [];

    @property(AudioClip) M_LIC_KT_BGM: AudioClip = null;
    @property(AudioClip) M_LIC_KT_END: AudioClip = null;
    @property(AudioClip) SFX_UI_CONFIRM: AudioClip = null;
    @property(AudioClip) SFX_UI_TIMER: AudioClip = null;
    @property(AudioClip) SFX_UI_TIME_OVER: AudioClip = null;
    @property(AudioClip) SFX_BOMB: AudioClip = null;
    @property(AudioClip) SFX_CHIPS_1: AudioClip = null;
    @property(AudioClip) SFX_CHIPS_2: AudioClip = null;
    @property(AudioClip) SFX_CHIPS_3: AudioClip = null;
    @property(AudioClip) SFX_COMBO: AudioClip = null;
    @property(AudioClip) SFX_START: AudioClip = null;
    @property(AudioClip) SFX_SELECT: AudioClip = null;
    @property(AudioClip) SFX_SLICE_1: AudioClip = null;
    @property(AudioClip) SFX_SLICE_2: AudioClip = null;
    @property(AudioClip) SFX_SLICE_3: AudioClip = null;

    public audioSource: AudioSource = null;

    onLoad() {
        director.addPersistRootNode(this.node)
        this.audioSource = this.getComponent(AudioSource);
        EventManager.Instance.on(EventType.SOUND, this.OnSoundEvent, this);

        this.soundIndexs['M_LIC_KT_BGM'] = this.M_LIC_KT_BGM;
        this.soundIndexs['M_LIC_KT_END'] = this.M_LIC_KT_END;
        this.soundIndexs['SFX_UI_CONFIRM'] = this.SFX_UI_CONFIRM;
        this.soundIndexs['SFX_UI_TIMER'] = this.SFX_UI_TIMER;
        this.soundIndexs['SFX_UI_TIME_OVER'] = this.SFX_UI_TIME_OVER;
        this.soundIndexs['SFX_BOMB'] = this.SFX_BOMB;
        this.soundIndexs['SFX_CHIPS_1'] = this.SFX_CHIPS_1;
        this.soundIndexs['SFX_CHIPS_2'] = this.SFX_CHIPS_2;
        this.soundIndexs['SFX_CHIPS_3'] = this.SFX_CHIPS_3;
        this.soundIndexs['SFX_COMBO'] = this.SFX_COMBO;
        this.soundIndexs['SFX_START'] = this.SFX_START;
        this.soundIndexs['SFX_SELECT'] = this.SFX_SELECT;
        this.soundIndexs['SFX_SLICE_1'] = this.SFX_SLICE_1;
        this.soundIndexs['SFX_SLICE_2'] = this.SFX_SLICE_2;
        this.soundIndexs['SFX_SLICE_3'] = this.SFX_SLICE_3;
    }

    onDestroy() {
        EventManager.Instance.off(EventType.SOUND, this.OnSoundEvent, this);
    }

    playRandomOneShot(...soundTrack: number[]) {
        let random = RandInt(0, soundTrack.length - 1);
        let clip = this.soundIndexs[soundTrack[random]];

        this.audioSource.playOneShot(clip);
    }

    OnSoundEvent(paramaters: any) {
        let data = paramaters.data;
        switch (paramaters.action) {
            case ActionSound.PLAY:
                {
                    this.audioSource.clip = this.soundIndexs[data.soundTrack];
                    this.audioSource.loop = data.loop;
                    this.audioSource.play();
                    break
                }
            case ActionSound.PAUSE:
                {
                    this.audioSource.pause();
                    break
                }
            case ActionSound.STOP:
                {
                    break
                }
            case ActionSound.PLAY_ONE_SHOT: {
                this.playRandomOneShot.apply(this, data.soundTrack);
                break;
            }
        }
    }
}
