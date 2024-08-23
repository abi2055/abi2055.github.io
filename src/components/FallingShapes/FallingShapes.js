import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import MatterWrap from 'matter-wrap';

const FallingShapes = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Composite, Composites, Common, MouseConstraint, Mouse, Bodies } = Matter;

    if (typeof MatterWrap !== 'undefined') {
      Matter.use('matter-wrap');
    } else {
      Matter.use(MatterWrap);
    }

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: true,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    Render.run(render);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
      return Bodies.circle(x, y, Common.random(5, 10), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });

    Composite.add(world, stack);

    Composite.add(world, [
      Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
      Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
      Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' } }),
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    const resizeCanvas = () => {
      render.bounds.max.x = window.innerWidth;
      render.bounds.max.y = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      render.canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      render.canvas.style.width = `${window.innerWidth}px`;
      render.canvas.style.height = `${window.innerHeight}px`;
      Render.setPixelRatio(render, window.devicePixelRatio || 1);
      Render.lookAt(render, Composite.allBodies(world));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const renderLoop = () => {
      if (document.hidden) {
        Runner.stop(runner);
      } else {
        Runner.run(runner, engine);
      }
      requestAnimationFrame(renderLoop);
    };

    requestAnimationFrame(renderLoop);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: '100%', height: '100%' }} />;
};

export default FallingShapes;
