(this["webpackJsonpcom.anm.app"]=this["webpackJsonpcom.anm.app"]||[]).push([[0],{236:function(e,t,a){},237:function(e,t,a){},242:function(e,t,a){},244:function(e,t,a){},263:function(e,t){},265:function(e,t){},276:function(e,t){},278:function(e,t){},303:function(e,t){},305:function(e,t){},306:function(e,t){},311:function(e,t){},313:function(e,t){},319:function(e,t){},321:function(e,t){},340:function(e,t){},352:function(e,t){},355:function(e,t){},361:function(e,t){},363:function(e,t){},386:function(e,t){},477:function(e,t,a){},479:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(26),s=a.n(c),r=(a(236),a(7)),i=a(52),l=(a(237),a(486)),o=a(487),u=a(489),j=a.p+"static/media/regle-cras.38c0b4c7.png",d=function(e,t,a){return e>=t&&e<=a},b=a(1),m=function(e){var t=e.mapArray,a=e.amer,c=Object(n.useState)(!1),s=Object(r.a)(c,2),d=s[0],m=s[1],p=function(){return m(!1)},h=Object(n.useState)("0"),O=Object(r.a)(h,2),g=O[0],f=O[1],x=Object(n.useState)("200"),v=Object(r.a)(x,2),N=v[0],S=v[1],y=Object(n.useState)("0"),M=Object(r.a)(y,2),D=M[0],C=M[1],w=Object(n.useState)("0"),F=Object(r.a)(w,2),I=F[0],L=F[1],k=Object(n.useState)({x1:0,y1:0,r:0,angle:-90}),E=Object(r.a)(k,2),A=E[0],z=E[1],P=Object(n.useRef)(null);Object(n.useEffect)((function(){if(t.length){var e=P.current;e.height=256*t.length,e.width=256*t[0].length}}),[t]);var T=function(){var e=new Image;e.src=j,e.alt="alt text";var t=P.current.getContext("2d");e.onload=function(){t.save(),t.translate(A.x1,A.y1),t.rotate((g-90)*(Math.PI/180)),t.drawImage(e,-e.width/2,0),t.restore()}};Object(n.useEffect)((function(){z(Object(i.a)(Object(i.a)({},A),{},{angle:parseInt(g,10)+parseInt(D,10)+parseInt(I,10)-90}))}),[g]),Object(n.useEffect)((function(){z(Object(i.a)(Object(i.a)({},A),{},{r:N}))}),[N]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("canvas",{id:"canvas",ref:P,className:"canvas-style mt-5",onClick:function(e){return!!a&&function(e){m(!0);var t=P.current.getBoundingClientRect();z(Object(i.a)(Object(i.a)({},A),{},{x1:e.clientX-t.left,y1:e.clientY-t.top,r:N}))}(e)}}),Object(b.jsxs)(l.a,{show:d,onHide:p,size:"sm",centered:!0,children:[Object(b.jsx)(l.a.Header,{children:Object(b.jsx)(l.a.Title,{children:"Relever l'amer"})}),Object(b.jsxs)(l.a.Body,{children:[Object(b.jsx)(o.a.Label,{htmlFor:"angle",children:"Angle"}),Object(b.jsx)(o.a.Control,{className:"mb-2 mr-sm-2",id:"angle",value:g,onChange:function(e){return f(e.target.value)},type:"number",placeholder:"Angle"}),Object(b.jsx)(o.a.Label,{htmlFor:"longueur",children:"Longueur"}),Object(b.jsx)(o.a.Control,{className:"mb-2 mr-sm-2",id:"longueur",value:N,onChange:function(e){return S(e.target.value)},type:"number",placeholder:"Longueur"}),Object(b.jsx)(o.a.Label,{htmlFor:"declinaison",children:"D\xe9clinaison (D)"}),Object(b.jsx)(o.a.Control,{className:"mb-2 mr-sm-2",id:"declinaison",value:I,onChange:function(e){return L(e.target.value)},type:"number",placeholder:"D\xe9clinaison"}),Object(b.jsx)(o.a.Label,{htmlFor:"deviation",children:"D\xe9viation (d)"}),Object(b.jsx)(o.a.Control,{className:"mb-2 mr-sm-2",id:"deviation",value:D,onChange:function(e){return C(e.target.value)},type:"number",placeholder:"D\xe9viation"})]}),Object(b.jsxs)(l.a.Footer,{children:[Object(b.jsx)(u.a,{variant:"secondary",onClick:p,children:"Annuler"}),Object(b.jsx)(u.a,{variant:"primary",onClick:function(e){!function(){var e=P.current.getContext("2d");e.moveTo(A.x1,A.y1),e.lineTo(A.x1+A.r*Math.cos(Math.PI*A.angle/180),A.y1+A.r*Math.sin(Math.PI*A.angle/180)),e.stroke()}(),T(),p()},children:"Valider le marquage"})]})]})]})},p=(a(242),a(104)),h=function(e,t,a,n,c){return[parseInt((1-Math.asinh(Math.tan(t*(Math.PI/180)))/Math.PI)/2*Math.pow(2,e)),parseInt((a+180)/360*Math.pow(2,e)),parseInt((1-Math.asinh(Math.tan(n*(Math.PI/180)))/Math.PI)/2*Math.pow(2,e)),parseInt((c+180)/360*Math.pow(2,e))]},O=function(e,t,a,n,c){var s=t-n,r=a-c,i=t+n,l=a+c;return[parseInt((1-Math.asinh(Math.tan(s*(Math.PI/180)))/Math.PI)/2*Math.pow(2,e)),parseInt((r+180)/360*Math.pow(2,e)),parseInt((1-Math.asinh(Math.tan(i*(Math.PI/180)))/Math.PI)/2*Math.pow(2,e)),parseInt((l+180)/360*Math.pow(2,e))]},g=function(e,t,a,n){var c=parseInt(e.deg)+(60*e.min+parseInt(e.sec))/3600,s=parseInt(t.deg)+(60*t.min+parseInt(t.sec))/3600,r=parseInt(a.deg)+60*a.min/3600,i=parseInt(n.deg)+60*n.min/3600;return{decimalDegreLatitude:"S"===e.orientation?-c:c,decimalDegreLongitude:"O"===t.orientation?-s:s,decimalDegreLatitudeDistance:r,decimalDegreLongitudeDistance:i}},f=function(e,t,a,n){for(var c=t[0],s=t[1],r=t[2],i=t[3],l=c-r,o=i-s,u=Object(p.a)(Array(l+1)).map((function(){return Array(o+1)})),j=s;j<=i;++j)for(var d=r;d<=c;++d)u[d-r][j-s]=[a,j,d];return u};function x(e,t){var a=e<0?t?"O":"S":t?"E":"N",n=Math.abs(e),c=0|n,s=n-c,r=60*s|0,i=3600*s-60*r;return c+"\xb0"+r+"'"+(i=Math.round(100*i)/100)+'"'+a}var v=function(e){var t=e.mapArray,a=e.mapSettingsData,c=e.isStoredMap,s=e.storedMapName,r=Object(n.useRef)(null),i=Object(n.useRef)(null);return Object(b.jsxs)("div",{children:[Object(b.jsx)("table",{id:"map",ref:r,className:"mt-5",cellSpacing:"0",cellPadding:"0",style:{border:"none"},children:Object(b.jsx)("tbody",{children:t.map((function(e,n){return Object(b.jsx)("tr",{children:e.map((function(r,l){return l==e.length-1&&n==t.length-1&&function(e,t,a,n){var c=t.current.getContext("2d"),s=t.current,r=a.latitude,i=a.longitude,l=a.latitudeDistance,o=a.longitudeDistance,u=(a.zoom,i.deg,i.min,i.sec,i.orientation,g(r,i,l,o)),j=u.decimalDegreLatitude,d=u.decimalDegreLongitude,b=u.decimalDegreLatitudeDistance,m=u.decimalDegreLongitudeDistance,p=d-m,h=j+b;s.height=256*n.length,s.width=256*n[0].length;for(var O=256*n.length,f=256*n[0].length,v=p,N=0;N<f;N+=f/2/6)c.moveTo(N,0),c.lineTo(N,O),c.stroke(),c.font="15px Arial",c.fillText(x(v,!0),N,20),v+=m/6;var S=h;for(N=0;N<O;N+=O/2/6)c.moveTo(0,N),c.lineTo(f,N),c.stroke(),c.font="15px Arial",c.fillText(x(S,!1),10,N),S-=b/6}(0,i,a,t),Object(b.jsxs)("td",{className:"mapArrayCell",children:[Object(b.jsx)("img",{alt:"",src:c?"../../../cartes/".concat(s,"/openstreetmap/").concat(r[0],"_").concat(r[1],".png"):"https://a.tile.openstreetmap.fr/osmfr/".concat(r[0],"/").concat(r[1],"/").concat(r[2],".png")}),Object(b.jsx)("img",{alt:"",className:"overlayed",src:c?"../../../cartes/".concat(s,"/openseamap/").concat(r[0],"_").concat(r[1],".png"):"https://tiles.openseamap.org/seamark/".concat(r[0],"/").concat(r[1],"/").concat(r[2],".png")})]},l)}))},n)}))})}),Object(b.jsx)("canvas",{ref:i,className:"canvas-style-gaticule mt-5"})]})},N=a(484),S=a(488),y=a(485),M=a(67),D=a(68),C=(a(244),function(e){return Object(b.jsx)(N.a,{id:"button-tooltip",children:e})}),w=function(e){var t=e.setShowSettings,a=e.setShowLoadMap,n=e.amerState,c=Object(r.a)(n,2),s=c[0],i=c[1];return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(S.a,{sticky:"top",className:"navbar-dark",style:{position:"fixed",width:"100%"},bg:"dark",children:Object(b.jsxs)("div",{className:"topbar-container",children:[Object(b.jsx)("a",{className:"navbar-brand",href:"#",children:"\xa0\xa0Assistance Navigation Maritime"}),Object(b.jsx)(y.a,{placement:"bottom",overlay:C("G\xe9rer les coordonn\xe9es"),children:Object(b.jsx)(u.a,{variant:"primary",disabled:!navigator.onLine,onClick:navigator.onLine&&function(){return t(!0)},children:Object(b.jsx)(M.a,{icon:D.b,size:"lg"})})}),Object(b.jsx)(y.a,{placement:"bottom",overlay:C("Charger une carte"),children:Object(b.jsx)(u.a,{variant:"primary",className:"spacedButton",onClick:function(){return a(!0)},children:Object(b.jsx)(M.a,{icon:D.e,size:"lg"})})}),Object(b.jsx)(y.a,{placement:"bottom",overlay:C("Placer un amer"),children:Object(b.jsxs)(u.a,{variant:"primary",className:"spacedButton",onClick:function(){return i(!s)},children:[Object(b.jsx)(M.a,{icon:D.a,size:"lg"}),s?" ON":" OFF"]})}),Object(b.jsx)(y.a,{placement:"bottom",overlay:C("Tracer une route"),children:Object(b.jsx)(u.a,{variant:"primary",className:"spacedButton",children:Object(b.jsx)(M.a,{icon:D.c,size:"lg"})})}),Object(b.jsx)(y.a,{placement:"bottom",overlay:C("Aide"),children:Object(b.jsx)(u.a,{variant:"primary",className:"spacedButton",children:Object(b.jsx)(M.a,{icon:D.d,size:"lg"})})})]})})})},F=a(66),I=a.n(F),L=a(102),k=function(e){var t=e.show,a=e.setMapArray,c=e.mapNameState,s=e.savedMapsState,i=e.setMapSettingsData,o=e.setIsStoredMap,j=Object(r.a)(s,2),m=j[0],x=j[1],v=Object(r.a)(t,2),N=v[0],S=v[1],y=Object(r.a)(c,2),M=y[0],D=y[1],C=Object(n.useState)("47"),w=Object(r.a)(C,2),F=w[0],I=w[1],L=Object(n.useState)("25"),k=Object(r.a)(L,2),E=k[0],A=k[1],z=Object(n.useState)("0"),P=Object(r.a)(z,2),T=P[0],B=P[1],R=Object(n.useState)("N"),H=Object(r.a)(R,2),V=H[0],J=H[1],X=Object(n.useState)("2"),Y=Object(r.a)(X,2),_=Y[0],q=Y[1],G=Object(n.useState)("50"),W=Object(r.a)(G,2),Z=W[0],Q=W[1],U=Object(n.useState)("0"),K=Object(r.a)(U,2),$=K[0],ee=K[1],te=Object(n.useState)("O"),ae=Object(r.a)(te,2),ne=ae[0],ce=ae[1],se=Object(n.useState)("0"),re=Object(r.a)(se,2),ie=re[0],le=re[1],oe=Object(n.useState)("15"),ue=Object(r.a)(oe,2),je=ue[0],de=ue[1],be=Object(n.useState)("0"),me=Object(r.a)(be,2),pe=me[0],he=me[1],Oe=Object(n.useState)("15"),ge=Object(r.a)(Oe,2),fe=ge[0],xe=ge[1],ve=Object(n.useState)("13"),Ne=Object(r.a)(ve,2),Se=Ne[0],ye=Ne[1],Me=function(){return S(!1)};return Object(b.jsxs)(l.a,{show:N,onHide:Me,size:"lg",children:[Object(b.jsx)(l.a.Header,{children:Object(b.jsx)(l.a.Title,{children:"Gestion des coordonn\xe9es"})}),Object(b.jsxs)(l.a.Body,{children:[Object(b.jsx)("div",{className:"row g-3 align-items-end",noValidate:!0,children:Object(b.jsxs)("div",{className:"col",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"mapName",children:"Nom de la carte :"}),Object(b.jsx)("input",{className:"form-control",type:"text",id:"mapName",value:M,onChange:function(e){return D(e.target.value)}})]})}),Object(b.jsx)("hr",{className:"my-4"}),Object(b.jsxs)("div",{className:"row g-3 align-items-end",noValidate:!0,children:[Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latDeg",children:"Degr\xe9"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"latDeg",value:F,onChange:function(e){return d(e.target.value,-90,90)&&I(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"\xb0"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latMin",children:"Minutes"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"latMin",value:E,onChange:function(e){return d(e.target.value,0,60)&&A(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"'"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latSec",children:"Secondes"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"latSec",value:T,onChange:function(e){return d(e.target.value,0,60)&&B(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:'"'})})]})]}),Object(b.jsxs)("div",{className:"col-sm-2",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latitude",children:"Latitude"}),Object(b.jsxs)("div",{name:"latitude",className:"btn-group",role:"group","aria-label":"Basic radio toggle button group",children:[Object(b.jsx)("input",{className:"btn-check",type:"radio",id:"latRadioN",value:"N",autoComplete:"off",checked:"N"===V,onChange:function(e){return J(e.target.value)}}),Object(b.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"latRadioN",children:"Nord"}),Object(b.jsx)("input",{className:"btn-check",type:"radio",id:"latRadioS",value:"S",autoComplete:"off",checked:"S"===V,onChange:function(e){return J(e.target.value)}}),Object(b.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"latRadioS",children:"Sud"})]})]})]}),Object(b.jsx)("hr",{className:"my-4"}),Object(b.jsxs)("div",{className:"row g-3 align-items-end",noValidate:!0,children:[Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"lonDeg",children:"Degr\xe9"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"lonDeg",value:_,onChange:function(e){return d(e.target.value,-180,180)&&q(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"\xb0"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"lonMin",children:"Minutes"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"lonMin",value:Z,onChange:function(e){return d(e.target.value,0,60)&&Q(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"'"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"lonSec",children:"Secondes"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"lonSec",value:$,onChange:function(e){return d(e.target.value,0,60)&&ee(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:'"'})})]})]}),Object(b.jsxs)("div",{className:"col-sm-2",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latitude",children:"Longitude"}),Object(b.jsxs)("div",{className:"btn-group",name:"latitude",role:"group","aria-label":"Basic radio toggle button group",children:[Object(b.jsx)("input",{className:"btn-check",type:"radio",id:"lonRadioE",value:"E",autoComplete:"off",checked:"E"===ne,onChange:function(e){return ce(e.target.value)}}),Object(b.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"lonRadioE",children:"Est"}),Object(b.jsx)("input",{className:"btn-check",type:"radio",id:"lonRadioO",value:"O",autoComplete:"off",checked:"O"===ne,onChange:function(e){return ce(e.target.value)}}),Object(b.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"lonRadioO",children:"Ouest"})]})]})]}),Object(b.jsx)("hr",{className:"my-4"}),Object(b.jsxs)("div",{className:"row g-3 align-items-end",noValidate:!0,children:[Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latDistDeg",children:"Degr\xe9 latitude"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"latDistDeg",value:pe,onChange:function(e){return d(e.target.value,-180,180)&&he(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"\xb0"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"latDistMin",children:"Minutes latitude"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"latDistMin",value:fe,onChange:function(e){return d(e.target.value,0,60)&&xe(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"'"})})]})]})]}),Object(b.jsx)("hr",{className:"my-4"}),Object(b.jsxs)("div",{className:"row g-3 align-items-end",noValidate:!0,children:[Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"lonDistDeg",children:"Degr\xe9 longitude"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"lonDistDeg",value:ie,onChange:function(e){return d(e.target.value,-180,180)&&le(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"\xb0"})})]})]}),Object(b.jsxs)("div",{className:"col-sm",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"lonDistMin",children:"Minutes longitude"}),Object(b.jsxs)("div",{className:"input-group",children:[Object(b.jsx)("input",{className:"form-control",type:"number",id:"lonDistMin",value:je,onChange:function(e){return d(e.target.value,0,60)&&de(e.target.value)}}),Object(b.jsx)("span",{className:"input-group-text",children:Object(b.jsx)("b",{children:"'"})})]})]})]}),Object(b.jsx)("hr",{className:"my-4"}),Object(b.jsx)("div",{className:"row",children:Object(b.jsxs)("div",{className:"col",children:[Object(b.jsx)("label",{className:"form-label",htmlFor:"mapZoom",children:"Zoom :"}),Object(b.jsxs)("select",{className:"form-control",id:"mapZoom",value:Se,onChange:function(e){return ye(e.target.value)},children:[Object(b.jsx)("option",{value:"10",children:"1:500 000"}),Object(b.jsx)("option",{value:"11",children:"1:250 000"}),Object(b.jsx)("option",{value:"12",children:"1:150 000"}),Object(b.jsx)("option",{value:"13",children:"1:70 000"}),Object(b.jsx)("option",{value:"14",children:"1:35 000"}),Object(b.jsx)("option",{value:"15",children:"1:15 000"}),Object(b.jsx)("option",{value:"16",children:"1:8 000"}),Object(b.jsx)("option",{value:"17",children:"1:4 000"}),Object(b.jsx)("option",{value:"18",children:"1:2 000"})]})]})})]}),Object(b.jsxs)(l.a.Footer,{children:[Object(b.jsx)(u.a,{variant:"danger",onClick:Me,children:"Annuler"}),Object(b.jsx)(u.a,{variant:"success",onClick:function(){if(m.find((function(e){return e===M})))alert("Une carte poss\xe9dant ce nom existe d\xe9j\xe0");else{x([].concat(Object(p.a)(m),[M]));var e=function(e){var t=e.latitude,a=e.longitude,n=e.latitudeDistance,c=e.longitudeDistance,s=e.zoom,r=e.size,i=g(t,a,n,c),l=i.decimalDegreLatitude,o=i.decimalDegreLongitude,u=i.decimalDegreLatitudeDistance,j=i.decimalDegreLongitudeDistance,d=h(s,l,o,u,j),b=O(s,l,o,u,j);return f(d,b,s,r)}({latitude:{deg:F,min:E,sec:T,orientation:V},longitude:{deg:_,min:Z,sec:$,orientation:ne},longitudeDistance:{deg:ie,min:je},latitudeDistance:{deg:pe,min:fe},zoom:parseInt(Se)});o(!1),i({latitude:{deg:F,min:E,sec:T,orientation:V},longitude:{deg:_,min:Z,sec:$,orientation:ne},longitudeDistance:{deg:ie,min:je},latitudeDistance:{deg:pe,min:fe},zoom:parseInt(Se),name:M}),a(e),S(!1)}},children:"Valider"})]})]})},E=window.require("fs"),A=a(247),z=function(e){var t=e.show,a=e.mapArrayState,c=e.mapNameState,s=e.savedMapsState,i=e.isStoredMapState,j=e.storedMapState,d=e.mapSettingsDataState,m=Object(r.a)(i,2),p=m[0],h=m[1],O=Object(r.a)(c,2),g=O[0],f=(O[1],Object(r.a)(a,2)),x=f[0],v=f[1],N=Object(r.a)(t,2),S=N[0],y=N[1],M=Object(r.a)(s,2),D=M[0],C=(M[1],Object(r.a)(j,2)),w=(C[0],C[1]),F=Object(r.a)(d,2),k=F[0],z=F[1],P=Object(n.useState)(D?D[0]:""),T=Object(r.a)(P,2),B=T[0],R=T[1],H=function(){return y(!1)},V=function(e,t){A.head(e,(function(){A(e).pipe(E.createWriteStream(t))}))};Object(n.useEffect)((function(){p||x.map((function(e,t){e.map((function(e,a){V("https://a.tile.openstreetmap.fr/osmfr/".concat(e[0],"/").concat(e[1],"/").concat(e[2],".png"),"cartes/"+g+"/openstreetmap/"+t+"_"+a+".png"),V("https://tiles.openseamap.org/seamark/".concat(e[0],"/").concat(e[1],"/").concat(e[2],".png"),"cartes/"+g+"/openseamap/"+t+"_"+a+".png")}))}))}),[x]),Object(n.useEffect)((function(){(function(){var e=Object(L.a)(I.a.mark((function e(){var t,a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.length){e.next=11;break}return t="cartes/"+g+"/informations.txt",a="zoom="+x[0][0][0]+";latSize="+x.length+";lonSize="+x[0].length+";mapSettingsData="+JSON.stringify(k),e.next=5,E.mkdir("cartes/"+g,(function(){}));case 5:return e.next=7,E.mkdir("cartes/"+g+"/openstreetmap",(function(){}));case 7:return e.next=9,E.mkdir("cartes/"+g+"/openseamap",(function(){}));case 9:return e.next=11,E.writeFile(t,a,(function(){}));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[D]),Object(n.useEffect)((function(){R(D[0])}),[D]);return Object(b.jsxs)(l.a,{show:S,onHide:H,size:"lg",children:[Object(b.jsx)(l.a.Header,{children:Object(b.jsx)(l.a.Title,{children:"Charger une carte"})}),Object(b.jsx)(l.a.Body,{children:Object(b.jsx)(o.a,{children:Object(b.jsxs)(o.a.Group,{children:[Object(b.jsx)(o.a.Label,{children:"Nom"}),Object(b.jsxs)(o.a.Control,{disabled:!D.length,as:"select",value:B,onChange:function(e){return R(e.target.value)},children:[Object(b.jsx)("option",{selected:!0}),D.length&&D.map((function(e){return Object(b.jsx)("option",{value:e,children:e})}))]})]})})}),Object(b.jsxs)(l.a.Footer,{children:[Object(b.jsx)(u.a,{variant:"danger",onClick:H,children:"Annuler"}),Object(b.jsx)(u.a,{variant:"success",disabled:!D.length||!B,onClick:function(){if(B){w(B);var e="cartes/"+B+"/informations.txt";E.readFile(e,"utf8",(function(e,t){if(!e){var a=t.split(";")[1].split("=")[1],n=t.split(";")[2].split("=")[1];z(JSON.parse(t.split(";")[3].split("=")[1]));for(var c=[],s=0;s<=a-1;++s){c[s]=[];for(var r=0;r<=n-1;++r)c[s][r]=[s,r]}h(!0),v(c)}})),H()}},children:"Valider Carte"})]})]})},P=window.require("fs"),T=function(e){var t=e.settingsModal,a=e.loadMapModal,c=e.mapArrayState,s=e.isStoredMapState,i=e.mapSettingsDataState,l=e.mapNameState,o=e.storedMapState,u=Object(r.a)(l,2),j=u[0],d=u[1],m=Object(n.useState)([]),p=Object(r.a)(m,2),h=p[0],O=p[1],g=Object(r.a)(c,2),f=g[0],x=g[1],v=Object(r.a)(i,2),N=(v[0],v[1]),S=Object(n.useState)(!1),y=Object(r.a)(S,2),M=y[0],D=y[1];Object(n.useEffect)((function(){M||(function(){var e=Object(L.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,P.readdir("cartes/",(function(e,a){a.length&&a.forEach((function(e){t.push(e)}))}));case 3:O(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),D(!0))}),[M]);var C=Object(r.a)(s,2),w=(C[0],C[1]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(z,{show:a,mapArrayState:[f,x],isStoredMapState:s,mapNameState:[j,d],savedMapsState:[h,O],storedMapState:o,mapSettingsDataState:i}),Object(b.jsx)(k,{setMapSettingsData:N,show:t,setMapArray:x,mapNameState:[j,d],savedMapsState:[h,O],setIsStoredMap:w})]})},B=(a(477),function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(!1),i=Object(r.a)(s,2),l=i[0],o=i[1],u=Object(n.useState)([]),j=Object(r.a)(u,2),d=j[0],p=j[1],h=Object(n.useState)(!0),O=Object(r.a)(h,2),g=O[0],f=O[1],x=Object(n.useState)({}),N=Object(r.a)(x,2),S=N[0],y=N[1],M=Object(n.useState)("Baie de Quiberon"),D=Object(r.a)(M,2),C=D[0],F=D[1],I=Object(n.useState)(""),L=Object(r.a)(I,2),k=L[0],E=L[1],A=Object(n.useState)(!1),z=Object(r.a)(A,2),P=z[0],B=z[1],R=Object(n.useState)(!1),H=Object(r.a)(R,2),V=H[0],J=H[1];return Object(n.useEffect)((function(){var e=document.getElementById("dragMap");if(!V){var t=0,a=0,n=document.documentElement,c=function(c){var s=c.clientX-t,r=c.clientY-a;(e.offsetLeft>0&&s>0||n.scrollWidth===n.clientWidth&&s<0)&&(s=0),(e.offsetTop>0&&r>0||n.scrollHeight===n.clientHeight&&r<0)&&(r=0),e.style.top="".concat(e.offsetTop+r,"px"),e.style.left="".concat(e.offsetLeft+s,"px"),t=c.clientX,a=c.clientY},s=function t(){document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",t),e.style.cursor="grab",e.style.removeProperty("user-select")};J(!0),e.addEventListener("mousedown",(function(n){t=n.clientX,a=n.clientY,document.addEventListener("mousemove",c),document.addEventListener("mouseup",s),e.style.cursor="grabbing",e.style.userSelect="none"}))}})),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(w,{setShowSettings:c,setShowLoadMap:o,amerState:[P,B]}),Object(b.jsx)(T,{settingsModal:[a,c],loadMapModal:[l,o],isStoredMapState:[g,f],mapArrayState:[d,p],mapSettingsDataState:[S,y],mapNameState:[C,F],storedMapState:[k,E]}),Object(b.jsxs)("div",{id:"dragMap",className:"draggable",children:[Object(b.jsx)(v,{mapArray:d,isStoredMap:g,mapSettingsData:S,storedMapName:k}),Object(b.jsx)(m,{amer:P,mapArray:d})]})]})}),R=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,490)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))},H=(a(478),a(45)),V=a.n(H);console.log({fs:V.a});var J=function(){s.a.render(Object(b.jsx)(B,{}),document.getElementById("root"))};window.cordova?document.addEventListener("deviceready",(function(){J()}),!1):J(),R()}},[[479,1,2]]]);
//# sourceMappingURL=main.295dc014.chunk.js.map