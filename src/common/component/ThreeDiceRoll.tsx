import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeDiceRollProps = {
  rolling: boolean;
  onFinished?: () => void;
  result?: [number, number];
};

function createDiceMaterial(loader: THREE.TextureLoader): THREE.MeshStandardMaterial[] {
  const textures = [1, 2, 3, 4, 5, 6].map((n) => loader.load(`/src/assets/dices/red/${n}.svg`));
  textures.forEach((t) => {
    // @ts-ignore - colorSpace exists on recent three versions
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  return textures.map(
    (t) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, metalness: 0.1 })
  );
}

function randomQuaternion(): THREE.Quaternion {
  const axis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
  const angle = Math.random() * Math.PI * 2;
  return new THREE.Quaternion().setFromAxisAngle(axis, angle);
}

function orientationForFace(face: number): THREE.Quaternion {
  const q = new THREE.Quaternion();
  const euler = new THREE.Euler();
  switch (face) {
    case 1:
      euler.set(0, 0, 0);
      break;
    case 2:
      euler.set(0, 0, Math.PI);
      break;
    case 3:
      euler.set(0, 0, -Math.PI / 2);
      break;
    case 4:
      euler.set(0, 0, Math.PI / 2);
      break;
    case 5:
      euler.set(Math.PI / 2, 0, 0);
      break;
    case 6:
      euler.set(-Math.PI / 2, 0, 0);
      break;
  }
  q.setFromEuler(euler);
  return q;
}

export default function ThreeDiceRoll(props: ThreeDiceRollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const die1Ref = useRef<THREE.Mesh | null>(null);
  const die2Ref = useRef<THREE.Mesh | null>(null);
  const tickRef = useRef<((now: number) => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  // Init scene once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(2, 5, 3);
    scene.add(ambient, dir);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.15 })
    );
    floor.rotateX(-Math.PI / 2);
    floor.position.y = -1.2;
    scene.add(floor);

    const loader = new THREE.TextureLoader();
    const materials = createDiceMaterial(loader);
    const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const die1 = new THREE.Mesh(geometry, materials);
    const die2 = new THREE.Mesh(geometry, materials);
    die1.position.set(-1.6, 0, 0);
    die2.position.set(1.6, 0, 0);
    scene.add(die1, die2);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    die1Ref.current = die1;
    die2Ref.current = die2;

    const renderLoop = (now: number) => {
      if (tickRef.current) tickRef.current(now);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(renderLoop);
    };
    rafRef.current = requestAnimationFrame(renderLoop);

    const onResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Static orientation when not rolling
  useEffect(() => {
    if (!die1Ref.current || !die2Ref.current) return;
    if (props.rolling) return;
    const [f1, f2] = props.result ?? [1, 1];
    const endQ1 = orientationForFace(f1);
    const endQ2 = orientationForFace(f2);
    tickRef.current = () => {
      die1Ref.current!.quaternion.copy(endQ1);
      die2Ref.current!.quaternion.copy(endQ2);
    };
  }, [props.result, props.rolling]);

  // Rolling animation
  useEffect(() => {
    if (!props.rolling) return;
    if (!die1Ref.current || !die2Ref.current) return;

    const die1 = die1Ref.current;
    const die2 = die2Ref.current;
    const startQ1 = die1.quaternion.clone();
    const startQ2 = die2.quaternion.clone();
    const [f1, f2] = props.result ?? [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    const endQ1 = orientationForFace(f1);
    const endQ2 = orientationForFace(f2);

    const duration = 900;
    const spinTurns = 2 + Math.random() * 2;
    const startTime = performance.now();
    const tmpQ1 = new THREE.Quaternion();
    const tmpQ2 = new THREE.Quaternion();
    const spinAxis1 = new THREE.Vector3(1, 1, 0).normalize();
    const spinAxis2 = new THREE.Vector3(0, 1, 1).normalize();

    tickRef.current = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const easeOut = 1 - Math.pow(1 - t, 3);
      const spinAngle1 = easeOut * spinTurns * Math.PI * 2;
      const spinAngle2 = easeOut * (spinTurns + 0.5) * Math.PI * 2;
      tmpQ1.setFromAxisAngle(spinAxis1, spinAngle1);
      tmpQ2.setFromAxisAngle(spinAxis2, spinAngle2);
      die1.quaternion.copy(startQ1).multiply(tmpQ1);
      die2.quaternion.copy(startQ2).multiply(tmpQ2);
      if (t === 1) {
        die1.quaternion.slerp(endQ1, 0.95);
        die2.quaternion.slerp(endQ2, 0.95);
        props.onFinished && props.onFinished();
      }
    };
  }, [props.rolling, props.result, props.onFinished]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}

