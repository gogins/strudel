"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("react"),ue=require("@uiw/react-codemirror"),y=require("@codemirror/view"),V=require("@codemirror/state"),de=require("@codemirror/lang-javascript"),d=require("@lezer/highlight"),fe=require("@uiw/codemirror-themes"),T=require("@strudel.cycles/webaudio"),ge=require("react-hook-inview"),X=require("@strudel.cycles/core"),me=require("@strudel.cycles/transpiler"),Y=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},f=Y(t),he=Y(ue),pe=fe.createTheme({theme:"dark",settings:{background:"#222",foreground:"#75baff",caret:"#ffcc00",selection:"rgba(128, 203, 196, 0.5)",selectionMatch:"#036dd626",lineHighlight:"#00000050",gutterBackground:"transparent",gutterForeground:"#8a919966"},styles:[{tag:d.tags.keyword,color:"#c792ea"},{tag:d.tags.operator,color:"#89ddff"},{tag:d.tags.special(d.tags.variableName),color:"#eeffff"},{tag:d.tags.typeName,color:"#c3e88d"},{tag:d.tags.atom,color:"#f78c6c"},{tag:d.tags.number,color:"#c3e88d"},{tag:d.tags.definition(d.tags.variableName),color:"#82aaff"},{tag:d.tags.string,color:"#c3e88d"},{tag:d.tags.special(d.tags.string),color:"#c3e88d"},{tag:d.tags.comment,color:"#7d8799"},{tag:d.tags.variableName,color:"#c792ea"},{tag:d.tags.tagName,color:"#c3e88d"},{tag:d.tags.bracket,color:"#525154"},{tag:d.tags.meta,color:"#ffcb6b"},{tag:d.tags.attributeName,color:"#c792ea"},{tag:d.tags.propertyName,color:"#c792ea"},{tag:d.tags.className,color:"#decb6b"},{tag:d.tags.invalid,color:"#ffffff"}]});const W=V.StateEffect.define(),ve=V.StateField.define({create(){return y.Decoration.none},update(e,o){try{for(let r of o.effects)if(r.is(W))if(r.value){const n=y.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=y.Decoration.set([n.range(0,o.newDoc.length)])}else e=y.Decoration.set([]);return e}catch(r){return console.warn("flash error",r),e}},provide:e=>y.EditorView.decorations.from(e)}),Z=e=>{e.dispatch({effects:W.of(!0)}),setTimeout(()=>{e.dispatch({effects:W.of(!1)})},200)},z=V.StateEffect.define(),be=V.StateField.define({create(){return y.Decoration.none},update(e,o){try{for(let r of o.effects)if(r.is(z)){const n=r.value.map(c=>(c.context.locations||[]).map(({start:m,end:l})=>{const s=c.context.color||"#FFCA28";let i=o.newDoc.line(m.line).from+m.column,p=o.newDoc.line(l.line).from+l.column;const E=o.newDoc.length;return i>E||p>E?void 0:y.Decoration.mark({attributes:{style:`outline: 1.5px solid ${s};`}}).range(i,p)})).flat().filter(Boolean)||[];e=y.Decoration.set(n,!0)}return e}catch{return y.Decoration.set([])}},provide:e=>y.EditorView.decorations.from(e)}),Ee=[de.javascript(),pe,be,ve];function ee({value:e,onChange:o,onViewChanged:r,onSelectionChange:n,options:c,editorDidMount:m}){const l=t.useCallback(p=>{o?.(p)},[o]),s=t.useCallback(p=>{r?.(p)},[r]),i=t.useCallback(p=>{p.selectionSet&&n&&n?.(p.state.selection)},[n]);return f.default.createElement(f.default.Fragment,null,f.default.createElement(he.default,{value:e,onChange:l,onCreateEditor:s,onUpdate:i,extensions:Ee}))}function $(...e){return e.filter(Boolean).join(" ")}function te({view:e,pattern:o,active:r,getTime:n}){const c=t.useRef([]),m=t.useRef(0);t.useEffect(()=>{if(e)if(o&&r){m.current=0;let l=requestAnimationFrame(function s(){try{const i=n(),E=[Math.max(m.current??i,i-1/10,-.01),i+1/60];m.current=E[1],c.current=c.current.filter(h=>h.whole.end>i);const u=o.queryArc(...E).filter(h=>h.hasOnset());c.current=c.current.concat(u),e.dispatch({effects:z.of(c.current)})}catch{e.dispatch({effects:z.of([])})}l=requestAnimationFrame(s)});return()=>{cancelAnimationFrame(l)}}else c.current=[],e.dispatch({effects:z.of([])})},[o,r,e])}function ye(e,o=!1){const r=t.useRef(),n=t.useRef(),c=s=>{if(n.current!==void 0){const i=s-n.current;e(s,i)}n.current=s,r.current=requestAnimationFrame(c)},m=()=>{r.current=requestAnimationFrame(c)},l=()=>{r.current&&cancelAnimationFrame(r.current),delete r.current};return t.useEffect(()=>{r.current&&(l(),m())},[e]),t.useEffect(()=>(o&&m(),l),[]),{start:m,stop:l}}function we({pattern:e,started:o,getTime:r,onDraw:n,drawTime:c=[-2,2]}){let[m,l]=c;m=Math.abs(m);let s=t.useRef([]),i=t.useRef(null);t.useEffect(()=>{if(e){const u=r(),h=e.queryArc(Math.max(u,0),u+l+.1);s.current=s.current.filter(b=>b.whole.begin<u),s.current=s.current.concat(h)}},[e]);const{start:p,stop:E}=ye(t.useCallback(()=>{const u=r()+l;if(i.current===null){i.current=u;return}const h=e.queryArc(Math.max(i.current,u-1/10),u);i.current=u,s.current=(s.current||[]).filter(b=>b.whole.end>=u-m-l).concat(h.filter(b=>b.hasOnset())),n(e,u-l,s.current,c)},[e]));return t.useEffect(()=>{o?p():(s.current=[],E())},[o]),{clear:()=>{s.current=[]}}}function re(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(o=>window.postMessage(o,"*"),[])}function oe({defaultOutput:e,interval:o,getTime:r,evalOnMount:n=!1,initialCode:c="",autolink:m=!1,beforeEval:l,editPattern:s,afterEval:i,onEvalError:p,onToggle:E,canvasId:u,drawContext:h,drawTime:b=[-2,2]}){const _=t.useMemo(()=>ke(),[]);u=u||`canvas-${_}`;const[S,A]=t.useState(),[D,N]=t.useState(),[w,F]=t.useState(c),[L,O]=t.useState(),[C,x]=t.useState(),[R,H]=t.useState(!1),j=w!==L,{scheduler:a,evaluate:v,start:J,stop:P,pause:ne}=t.useMemo(()=>X.repl({interval:o,defaultOutput:e,onSchedulerError:A,onEvalError:g=>{N(g),p?.(g)},getTime:r,drawContext:h,transpiler:me.transpiler,editPattern:s,beforeEval:({code:g})=>{F(g),l?.()},afterEval:({pattern:g,code:k})=>{O(k),x(g),N(),A(),m&&(window.location.hash="#"+encodeURIComponent(btoa(k))),i?.()},onToggle:g=>{H(g),E?.(g)}}),[e,o,r]),ae=re(({data:{from:g,type:k}})=>{k==="start"&&g!==_&&P()}),B=t.useCallback(async(g=!0)=>{const k=await v(w,g);return ae({type:"start",from:_}),k},[v,w]),q=t.useCallback((g,k,K,U)=>{const{onPaint:le}=g.context||{},ie=typeof h=="function"?h(u):h;le?.(ie,k,K,U)},[h,u]),I=t.useCallback(g=>{if(h&&q){const[k,K]=b,U=g.queryArc(0,K);q(g,-.001,U,b)}},[b,q]),G=t.useRef();t.useEffect(()=>{!G.current&&h&&q&&n&&w&&(G.current=!0,v(w,!1).then(g=>I(g)))},[B,n,w,I]),t.useEffect(()=>()=>{a.stop()},[a]);const se=async()=>{R?(a.stop(),I(C)):await B()},ce=S||D;return we({pattern:C,started:h&&R,getTime:()=>a.now(),drawTime:b,onDraw:q}),{id:_,canvasId:u,code:w,setCode:F,error:ce,schedulerError:S,scheduler:a,evalError:D,evaluate:v,activateCode:B,activeCode:L,isDirty:j,pattern:C,started:R,start:J,stop:P,pause:ne,togglePlay:se}}function ke(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}function Q({type:e}){return f.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:f.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:f.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:f.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"}),stop:f.default.createElement("path",{fillRule:"evenodd",d:"M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z",clipRule:"evenodd"})}[e])}const _e="_container_3i85k_1",Me="_header_3i85k_5",Ce="_buttons_3i85k_9",Fe="_button_3i85k_9",De="_buttonDisabled_3i85k_17",Re="_error_3i85k_21",qe="_body_3i85k_25",M={container:_e,header:Me,buttons:Ce,button:Fe,buttonDisabled:De,error:Re,body:qe},Se=()=>T.getAudioContext().currentTime;function Ae({tune:e,hideOutsideView:o=!1,enableKeyboard:r,drawTime:n,punchcard:c,canvasHeight:m=200}){n=n||(c?[0,4]:void 0);const{code:l,setCode:s,evaluate:i,activateCode:p,error:E,isDirty:u,activeCode:h,pattern:b,started:_,scheduler:S,togglePlay:A,stop:D,canvasId:N,id:w}=oe({initialCode:e,defaultOutput:T.webaudioOutput,editPattern:a=>c?a.punchcard():a,getTime:Se,evalOnMount:!!n,drawContext:n?a=>document.querySelector("#"+a)?.getContext("2d"):null,drawTime:n}),[F,L]=t.useState(),[O,C]=ge.useInView({threshold:.01}),x=t.useRef(),R=t.useMemo(()=>((C||!o)&&(x.current=!0),C||x.current),[C,o]);te({view:F,pattern:b,active:_&&!h?.includes("strudel disable-highlighting"),getTime:()=>S.now()}),t.useLayoutEffect(()=>{if(r){const a=async v=>{(v.ctrlKey||v.altKey)&&(v.code==="Enter"?(v.preventDefault(),Z(F),await p()):v.code==="Period"&&(D(),v.preventDefault()))};return window.addEventListener("keydown",a,!0),()=>window.removeEventListener("keydown",a,!0)}},[r,b,l,i,D,F]);const[H,j]=t.useState([]);return Ne(t.useCallback(a=>{const{data:v}=a.detail;v?.hap?.context?.id===w&&j(P=>P.concat([a.detail]).slice(-10))},[])),f.default.createElement("div",{className:M.container,ref:O},f.default.createElement("div",{className:M.header},f.default.createElement("div",{className:M.buttons},f.default.createElement("button",{className:$(M.button,_?"sc-animate-pulse":""),onClick:()=>A()},f.default.createElement(Q,{type:_?"stop":"play"})),f.default.createElement("button",{className:$(u?M.button:M.buttonDisabled),onClick:()=>p()},f.default.createElement(Q,{type:"refresh"}))),E&&f.default.createElement("div",{className:M.error},E.message)),f.default.createElement("div",{className:M.body},R&&f.default.createElement(ee,{value:l,onChange:s,onViewChanged:L})),n&&f.default.createElement("canvas",{id:N,className:"w-full pointer-events-none",height:m,ref:a=>{a&&a.width!==a.clientWidth&&(a.width=a.clientWidth)}}),!!H.length&&f.default.createElement("div",{className:"sc-bg-gray-800 sc-rounded-md sc-p-2"},H.map(({message:a},v)=>f.default.createElement("div",{key:v},a))))}function Ne(e){Le(X.logger.key,e)}function Le(e,o,r=!1){t.useEffect(()=>(document.addEventListener(e,o,r),()=>{document.removeEventListener(e,o,r)}),[o])}const xe=e=>t.useLayoutEffect(()=>(window.addEventListener("keydown",e,!0),()=>window.removeEventListener("keydown",e,!0)),[e]);exports.CodeMirror=ee;exports.MiniRepl=Ae;exports.cx=$;exports.flash=Z;exports.useHighlighting=te;exports.useKeydown=xe;exports.usePostMessage=re;exports.useStrudel=oe;
