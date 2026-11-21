F=require('fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',X=[0,0,-1,1],Y=[-1,1,0,0]
P=t=>{let w=t.indexOf('\n'),s=t.replace(/\n/g,''),W=new Uint8Array(s.length),G=[],B=[],p=-1
for(let i=0;i<s.length;i++){let c=s[i];W[i]=c=='#';if('.*+'.includes(c))G.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))p=i}
return{w,W,G,B:B.sort((a,b)=>a-b),p}}
R=(L,o,f,a,b,s,t)=>{let{w,W}=L,q=[f];if(a)a[f]=f;s[f]=t;let l=f
for(let i=0;i<q.length;i++){let p=q[i];if(p<l)l=p;for(let k=0;k<4;k++){let n=p+Y[k]*w+X[k];if(W[n]||o[n]||KB[n]||s[n]==t)continue;s[n]=t;if(a)a[n]=p;if(b)b[n]='udlr'[k];q.push(n)}}
return l}
S=(B,G,p,K)=>{let{w,W}=L,n=W.length;KB=K
let o=new Uint8Array(n),s=new Int32Array(n),s2=new Int32Array(n),a=new Int32Array(n),b=new Array(n),t=0,t2=0
let k=(x,l)=>l+':'+x.join(','),e=x=>x.every(y=>G.includes(y))
let Q=[[B.slice(),p,'']]
for(let x of B)o[x]=1
let J=new Set([k(B,R(L,o,p,a,b,s,++t))])
for(let x of B)o[x]=0
let h=0
if(e(B))return['',p]
while(h<Q.length){let[bs,pl,mv]=Q[h];h++
if(Q.length>250e3)return null
for(let x of bs)o[x]=1
R(L,o,pl,a,b,s,++t)
let hr=t
for(let bi=0;bi<bs.length;bi++){let x=bs[bi]
for(let j=0;j<4;j++){let d=Y[j]*w+X[j],y=x+d,ps=x-d
if(s[ps]!==hr||W[y]||o[y]||K[y])continue
o[x]=0;o[y]=1
let wk='',nb=bs.slice();nb[bi]=y;nb.sort((p,q)=>p-q)
for(let p=ps;p!==pl;p=a[p])wk=b[p]+wk
let kk=k(nb,R(L,o,x,0,0,s2,++t2))
o[y]=0;o[x]=1
if(J.has(kk))continue
J.add(kk)
let nm=mv+wk+'UDLR'[j]
if(e(nb))return[nm,x]
Q.push([nb,x,nm])}}
for(let x of bs)o[x]=0}
return null}
Z=t=>{L=P(t);let r=L.p/L.w|0,R2={}
let K=x=>((x/L.w|0)<r?0:2)+((x%L.w-1)/7|0)
for(let x of L.B){let k=K(x);(R2[k]=R2[k]||{B:[],G:[]}).B.push(x)}
for(let x of L.G){let k=K(x);(R2[k]=R2[k]||{B:[],G:[]}).G.push(x)}
let z=Object.values(R2).filter(q=>q.B.length>0)
if(!z.length||z.some(q=>q.B.length!==q.G.length)){let s=S(L.B,L.G,L.p,new Uint8Array(L.W.length));return s?s[0]:null}
let p=L.p,m=''
for(let o of z){let K2=new Uint8Array(L.W.length)
for(let u of z){if(u===o)continue;for(let x of u.done?u.G:u.B)K2[x]=1}
let s=S(o.B.slice().sort((a,b)=>a-b),o.G.slice().sort((a,b)=>a-b),p,K2)
if(!s)return null
m+=s[0];p=s[1];o.done=1}
return m}
for(let id of F.readdirSync(I).sort()){let m=''
try{let r=Z(F.readFileSync(I+'/'+id+'/level.txt','utf8'));m=r||''}catch(e){}
F.mkdirSync(O+'/'+id,{recursive:true})
F.writeFileSync(O+'/'+id+'/solution.txt',m.toLowerCase()+'\n')}
