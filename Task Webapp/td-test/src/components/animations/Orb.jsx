import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Vec3 } from "ogl";
import "./Orb.css";

export default function Orb({
  hue = 0,
  hoverIntensity = 0.25,
  rotateOnHover = true,
  forceHoverState = false,
}) {
  const ctnDom = useRef(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c){ float y=dot(c,vec3(0.299,0.587,0.114)); float i=dot(c,vec3(0.596,-0.274,-0.322)); float q=dot(c,vec3(0.211,-0.523,0.312)); return vec3(y,i,q); }
    vec3 yiq2rgb(vec3 c){ float r=c.x+0.956*c.y+0.621*c.z; float g=c.x-0.272*c.y-0.647*c.z; float b=c.x-1.106*c.y+1.703*c.z; return vec3(r,g,b); }
    vec3 adjustHue(vec3 color, float hueDeg){ float a=hueDeg*3.14159265/180.0; vec3 yiq=rgb2yiq(color); float ca=cos(a), sa=sin(a); float i=yiq.y*ca-yiq.z*sa; float q=yiq.y*sa+yiq.z*ca; yiq.y=i; yiq.z=q; return yiq2rgb(yiq); }

    vec3 hash33(vec3 p3){ p3=fract(p3*vec3(0.1031,0.11369,0.13787)); p3+=dot(p3,p3.yxz+19.19); return -1.0+2.0*fract(vec3(p3.x+p3.y,p3.x+p3.z,p3.y+p3.z)*p3.zyx); }

    float snoise3(vec3 p){
      const float K1=0.333333333, K2=0.166666667;
      vec3 i=floor(p+(p.x+p.y+p.z)*K1);
      vec3 d0=p-(i-(i.x+i.y+i.z)*K2);
      vec3 e=step(vec3(0.0), d0-d0.yzx);
      vec3 i1=e*(1.0-e.zxy);
      vec3 i2=1.0-e.zxy*(1.0-e);
      vec3 d1=d0-(i1-K2);
      vec3 d2=d0-(i2-K1);
      vec3 d3=d0-0.5;
      vec4 h=max(0.6-vec4(dot(d0,d0),dot(d1,d1),dot(d2,d2),dot(d3,d3)),0.0);
      vec4 n=h*h*h*h*vec4(
        dot(d0,hash33(i)),
        dot(d1,hash33(i+i1)),
        dot(d2,hash33(i+i2)),
        dot(d3,hash33(i+1.0))
      );
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 c){ float a=max(max(c.r,c.g),c.b); return vec4(c/(a+1e-5), a); }

    const vec3 baseColor1=vec3(0.611765,0.262745,0.996078);
    const vec3 baseColor2=vec3(0.298039,0.760784,0.913725);
    const vec3 baseColor3=vec3(0.062745,0.078431,0.600000);
    const float innerRadius=0.6;
    const float noiseScale=0.65;

    float light1(float i,float a,float d){ return i/(1.0+d*a); }
    float light2(float i,float a,float d){ return i/(1.0+d*d*a); }

    vec4 draw(vec2 uv){
      vec3 c1=adjustHue(baseColor1,hue);
      vec3 c2=adjustHue(baseColor2,hue);
      vec3 c3=adjustHue(baseColor3,hue);
      float ang=atan(uv.y,uv.x);
      float len=length(uv);
      float invLen = len>0.0?1.0/len:0.0;
      float n0=snoise3(vec3(uv*noiseScale,iTime*0.5))*0.5+0.5;
      float r0=mix(mix(innerRadius,1.0,0.4), mix(innerRadius,1.0,0.6), n0);
      float d0=distance(uv,(r0*invLen)*uv);
      float v0=light1(1.0,10.0,d0) * smoothstep(r0*1.05,r0,len);
      float cl=cos(ang+iTime*2.0)*0.5+0.5;
      float a=iTime*-1.0;
      vec2 pos=vec2(cos(a),sin(a))*r0;
      float d=distance(uv,pos);
      float v1=light2(1.5,5.0,d) * light1(1.0,50.0,d0);
      float v2=smoothstep(1.0, mix(innerRadius,1.0,n0*0.5), len);
      float v3=smoothstep(innerRadius, mix(innerRadius,1.0,0.5), len);

      vec3 col=mix(c1,c2,cl);
      col = mix(c3,col,v0);
      col = (col+v1)*v2*v3;
      col = clamp(col,0.0,1.0);
      return extractAlpha(col);
    }

    vec4 mainImage(vec2 fragCoord){
      vec2 center=iResolution.xy*0.5;
      float size=min(iResolution.x,iResolution.y);
      vec2 uv=(fragCoord-center)/size*2.0;

      float s=sin(rot), c=cos(rot);
      uv=vec2(c*uv.x - s*uv.y, s*uv.x + c*uv.y);

      uv.x += hover*hoverIntensity*0.1 * sin(uv.y*10.0 + iTime);
      uv.y += hover*hoverIntensity*0.1 * sin(uv.x*10.0 + iTime);
      return draw(uv);
    }

    void main(){
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w * dpr, h * dpr);
      gl.canvas.style.width = w + "px";
      gl.canvas.style.height = h + "px";
      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
    window.addEventListener("resize", resize);
    resize();

    let targetHover = 0;
    let last = 0;
    let rot = 0;
    const rotationSpeed = 0.3;

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.min(rect.width, rect.height);
      const uvx = ((x - rect.width / 2) / size) * 2.0;
      const uvy = ((y - rect.height / 2) / size) * 2.0;
      targetHover = Math.sqrt(uvx * uvx + uvy * uvy) < 0.8 ? 1 : 0;
    }
    function onLeave() {
      targetHover = 0;
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    let raf;
    function tick(t) {
      raf = requestAnimationFrame(tick);
      const dt = (t - last) * 0.001;
      last = t;

      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;

      const hvr = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value +=
        (hvr - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && hvr > 0.5) rot += dt * rotationSpeed;
      program.uniforms.rot.value = rot;

      renderer.render({ scene });
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return <div ref={ctnDom} className="orb-container" />;
}
