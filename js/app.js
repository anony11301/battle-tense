/* Battle Tense: logika game, koneksi 3 perangkat, dan tampilan. Bank soal ada di questions.js */
(function(){
'use strict';

var DMG={e:5,m:10,h:20}, DLAB={e:'MUDAH',m:'SEDANG',h:'SULIT'};
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
QS.forEach(function(q,i){var R=mulberry(i*2654435761+97),ix=[0,1,2,3];for(var k=3;k>0;k--){var j=Math.floor(R()*(k+1));var t=ix[k];ix[k]=ix[j];ix[j]=t}q.opts=ix.map(function(k){return q.o[k]});q.a=ix.indexOf(0)});
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}

/* ---------- util ---------- */
function $(s){return document.querySelector(s)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var LET=['A','B','C','D'];

/* ---------- suara 8-bit ---------- */
var AC=null,muted=false;
function ac(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume()}catch(e){}return AC}
function tone(f,d,type,v,delay,f2){if(muted)return;var c=ac();if(!c)return;try{var t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03)}catch(e){}}
var SFX={
  hit:function(){tone(240,.14,'sawtooth',.07,0,70);tone(700,.1,'square',.05,.04,1000)},
  tap:function(){tone(660,.06,'square',.04)},
  lock:function(){tone(150,.3,'square',.05,0,80)},
  next:function(){tone(520,.07,'square',.04);tone(780,.09,'square',.04,.08)},
  win:function(){[523,659,784,1047,784,1047].forEach(function(f,i){tone(f,.16,'square',.05,i*.13)})}
};

/* ---------- sprite kesatria 16x19 ---------- */
var SPR=[
'......PP........',
'.....PPPP.......',
'....KKKKK....Ww.',
'...KHHHHhK...Ww.',
'...KHHHHhK...Ww.',
'...KHVVVVK...Ww.',
'...KHSSSSK...Ww.',
'....KKKKK....Ww.',
'...KAAAAAAK..Ww.',
'..KAhAAAAaAK.GGG',
'..KAAAAAAaAKKS..',
'...KAAAAAAK.....',
'...KGGGGGGK.....',
'...KAAAAAAK.....',
'....KLLKLLK.....',
'....KLLKLLK.....',
'....KLLKLLK.....',
'...KBBBKBBBK....',
'...KKKKKKKKK....'];
var PAL={
  common:{K:'#12101f',V:'#14142a',S:'#f2c394',W:'#f4f7ff',w:'#a9b4d6',G:'#e9b949',L:'#4a4f6b',B:'#6b4423'},
  0:{H:'#5a8dff',h:'#9bbcff',A:'#3f78f0',a:'#274fb3',P:'#ffd23f'},
  1:{H:'#f05a5f',h:'#ff9a9d',A:'#d63c43',a:'#9a2229',P:'#ffd23f'}
};
function drawKnight(cv,team){
  var x=cv.getContext('2d'),p=Object.assign({},PAL.common,PAL[team]);x.clearRect(0,0,16,19);
  SPR.forEach(function(row,y){for(var i=0;i<16;i++){var c=row[i];if(c&&c!=='.'&&p[c]){x.fillStyle=p[c];x.fillRect(i,y,1,1)}}});
}
function drawBg(cv){
  var x=cv.getContext('2d'),W=128,H=64,R=mulberry(7);
  var bands=['#1a1646','#221b57','#2c2068','#3a2576','#4d2b82','#69338a','#8c3f8c','#b74f84','#e0656f'];
  for(var y=0;y<48;y++){x.fillStyle=bands[Math.min(bands.length-1,Math.floor(y/48*bands.length))];x.fillRect(0,y,W,1)}
  x.fillStyle='#fff';for(var s=0;s<34;s++){var sx=Math.floor(R()*W),sy=Math.floor(R()*24);x.globalAlpha=.4+R()*.6;x.fillRect(sx,sy,1,1)}x.globalAlpha=1;
  x.fillStyle='#fff3c4';[[99,8,6],[98,9,8],[97,10,10],[97,11,10],[97,12,10],[97,13,10],[98,14,8],[99,15,6]].forEach(function(r){x.fillRect(r[0],r[1],r[2],1)});
  x.fillStyle='#e6d79b';x.fillRect(101,11,2,2);x.fillRect(104,14,1,1);
  x.fillStyle='#3a2562';for(var i=0;i<W;i++){var h=6+Math.round(5*Math.sin(i/9)+3*Math.sin(i/3.7));x.fillRect(i,40-h,1,h+8)}
  x.fillStyle='#241748';for(i=0;i<W;i++){var h2=4+Math.round(3*Math.sin(i/6+2)+2*Math.sin(i/2.3));x.fillRect(i,44-h2,1,h2+4)}
  var C='#150f30';x.fillStyle=C;
  x.fillRect(52,22,24,26);x.fillRect(48,16,8,32);x.fillRect(72,16,8,32);x.fillRect(58,12,12,12);
  [48,52,56,60,64,68,72,76].forEach(function(cx,k){x.fillRect(cx,(k===0||k===7)?13:(k<2||k>5?19:9),2,3)});
  [[58,10],[62,10],[66,10]].forEach(function(c){x.fillRect(c[0],c[1],2,2)});
  x.fillRect(63,6,1,6);x.fillStyle='#ff5a5f';x.fillRect(64,6,4,2);
  x.fillStyle='#ffd23f';[[51,22],[75,22],[63,16],[66,16],[60,30],[68,30],[63,38],[64,38]].forEach(function(w){x.fillRect(w[0],w[1],1,2)});
  x.fillStyle='#0b0820';x.fillRect(60,38,8,10);x.fillStyle='#150f30';x.fillRect(61,36,6,2);
  /* tanah */
  x.fillStyle='#3d7a46';x.fillRect(0,48,W,2);x.fillStyle='#2b5a35';x.fillRect(0,50,W,1);
  for(var gy=51;gy<H;gy++){x.fillStyle=((gy-51)%6<5)?'#4a4766':'#35324f';x.fillRect(0,gy,W,1)}
  x.fillStyle='#35324f';for(var r=0;r<3;r++){var oy=51+r*6;for(var bx=(r%2?4:0);bx<W;bx+=8){x.fillRect(bx,oy,1,6)}}
  x.fillStyle='#5a5880';x.fillRect(0,51,W,1);
  x.fillStyle='#4f9a58';for(i=0;i<W;i+=3){if(R()>.5)x.fillRect(i,47,1,1)}
}

/* ---------- state ---------- */
var role=null,code='',room=null,st=null,hostSt=null,peers=[],myNm='',done={},mine={r:-1,c:-1};
var timer=null,lastSq=null,lastPh='',sig='',confirmReset=false,offT=null,unsubs=[];

function freshState(nm){var deck=shuffle(QS.map(function(_,i){return i}));return {ph:'lobby',r:Math.floor(Date.now()/1000),n:0,pos:0,q:deck[0],deck:deck,hp:[100,100],nm:nm||['Kelompok A','Kelompok B'],lk:[0,0],at:-1,dm:0,w:-1,sq:0,v:0}}
function teamIdx(r){return r==='A'?0:r==='B'?1:-1}
function teamInfo(i){for(var k=0;k<peers.length;k++){var p=peers[k];if(p.isMe)continue;var pr=p.presence||{};if(teamIdx(pr.role)===i)return pr}return null}

/* ---------- host: logika game ---------- */
function save(){try{sessionStorage.setItem('bt_host_'+code,JSON.stringify(st))}catch(e){}}
function publish(){st.v++;save();if(room)room.presence({st:JSON.parse(JSON.stringify(st))}).catch(function(){})}
function startGame(keepNm){clearTimeout(timer);var nm=keepNm||st.nm;st=freshState(nm);st.ph='q';st.n=1;publish();SFX.next()}
function nextRound(){clearTimeout(timer);st.pos++;if(st.pos>=st.deck.length){st.deck=shuffle(QS.map(function(_,i){return i}));st.pos=0}
  st.q=st.deck[st.pos];st.r++;st.n++;st.lk=[0,0];st.at=-1;st.dm=0;st.ph='q';publish();SFX.next()}
function doHit(t){var Q=QS[st.q],dm=DMG[Q.d],def=1-t,hp=st.hp.slice();hp[def]=Math.max(0,hp[def]-dm);st.hp=hp;st.ph='hit';st.at=t;st.dm=dm;st.sq++;publish();
  clearTimeout(timer);timer=setTimeout(hp[def]<=0?function(){st.ph='over';st.w=t;publish()}:nextRound,hp[def]<=0?3600:4800)}
function doMiss(){st.ph='miss';publish();clearTimeout(timer);timer=setTimeout(nextRound,4200)}
function hostTick(){
  if(!st)return;
  if(st.ph==='lobby'){
    var n=[0,1].map(function(i){var p=teamInfo(i);return(p&&p.nm)?String(p.nm).slice(0,18):('Kelompok '+(i?'B':'A'))});
    if(n[0]!==st.nm[0]||n[1]!==st.nm[1]){st.nm=n;publish()}
    return;
  }
  if(st.ph!=='q')return;
  var Q=QS[st.q],cand=[];
  peers.forEach(function(p){
    if(p.isMe)return;var pr=p.presence||{},t=teamIdx(pr.role);if(t<0||!pr.ans||pr.ans.r!==st.r)return;
    var key=p.peer+':'+pr.ans.r;if(done[key])return;cand.push({t:t,key:key,c:pr.ans.c,at:pr.ans.t||0});
  });
  if(!cand.length)return;
  cand.sort(function(a,b){return a.at-b.at});
  for(var i=0;i<cand.length;i++){
    var a=cand[i];done[a.key]=1;if(st.lk[a.t])continue;
    if(a.c===Q.a){doHit(a.t);return}
    var lk=st.lk.slice();lk[a.t]=1;st.lk=lk;
  }
  if(st.lk[0]&&st.lk[1])doMiss();else publish();
}

/* ---------- koneksi ---------- */
async function enter(r,c,nm){
  var errEl=$('#err');errEl.textContent='';
  var R=window.BTNet||null;
  if(!R){errEl.textContent='Pustaka koneksi gagal dimuat. Periksa internet lalu muat ulang halaman.';return false}
  try{room=await R.join('bt-'+c.toLowerCase())}catch(e){errEl.textContent='Gagal terhubung ke server game. Periksa internet lalu coba lagi.';return false}
  role=r;code=c;myNm=nm||'';peers=[];hostSt=null;st=null;done={};mine={r:-1,c:-1};lastSq=null;lastPh='';sig='';
  unsubs.push(room.onPeers(function(ch){peers=ch.peers;if(role==='host')hostTick();else{var h=null;peers.forEach(function(p){if(!h&&!p.isMe&&p.presence&&p.presence.role==='host')h=p});hostSt=h&&h.presence.st||null}paint()}));
  unsubs.push(room.onConnection(function(ok){clearTimeout(offT);if(ok){$('#conn').hidden=true}else{offT=setTimeout(function(){$('#conn').hidden=false},2000)}}));
  if(role==='host'){
    var s=null;try{s=JSON.parse(sessionStorage.getItem('bt_host_'+code)||'null')}catch(e){}
    st=s&&s.deck?s:freshState();if(s&&s.deck&&s.ph==='hit')st.ph='q';
    publish();
  }else{
    room.presence({role:role,nm:myNm||('Kelompok '+role)}).catch(function(){});
  }
  try{sessionStorage.setItem('bt_sess',JSON.stringify({role:role,code:code,nm:myNm}))}catch(e){}
  $('#landing').hidden=true;$('#game').hidden=false;
  $('#who').textContent=role==='host'?'GURU  KODE '+code:'KELOMPOK '+role;
  $('#who').className='chip '+(role==='A'?'a':role==='B'?'b':'');
  buildCtl();paint();return true;
}
async function leave(){
  unsubs.forEach(function(u){try{u()}catch(e){}});unsubs=[];
  clearTimeout(timer);
  try{if(room)await room.leave()}catch(e){}
  room=null;role=null;st=null;hostSt=null;
  try{sessionStorage.removeItem('bt_sess')}catch(e){}
  $('#game').hidden=true;$('#landing').hidden=false;
}

/* ---------- tampilan ---------- */
function setHp(i,hp){
  var f=$(i?'#fB':'#fA'),g=$(i?'#gB':'#gA'),h=$(i?'#hB':'#hA');
  f.style.width=hp+'%';g.style.width=hp+'%';f.className='fill'+(hp<=25?' lo':hp<=50?' mid':'');h.textContent='HP '+hp+'%';
}
function fighterEl(i){return $(i?'.fB':'.fA')}
function pop(def,text){
  var fx=$('#fx'),d=document.createElement('div');d.className='pop';d.textContent=text;d.style.left=(def?78:22)+'%';fx.appendChild(d);
  var s=document.createElement('div');s.className='slash';s.style.left=(def?78:22)+'%';fx.appendChild(s);
  setTimeout(function(){d.remove();s.remove()},1200);
}
function playHit(v){
  var t=v.at,def=1-t,A=fighterEl(t),D=fighterEl(def),ar=$('#arena');
  A.classList.remove('lunge');void A.offsetWidth;A.classList.add('lunge');
  setTimeout(function(){
    D.classList.remove('hurt');void D.offsetWidth;D.classList.add('hurt');
    ar.classList.remove('shake');void ar.offsetWidth;ar.classList.add('shake');
    pop(def,'-'+v.dm+'%');SFX.hit();
    if(v.hp[def]<=0)setTimeout(function(){D.classList.add('ko')},500);
  },260);
}
function confetti(){
  var fx=$('#fx'),cols=['#ffd23f','#4f9dff','#ff5a5f','#4ade80','#fff'];
  for(var i=0;i<46;i++){var c=document.createElement('i');c.className='conf';c.style.left=(Math.random()*100)+'%';c.style.background=cols[i%cols.length];c.style.animationDuration=(2.2+Math.random()*2)+'s';c.style.animationDelay=(Math.random()*1.2)+'s';fx.appendChild(c);(function(e){setTimeout(function(){e.remove()},5600)})(c)}
}
function qHtml(q){return esc(q).replace(/___/g,'<span class="blank">____</span>')}

function paint(){
  if($('#game').hidden)return;
  var v=role==='host'?st:hostSt;
  var me=teamIdx(role);
  /* nama & titik online */
  var nm=v?v.nm:['Kelompok A','Kelompok B'];
  $('#nmA').textContent=nm[0];$('#nmB').textContent=nm[1];
  $('#dotA').className='dot'+((role==='host'?teamInfo(0):role==='A'?true:null)?' on':'');
  $('#dotB').className='dot'+((role==='host'?teamInfo(1):role==='B'?true:null)?' on':'');
  var panel=$('#panel');
  if(!v){
    setHp(0,100);setHp(1,100);$('#banner').classList.remove('on');
    var s0='wait';if(sig!==s0){sig=s0;panel.innerHTML='<div class="center"><p class="note wait">Menunggu guru membuka game dengan kode <b>'+esc(code)+'</b>...</p></div>'}
    return;
  }
  setHp(0,v.hp[0]);setHp(1,v.hp[1]);
  /* animasi serangan */
  if(lastSq===null)lastSq=v.sq;
  if(v.sq!==lastSq){lastSq=v.sq;if(v.ph==='hit')playHit(v)}
  /* reset KO ketika game baru */
  if(v.ph!=='hit'&&v.ph!=='over'){fighterEl(0).classList.remove('ko');fighterEl(1).classList.remove('ko')}
  if(v.ph==='over'&&lastPh!=='over'){confetti();SFX.win()}
  lastPh=v.ph;
  var bn=$('#banner');
  if(v.ph==='over'){bn.classList.add('on');$('#bnT').textContent=nm[v.w]+' MENANG!';$('#bnS').textContent=nm[1-v.w]+' kehabisan HP'}
  else if(v.ph==='lobby'){bn.classList.add('on');$('#bnT').textContent='SIAP BERTARUNG?';$('#bnS').textContent=role==='host'?'Kode game '+code:'Menunggu guru memulai'}
  else bn.classList.remove('on');

  var hostPicks=[-1,-1];
  if(role==='host'&&v.ph!=='lobby'){peers.forEach(function(p){if(p.isMe)return;var pr=p.presence||{},t=teamIdx(pr.role);if(t>=0&&pr.ans&&pr.ans.r===v.r&&hostPicks[t]<0)hostPicks[t]=pr.ans.c})}
  var s=[v.ph,v.r,v.lk.join(''),v.at,v.w,mine.r===v.r?mine.c:'x',role,hostPicks.join(','),nm.join('|'),role==='host'&&v.ph==='lobby'?[!!teamInfo(0),!!teamInfo(1)].join():''].join('~');
  if(s===sig)return;sig=s;

  var Q=QS[v.q],h='';
  if(v.ph==='lobby'){
    if(role==='host'){
      var i0=teamInfo(0),i1=teamInfo(1);
      h='<div class="center"><div class="note">Kode game</div><div class="code">'+esc(code)+'</div><div class="note">Kelompok A dan B membuka tautan yang sama di perangkat masing-masing, lalu memasukkan kode ini.</div></div>'+
        '<div class="lobby"><div class="slot a'+(i0?' on':'')+'"><b>'+esc(nm[0])+'</b><small>'+(i0?'Sudah terhubung':'Menunggu perangkat Kelompok A...')+'</small></div>'+
        '<div class="slot b'+(i1?' on':'')+'"><b>'+esc(nm[1])+'</b><small>'+(i1?'Sudah terhubung':'Menunggu perangkat Kelompok B...')+'</small></div></div>'+
        '<div class="center"><button class="btn gold" data-act="start" type="button"'+((i0&&i1)?'':' disabled')+'>Mulai pertarungan</button></div>';
    }else{
      h='<div class="center"><p class="res '+(role==='A'?'a':'b')+'">Kamu masuk sebagai '+esc(nm[me])+'</p><p class="note wait">Menunggu guru memulai pertarungan...</p></div>';
    }
  }else if(v.ph==='q'){
    var d=Q.d,lockedMe=me>=0&&v.lk[me],answered=me>=0&&mine.r===v.r,can=me>=0&&!lockedMe&&!answered;
    h='<div class="qmeta"><span class="badge '+d+'">'+DLAB[d]+'  '+DMG[d]+'%</span><span>SOAL '+v.n+'</span></div><div class="qtext">'+qHtml(Q.q)+'</div><div class="opts">';
    Q.opts.forEach(function(o,i){
      var cls='o',tags='';
      if(role==='host'){if(hostPicks[0]===i)tags+='<span class="tag a">A</span>';if(hostPicks[1]===i)tags+='<span class="tag b">B</span>'}
      if(me>=0){if(mine.r===v.r&&mine.c===i)cls+=lockedMe?' wrong':' sel';else if(!can)cls+=' dim'}
      if(me>=0)h+='<button class="'+cls+'" data-opt="'+i+'" type="button"'+(can?'':' disabled')+'><i>'+LET[i]+'</i><span>'+esc(o)+'</span></button>';
      else h+='<div class="'+cls+'"><i>'+LET[i]+'</i><span>'+esc(o)+'</span><span class="tags">'+tags+'</span></div>';
    });
    h+='</div>';
    var note='';
    if(me>=0){
      if(lockedMe)note='<div class="note warn">Jawabanmu salah. Kamu terkunci di soal ini, tunggu lawan.</div>';
      else if(answered)note='<div class="note wait">Jawaban terkirim. Menunggu penilaian...</div>';
      else if(v.lk[1-me])note='<div class="note go">Lawan salah menjawab! Cepat, kesempatanmu!</div>';
      else note='<div class="note go">Jawab benar duluan untuk menyerang!</div>';
    }else{
      var a=[];if(v.lk[0])a.push(nm[0]+' salah (terkunci)');if(v.lk[1])a.push(nm[1]+' salah (terkunci)');
      note='<div class="note '+(a.length?'warn':'wait')+'">'+(a.length?esc(a.join('  |  ')):'Menunggu kelompok menjawab...')+'</div>';
    }
    h+=note;
  }else if(v.ph==='hit'||v.ph==='miss'||v.ph==='over'){
    var right=Q.opts[Q.a];
    if(v.ph==='miss')h='<div class="res n">Dua kelompok salah. Tidak ada serangan.</div>';
    else{
      var who=nm[v.at];
      h='<div class="res '+(v.at?'b':'a')+'">'+esc(who)+' menyerang! '+esc(nm[1-v.at])+' kehilangan '+v.dm+'% HP</div>';
    }
    h+='<div class="qtext">'+qHtml(Q.q)+'</div><div class="opts">';
    Q.opts.forEach(function(o,i){h+='<div class="o '+(i===Q.a?'right':'dim')+'"><i>'+LET[i]+'</i><span>'+esc(o)+'</span></div>'});
    h+='</div><div class="ex">'+esc(Q.ex)+'</div>';
    if(v.ph==='over'){
      h='<div class="res '+(v.w?'b':'a')+' center">'+esc(nm[v.w])+' memenangkan pertarungan!</div><div class="ex">'+esc(Q.ex)+'</div>';
      if(role==='host')h+='<div class="center"><button class="btn gold" data-act="again" type="button">Main lagi</button></div>';
    }
  }
  panel.innerHTML=h;
}

function buildCtl(){
  var c=$('#ctl');
  if(role!=='host'){c.innerHTML='';return}
  c.innerHTML='<button class="btn sm" id="btnSkip" type="button">Lewati soal</button><button class="btn sm ghost" id="btnReset" type="button">Reset ke lobi</button><span class="note">Tetap buka halaman ini selama pertandingan berlangsung.</span>';
  $('#btnSkip').onclick=function(){if(st&&st.ph==='q'){clearTimeout(timer);nextRound()}};
  $('#btnReset').onclick=function(){
    var b=$('#btnReset');
    if(!confirmReset){confirmReset=true;b.textContent='Yakin? Klik lagi';setTimeout(function(){confirmReset=false;if(b)b.textContent='Reset ke lobi'},2500);return}
    confirmReset=false;b.textContent='Reset ke lobi';clearTimeout(timer);var nm=st.nm;st=freshState(nm);publish();
  };
}

/* ---------- event ---------- */
$('#panel').addEventListener('click',function(e){
  var t=e.target.closest('[data-opt],[data-act]');if(!t)return;
  ac();
  if(t.dataset.act==='start'&&role==='host'){startGame();return}
  if(t.dataset.act==='again'&&role==='host'){startGame(st.nm);return}
  if(t.dataset.opt!==undefined&&hostSt&&hostSt.ph==='q'){
    var me=teamIdx(role),i=parseInt(t.dataset.opt,10);
    if(me<0||hostSt.lk[me]||mine.r===hostSt.r)return;
    mine={r:hostSt.r,c:i};SFX.tap();
    room.presence({ans:{r:hostSt.r,c:i,t:Date.now()}}).catch(function(){});
    sig='';paint();
  }
});
$('#btnHost').onclick=function(){
  ac();var A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',c='';for(var i=0;i<4;i++)c+=A[Math.floor(Math.random()*A.length)];
  enter('host',c,'');
};
function joinAs(r){
  ac();var c=($('#inCode').value||'').trim().toUpperCase();
  if(!/^[A-Z0-9]{4}$/.test(c)){$('#err').textContent='Masukkan kode game 4 karakter dari layar guru.';return}
  enter(r,c,($('#inName').value||'').trim());
}
$('#btnA').onclick=function(){joinAs('A')};
$('#btnB').onclick=function(){joinAs('B')};
$('#inCode').addEventListener('input',function(){this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')});
$('#btnMute').onclick=function(){muted=!muted;this.textContent='Suara: '+(muted?'OFF':'ON');if(!muted)SFX.tap()};
$('#btnLeave').onclick=leave;

drawBg($('#cvBg'));drawKnight($('#cvA'),0);drawKnight($('#cvB'),1);
/* masuk kembali otomatis setelah refresh */
try{var sv=JSON.parse(sessionStorage.getItem('bt_sess')||'null');if(sv&&sv.role&&sv.code){setTimeout(function(){enter(sv.role,sv.code,sv.nm||'')},50)}}catch(e){}
})();
