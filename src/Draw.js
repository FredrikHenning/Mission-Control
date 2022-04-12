function Draw() {
    const target = React.useRef(null);
    let drawPts = React.useRef([]);
    const mouse = useMouse(target, {
      fps: Infinity,
      enterDelay: 100,
      leaveDelay: 100
    });
  
    if (mouse.isDown) {
      // An array is a terrible data structure for this :P
      if (drawPts.current.length === 30) drawPts.current.shift();
      drawPts.current.push(mouse);
    }
  
    const drawing = [];
  
    for (let i = 0; i < drawPts.current.length; i++) {
      const { x, y, elementWidth, elementHeight } = drawPts.current[i];
  
      drawing.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: Math.min(x, elementWidth - 12),
            top: Math.min(y, elementHeight - 12),
            width: 12,
            height: 12,
            backgroundColor: "#1a1a1a",
            borderRadius: 1000
          }}
        />
      );
    }
  
    return (
      <div>
        <h2>Click (or touch) and drag over me</h2>
        <div className={cls()} ref={target}>
          {drawing}
        </div>
      </div>
    );
  }