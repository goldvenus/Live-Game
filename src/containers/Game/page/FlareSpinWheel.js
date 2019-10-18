import React from 'react';
import Canvas from 'react-native-canvas';
import { View } from 'react-native';
export default  function FlareSpinWheel() {
  const _handleCanvas = (canvas) => {
    if (canvas !== null) {
      const options = ['a', 'b', 'c', 'd', 'e'];
      let ctx = canvas.getContext('2d');
      canvas.width = 500;
      canvas.height = 500;
      let outsideRadius = 20;
      let textRadius = 110;
      let insideRadius = 180;
      let startAngle = 0;
      let arc = Math.PI / (options.length / 2);
      ctx.clearRect(0, 0, 800, 800);
      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 0;
      ctx.font = 'bold 14px Open Sans';

      for (let i = 0; i < options.length; i++) {
        let angle = startAngle + i * arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgb(220,220,220)';
        ctx.fillStyle = '#666666';
        ctx.translate(
          250 + Math.cos(angle + arc / 2) * textRadius,
          250 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(80 + angle + arc / 2 + Math.PI / 2);
        let text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgb(220,220,220)';
      ctx.lineWidth = 20;
      ctx.arc(250, 250, insideRadius, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#ff0';
      ctx.arc(250, 250, outsideRadius, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  };

  const _renderCanvas = () => {
    return <Canvas ref={_handleCanvas} />;
  };
  return <View style={{
    flex:1,
    width: '100%',
    heigth: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }}>{_renderCanvas()}</View>;

}
