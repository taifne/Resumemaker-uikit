import { useState, useEffect, useCallback } from 'react';
import { FaBomb } from 'react-icons/fa';
import { GiBattleTank, GiChicken } from "react-icons/gi";
interface Position {
  x: number;
  y: number;
}

interface Bullet extends Position {
  dx: number;
  dy: number;
}

interface Rock extends Position {
  id: number;
}

const PLAYER_SIZE = 20;
const ROCK_SIZE = 40;
const BULLET_SIZE = 10;
const ROCK_SPEED = 0.01;
const BULLET_SPEED = 8;
const SPAWN_RATE =1;

export default function Game() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 400, y: 300 });
  const [rocks, setRocks] = useState<Rock[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [rockId, setRockId] = useState(0);

  // Player movement
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      const speed = 5;
      setPlayerPos(prev => {
        const newPos = { ...prev };
        if (e.key === 'w') newPos.y -= speed;
        if (e.key === 's') newPos.y += speed;
        if (e.key === 'a') newPos.x -= speed;
        if (e.key === 'd') newPos.x += speed;
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  // Shooting
  const handleShoot = useCallback((e: React.MouseEvent) => {
    if (gameOver) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const angle = Math.atan2(
      e.clientY - rect.top - playerPos.y,
      e.clientX - rect.left - playerPos.x
    );

    const newBullet = {
      x: playerPos.x,
      y: playerPos.y,
      dx: Math.cos(angle) * BULLET_SPEED,
      dy: Math.sin(angle) * BULLET_SPEED
    };

    setBullets(prev => [...prev, newBullet]);
  }, [playerPos, gameOver]);

  // Spawn rocks
// Function to spawn a rock
const spawnRock = () => {
    if (gameOver) return;

    const side = Math.floor(Math.random() * 4);
    let x, y;

    if (side === 0) { // top
      x = Math.random() * 800;
      y = -50; // Adjusted for rock size
    } else if (side === 1) { // right
      x = 800 + 50; // Adjusted for rock size
      y = Math.random() * 600;
    } else if (side === 2) { // bottom
      x = Math.random() * 800;
      y = 600 + 50; // Adjusted for rock size
    } else { // left
      x = -50; // Adjusted for rock size
      y = Math.random() * 600;
    }

    setRocks(prev => [...prev, { x, y, id: rockId }]);
    setRockId(prev => prev + 1);
  };

  // Effect to handle rock spawning
  useEffect(() => {
    if (gameOver) return;

    // Spawn a rock every 1000ms (1 second)
    const interval = setInterval(() => {
      spawnRock();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, rockId]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const moveElements = () => {
      // Move bullets
      setBullets(prev => 
        prev.filter(bullet => {
          return bullet.x > -BULLET_SIZE && bullet.x < 800 + BULLET_SIZE &&
                 bullet.y > -BULLET_SIZE && bullet.y < 600 + BULLET_SIZE;
        }).map(bullet => ({
          x: bullet.x + bullet.dx,
          y: bullet.y + bullet.dy,
          dx: bullet.dx,
          dy: bullet.dy
        }))
      );

      // Move rocks towards player
      setRocks(prev => 
        prev.map(rock => {
          const angle = Math.atan2(
            playerPos.y - rock.y,
            playerPos.x - rock.x
          );
          
          return {
            ...rock,
            x: rock.x + Math.cos(angle) * ROCK_SPEED,
            y: rock.y + Math.sin(angle) * ROCK_SPEED
          };
        })
      );

      // Check collisions
      setRocks(prev => {
        // Bullet-rock collisions
        const newRocks = [...prev];
        setBullets(currentBullets => 
          currentBullets.filter(bullet => {
            const hitRock = newRocks.findIndex(rock => 
              Math.hypot(rock.x - bullet.x, rock.y - bullet.y) < ROCK_SIZE/2 + BULLET_SIZE/2
            );
            if (hitRock !== -1) {
              newRocks.splice(hitRock, 1);
              setScore(s => s + 10);
              return false;
            }
            return true;
          })
        );
        return newRocks;
      });

      // Player-rock collisions
      rocks.forEach(rock => {
        if (Math.hypot(rock.x - playerPos.x, rock.y - playerPos.y) < PLAYER_SIZE/2 + ROCK_SIZE/2) {
          setGameOver(true);
        }
      });

      requestAnimationFrame(moveElements);
    };

    const animationId = requestAnimationFrame(moveElements);
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, playerPos, rocks]);

  return (
    <div 
      onClick={handleShoot}
      style={{ 
        width: '800px',
        height: '600px',
        backgroundColor: '#222',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'crosshair'
      }}
    >
      {/* Player */}
      <GiBattleTank 
        style={{
          position: 'absolute',
          left: playerPos.x - PLAYER_SIZE/2,
          top: playerPos.y - PLAYER_SIZE/2,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
          backgroundColor: '#4af',
          borderRadius: '50%'
        }}
      />

      {/* Bullets */}
      {bullets.map((bullet, i) => (
        <FaBomb
          key={i}
          style={{
            position: 'absolute',
            left: bullet.x - BULLET_SIZE/2,
            top: bullet.y - BULLET_SIZE/2,
            width: BULLET_SIZE,
            height: BULLET_SIZE,
            backgroundColor: '#f00',
            borderRadius: '50%'
          }}
        />
      ))}

      {/* Rocks */}
      {rocks.map(rock => (
        <GiChicken
          key={rock.id}
          style={{
            position: 'absolute',
            left: rock.x - ROCK_SIZE/2,
            top: rock.y - ROCK_SIZE/2,
            width: ROCK_SIZE,
            height: ROCK_SIZE,
            backgroundColor: '#brown',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #8b4513, #654321)'
          }}
        />
      ))}

      {/* Score */}
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: 24 }}>
        Score: {score}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: 48,
          textAlign: 'center'
        }}>
          Game Over!<br />
          Final Score: {score}
        </div>
      )}
    </div>
  );
}