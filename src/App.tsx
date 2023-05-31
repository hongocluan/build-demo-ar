import React, {
  // Suspense,
  useState 
} from 'react';
import {
 ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Chair } from './components/Chair';

function App() {
  const [indexModelActive, setIndexModelActive] = useState<number>(0);
  // const gltf = useLoader(GLTFLoader, "./models/chair.gltf");
  const [instant, setInstant] = useState<any[]>([
    {
      placementMode: true,
      model: <Chair position-x={0} position-z={-1} rotation-y={0.35} />,
      placementCamera: [0, 0, -10],
      scale: 0.75,
    },
  ]);

  const handlePinModel = () => {
    const instantClone = [...instant];
    for (let i = 0; i < instantClone.length; i++) {
      if (i === indexModelActive) {
        instantClone[i].placementMode = !instantClone[i].placementMode;
        break;
      }
    }
    setInstant(instantClone);
  };

  const addNewModel = () => {
    const instantClone = [...instant];
    instantClone.push(
      {
        placementMode: true,
        model: <Chair position-x={0} position-z={-1} rotation-y={0.35} />,
        placementCamera: [1, 1, -10],
        scale: 0.75,
      },
    );
    setInstant(instantClone);
    setIndexModelActive(indexModelActive + 1);
  };

  const handleScale = (event: any) => {
    const { value } = event.target;
    setInstant(prevInstant=> {
      const instantClone = [...prevInstant];
      instantClone[indexModelActive].scale = value/90;
      return instantClone;
    });
  }

  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        {instant?.map((int, index) => (
          <InstantTracker key={index} placementMode={int.placementMode} placementCameraOffset={int.placementCamera}>
            {React.cloneElement(int.model, { scale: int.scale })}
          </InstantTracker>
        ))}
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <primitive scale={0.25} object={gltf.scene} position-y={-1.4} position-z={-1} rotation-y={0.35} />
        </Suspense> */}
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={handlePinModel}
        tabIndex={0}
        onClick={handlePinModel}
      >
        {instant[indexModelActive]?.placementMode ? 'Pin' : 'Unpin'}
      </div>
      {/* <button
        className="change-model"
        onClick={() => setIndexModelActive(indexModelActive ? 0 : 1)}
      >
        Change Model
      </button> */}
      <input value={instant[indexModelActive].scale * 100} className="zoombar" type="range" onChange={handleScale} />
      <button
        className="new-model"
        onClick={addNewModel}
      >
        New Model
      </button>
    </>
  );
}

export default App;
