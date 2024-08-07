
export default class Timer {
    timer: number = 0;
    duration: number = 0;
    isDone: Boolean = true;

    SetDuration(duration: number) {
        this.timer = this.duration = duration;
        this.isDone = false;
    }

    GetDuration() {
        return this.duration;
    }

    GetTime() {
        return this.timer;
    }

    GetTimePercent() {
        return this.timer / this.duration;
    }

    Reset() {
        this.timer = this.duration;
        this.isDone = false;
    }

    IsDone() {
        return this.timer == 0;
    }

    JustFinished() {
        if (this.timer > 0) {
            return false;
        }

        if (this.isDone) {
            return false;
        }

        this.isDone = true;
        return true;
    }

    Update(deltaTime: number) {
        if (this.timer == 0) {
            return;
        }

        this.timer -= deltaTime;
        if (this.timer < 0) {
            this.timer = 0;
        }
    }
}
