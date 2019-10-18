import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';
export default  function MegaSpinWheel() {
  const _handleCanvasWheel = (canvas)=> {
    if (canvas !== null){
      const ctx = canvas.getContext('2d');
      canvas.width = 500;
      canvas.height = 500;
      ctx.beginPath();
      ctx.arc(170, 150, 100, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };
  const renderCanvasWheel = () => {
    return <Canvas ref={_handleCanvasWheel}/>
  };
  return (
    <View>
      {renderCanvasWheel()}
    </View>
  )
}