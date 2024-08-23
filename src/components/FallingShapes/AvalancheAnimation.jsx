import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import MatterWrap from 'matter-wrap';

const FallingShapes = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Composite, Bodies, Events, Common } = Matter;

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
        showAngleIndicator: false,
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

    const addShape = () => {
      const x = Common.random(0, window.innerWidth);
      const size = Common.random(5, 10);
      const shape = Bodies.circle(x, -size, size, {
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
        frictionAir: 0.05, // Add air resistance to slow down the descent
      });
      Composite.add(world, shape);
    };

    // Add new shapes over time
    const shapeInterval = setInterval(addShape, 200);

    // Remove shapes that go out of bounds
    Events.on(engine, 'afterUpdate', () => {
      const allBodies = Composite.allBodies(world);
      for (let i = 0; i < allBodies.length; i++) {
        const body = allBodies[i];
        if (body.position.y > window.innerHeight + 20) {
          Composite.remove(world, body);
        }
      }
    });

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
      clearInterval(shapeInterval);
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
