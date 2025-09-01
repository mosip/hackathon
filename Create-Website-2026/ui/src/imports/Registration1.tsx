import imgRectangle from "figma:asset/23b82e5d03172e6c3c3822a6d21caeb540f86558.png";
import { imgRectangle1, imgRectangle2 } from "./svg-hq2ye";

function Group() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.84%]" data-name="Group">
      <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute bg-no-repeat bg-size-[100%_100%] bg-top-left inset-[2.6%_2.27%_1.04%_2.84%] mask-position-[-1px,_0px_0px,_0px] mask-size-[168px_185px,_167px_185px]" data-name="Rectangle" style={{ backgroundImage: `url('${imgRectangle}')`, maskImage: `url('${imgRectangle1}'), url('${imgRectangle2}')` }} />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.84%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.84%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.27%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.27%]" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[2.6%_2.27%_1.04%_2.27%]" data-name="Group">
      <Group2 />
    </div>
  );
}

export default function Registration1() {
  return (
    <div className="relative size-full" data-name="Registration 1">
      <Group3 />
    </div>
  );
}