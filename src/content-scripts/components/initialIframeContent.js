const initialContent = () => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <style>
        body {
            margin: 0px;
        }
        .glow-on-hover {
          border: none;
          outline: none;
          color: #fff;
          background: #111;
          cursor: pointer;
          position: relative;
          z-index: 0;
          border-radius: 10px;
        }
        
        .glow-on-hover:before {
          content: "";
          background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
          );
          position: absolute;
          top: -2px;
          left: -2px;
          background-size: 400%;
          z-index: -1;
          filter: blur(5px);
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          animation: glowing 20s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          border-radius: 10px;
        }
        
        .glow-on-hover:active {
          color: #000;
        }
        
        .glow-on-hover:active:after {
          background: transparent;
        }
        
        .glow-on-hover:hover:before {
          opacity: 1;
        }
      </style>
      </head>
      <body>
        <div id="page" class="page"></div>
      </body>
    </html>`;
};

export default initialContent;