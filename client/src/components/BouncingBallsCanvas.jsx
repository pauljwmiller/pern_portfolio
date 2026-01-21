import { useEffect, useRef } from "react";

const BALL_COUNT = 12;

export default function BouncingBallsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const getObstacles = () =>
      [...document.querySelectorAll("nav, .main-content section")].map(el =>
        el.getBoundingClientRect()
      );

    const isInsideObstacle = (x, y, r, obstacles) =>
      obstacles.some(rect =>
        x + r > rect.left &&
        x - r < rect.right &&
        y + r > rect.top &&
        y - r < rect.bottom
      );

    const obstacles = getObstacles();

    const balls = Array.from({ length: BALL_COUNT }, () => {
      const r = Math.random() * 3 + 5;
      let x, y;

      //prevent spawning inside elements
      do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } while (isInsideObstacle(x, y, r, obstacles));

      return {
        x,
        y,
        vx: (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        r,
        color: Math.random() > 0.5 ? "orange" : "#032a69",
      };
    });

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const obstacles = getObstacles();

      balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        //wall collisions
        if (ball.x < ball.r) {
          ball.x = ball.r;
          ball.vx *= -1;
        }
        if (ball.x > canvas.width - ball.r) {
          ball.x = canvas.width - ball.r;
          ball.vx *= -1;
        }
        if (ball.y < ball.r) {
          ball.y = ball.r;
          ball.vy *= -1;
        }
        if (ball.y > canvas.height - ball.r) {
          ball.y = canvas.height - ball.r;
          ball.vy *= -1;
        }

        //DOM collisions
        obstacles.forEach(rect => {
          const closestX = Math.max(rect.left, Math.min(ball.x, rect.right));
          const closestY = Math.max(rect.top, Math.min(ball.y, rect.bottom));

          const dx = ball.x - closestX;
          const dy = ball.y - closestY;

          if (dx * dx + dy * dy < ball.r * ball.r) {
            if (Math.abs(dx) > Math.abs(dy)) {
              //horizontal collision
              ball.vx *= -1;
              ball.x =
                dx > 0
                  ? rect.right + ball.r
                  : rect.left - ball.r;
            } else {
              //vertical collision
              ball.vy *= -1;
              ball.y =
                dy > 0
                  ? rect.bottom + ball.r
                  : rect.top - ball.r;
            }
          }
        });

        //draw
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });

      requestAnimationFrame(update);
    }

    update();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
