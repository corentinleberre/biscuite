import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeDiceRollProps = {
	visible: boolean;
	onFinished?: () => void;
	result?: [number, number];
};

const FACE_TO_UV_INDEX: Record<number, number> = {
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
};

function createDiceMaterial(loader: THREE.TextureLoader): THREE.MeshStandardMaterial[] {
	const textures = [1, 2, 3, 4, 5, 6].map((n) =>
		loader.load(`/src/assets/dices/red/${n}.svg`)
	);
	textures.forEach((t) => {
		t.colorSpace = THREE.SRGBColorSpace as any;
		t.anisotropy = 8;
	});
	return textures.map(
		(t) =>
			new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, metalness: 0.1 })
	);
}

function randomQuaternion(): THREE.Quaternion {
	const axis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
	const angle = Math.random() * Math.PI * 2;
	return new THREE.Quaternion().setFromAxisAngle(axis, angle);
}

function orientationForFace(face: number): THREE.Quaternion {
	// Map face number to cube orientation so that face is up (positive Y)
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
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		if (!props.visible) return;
		const container = containerRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
		camera.position.set(0, 3, 8);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		const ambient = new THREE.AmbientLight(0xffffff, 0.8);
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
		const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
		const die1 = new THREE.Mesh(geometry, materials);
		const die2 = new THREE.Mesh(geometry, materials);
		die1.castShadow = die2.castShadow = true;
		die1.position.set(-1.2, 0, 0);
		die2.position.set(1.2, 0, 0);
		scene.add(die1, die2);

		const startQ1 = randomQuaternion();
		const startQ2 = randomQuaternion();
		die1.quaternion.copy(startQ1);
		die2.quaternion.copy(startQ2);

		const targetFaces: [number, number] = props.result ?? [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
		const endQ1 = orientationForFace(targetFaces[0]);
		const endQ2 = orientationForFace(targetFaces[1]);

		const duration = 900; // ms
		const spinTurns = 2 + Math.random() * 2;
		const startTime = performance.now();

		const tmpQ1 = new THREE.Quaternion();
		const tmpQ2 = new THREE.Quaternion();
		const spinAxis1 = new THREE.Vector3(1, 1, 0).normalize();
		const spinAxis2 = new THREE.Vector3(0, 1, 1).normalize();

		function animate(now: number) {
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
			}
			renderer.render(scene, camera);
			rafRef.current = requestAnimationFrame(animate);
			if (t === 1) {
				cancelAnimationFrame(rafRef.current!);
				props.onFinished && props.onFinished();
			}
		}

		rafRef.current = requestAnimationFrame(animate);

		const onResize = () => {
			if (!container) return;
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
	}, [props.visible, props.result]);

	return (
		<div
			ref={containerRef}
			style={{ width: "100%", height: "220px", position: "relative" }}
		/>
	);
}

