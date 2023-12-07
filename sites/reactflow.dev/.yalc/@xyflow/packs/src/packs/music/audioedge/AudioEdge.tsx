import { useEffect, useMemo, useState } from "react";
import {
  type EdgeProps,
  BaseEdge,
  getSimpleBezierPath,
  useStore,
} from "reactflow";

export function AudioEdge({
  source,
  sourceX,
  sourceY,
  sourcePosition,
  target,
  targetX,
  targetY,
  targetPosition,
  ...delegated
}: EdgeProps) {
  // PRUNE START ---------------------------------------------------------------
  // You should replace this hook call with your own code that gets a reference
  // to the Web Audio node you want to use as the source of this  edge's analyser
  // node.
  const { ctx, out } = useAudioDemo();
  // PRUNE END -----------------------------------------------------------------

  // This sets up the analyser web audio node as well as the initial empty buffer
  // that we'll use to store the time domain data and plot the wave.
  //
  // 🚨 This `ctx` should be a reference to the Audio Context you're using in your
  // application. This custom edge *will not work* without a context to use to
  // create the analyser node.
  const analyser = useMemo(() => ctx.createAnalyser(), [ctx]);
  // This code isn't sensitive to changes in the analyser's `fftSize` property,
  // but realistically you shouldn't want to change that value after creating the
  // node anyway.
  const bufferSize = useMemo(() => analyser.fftSize / 2, [analyser]);
  const [buffer, setBuffer] = useState(new Float32Array(bufferSize));

  // React Flow gives us some utils to create an SVG path from two handles. Here
  // we are getting a simple bezier curve between the two handles and then cutting
  // the path into a number of points that we will use to draw our wave.
  const [basePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const points = useMemo(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("d", basePath);

    const length = svg.getTotalLength();
    const chunk = length / bufferSize;

    return Array.from({ length: bufferSize }, (_, i) =>
      svg.getPointAtLength(chunk * i),
    );
  }, [
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    analyser,
  ]);

  // It's time for some ✨ trigonometry ✨. We are going to use the points we
  // calculated above to draw a wave between the two handles. To do this, we
  // need to calculate the angle of each line segment between the points and
  // then rotate the line segment by the amplitude of the wave at that point.
  // We then draw a line from the previous point to the rotated point.
  //
  // As we go, we're reconstructing the SVG path that we'll ultimately use to
  // render the edge.
  const path = useMemo(
    () =>
      points.reduce((path, { x, y }, i) => {
        // The first and last points are special cases: we don't want to modify
        // their position because we want the wave to visually start and end at
        // the handles.
        if (i === 0) return path + `M ${x} ${y}`;
        if (i === points.length - 1) return path + `L ${x} ${y}`;

        // We need to grab the previous point so we can calculate how much we've
        // rotated in the line segment.
        const { x: fromX, y: fromY } = points[i - 1];
        // We multiply the amplitude by 5 to make the wave a bit more visible:
        // feel free to play with this value.
        const amplitude = buffer[i] * 3;

        // Behold: maths! 📐
        const angle = Math.atan2(y - fromY, x - fromX);
        const rotationX = -amplitude * Math.sin(angle);
        const rotationY = +amplitude * Math.cos(angle);

        return path + `L ${x + rotationX} ${y + rotationY}`;
      }, ""),
    [buffer, points],
  );

  // PRUNE START ---------------------------------------------------------------
  // We use this effect to connect our oscillator source to the analyser node.
  useEffect(() => {
    out.connect(analyser);

    return () => {
      out.disconnect(analyser);
    };
  }, [out, analyser]);
  // PRUNE END -----------------------------------------------------------------

  //
  const shouldThrottle = useStore(
    (state) =>
      state.nodeInternals.get(source)?.dragging ||
      state.nodeInternals.get(target)?.dragging,
  );

  useEffect(() => {
    let t = Date.now();
    let delta = 1000 / (shouldThrottle ? 12 : 60);
    let handle = window.requestAnimationFrame(function tick() {
      const now = Date.now();

      if (now - t >= delta) {
        const next = new Float32Array(bufferSize);

        analyser.getFloatTimeDomainData(next);
        setBuffer(next);
        t = now;
      }

      handle = window.requestAnimationFrame(tick);
    });

    return () => {
      window.cancelAnimationFrame(handle!);
    };
  }, [shouldThrottle, analyser]);

  return (
    <BaseEdge path={path} labelX={labelX} labelY={labelY} {...delegated} />
  );
}

export default AudioEdge;

// This hook creates a dummy oscillator node so that we have an audio source to
// connect to our analyser node.
const useAudioDemo = () => {
  const ctx = useMemo(() => ((window as any).ctx = new AudioContext()), []);
  const out = useMemo(() => ctx.createGain(), [ctx]);

  useEffect(() => {
    const mod = ctx.createOscillator();
    const osc = ctx.createOscillator();

    mod.frequency.value = 50 + Math.random() * 10;
    mod.type = (["sawtooth", "triangle"] as const)[~~(Math.random() * 4)];
    mod.start();

    osc.frequency.value = 200 + Math.random() * 400;
    osc.type = (["sine", "sawtooth", "square"] as const)[~~(Math.random() * 4)];
    osc.start();

    mod.connect(out.gain);
    osc.connect(out);

    if (ctx.state !== "running") {
      // DO NOT WRITE SIDE EFFECTS IN A USEMEMO HOOK IN REAL CODE. WE ARE WRITING
      // THIS SO THAT OUR *EXAMPLE* EDGES CAN SHARE THE SAME AUDIO CONTEXT AND MAKE
      // SURE THEY START GENERATING WAVES AS SOON AS POSSIBLE.
      window.addEventListener("click", () => void ctx.resume());
    }

    return () => {
      mod.disconnect(out.gain);
      osc.disconnect(out);
    };
  }, []);

  return { ctx, out };
};
// PRUNE START -----------------------------------------------------------------------
AudioEdge.meta = {
  title: "AudioEdge",
  route: "audio-edge",
  description: [
    "This is where we should write lots of words about the audio edge. Explain\
     what it does and how it works etc. We would probably want to support \
     `markdown` here",
    "And also multiple paragraphs so we can write a nice-looking guide or \
     something.",
  ],
};
// PRUNE END -----------------------------------------------------------------------
