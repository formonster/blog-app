import Touch, { MoveReturn } from './touch';

export type HoverType = boolean | {
    angle: number
}

export interface UmbrellaProps {
    world: string | HTMLDivElement;
    scene: string | HTMLDivElement;
    hover?: HoverType
}

class Umbrella {

    containers: NodeListOf<HTMLDivElement> | [HTMLDivElement] = null;
    scenes: NodeListOf<HTMLDivElement> | [HTMLDivElement] = null;
    speed = .5;

    hover: HoverType = false;
    disable = false;

    containersRotate: { x: number, y: number, z: number }[] = []

    constructor({ world, scene, hover = false }: UmbrellaProps) {
        if (!world) throw new Error('缺少 world 参数！');

        this.containers = typeof world === "string" ? document.querySelectorAll<HTMLDivElement>(world) : [world];
        this.scenes = typeof scene === "string" ? document.querySelectorAll<HTMLDivElement>(scene) : [scene];
        this.hover = hover;

        var _ = this;
        this.containers.forEach(function (target, i) {
            _.containersRotate.push({ x: 0, y: 0, z: 0 });
            _.touchListener(target, _.scenes[i], _.containersRotate[i], hover);
        })
    }
    /**
     *
     * @param {Number} range 距离
     * @returns
     */
    slowDown(range: number, speed: number) {
        return range * speed;
    }
    reset = () => {
        this.scenes.forEach(function (target, i) {
            target.style.transform = `rotateX(${0}deg) rotateY(${0}deg) rotateZ(0deg)`;
        })
    }
    setDisable = (disable: boolean) => {
        if (disable) {
            this.reset();
            this.disable = true;
        } else this.disable = false;
    }
    touchListener(target: HTMLDivElement, scene: HTMLDivElement, rotate: { x: number, y: number }, hover: HoverType) {
        var width = target.clientWidth;
        var height = target.clientHeight;
        var _ = this;
        var _x = rotate.x;
        var _y = rotate.y;
        new Touch({
            target,
            hover: !!hover,
            onMove: function (e) {

                if (_.disable) return;

                if (hover) {

                    if (typeof hover !== "object") throw new Error("hover 参数格式错误");
                    if (!hover.angle) hover.angle = 10;

                    let widthHalf = width / 2;
                    let yPer = (e.position.x - widthHalf) / widthHalf
                    _y = hover.angle * yPer;

                    let heightHalf = height / 2;
                    let xPer = (e.position.y - heightHalf) / heightHalf
                    _x = hover.angle * xPer;
                    scene.style.transform = `rotateX(${_x}deg) rotateY(${_y}deg) rotateZ(0deg)`;
                    return;
                }

                _x = rotate.x - _.slowDown(e.offset.y, _.speed);
                _y = rotate.y + _.slowDown(e.offset.x, _.speed);
                if (_x >= 90) _x = 90;
                if (_x <= -90) _x = -90;
                scene.style.transform = `rotateX(${_x}deg) rotateY(${_y}deg) rotateZ(0deg)`;
            },
            onUp: function () {
                rotate.x = _x;
                rotate.y = _y;
            }
        })
    }
}

export default Umbrella;