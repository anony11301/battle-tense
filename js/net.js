/* Lapisan koneksi antar perangkat (pengganti `room` milik Claude).
   Memakai MQTT lewat WebSocket ke broker publik gratis, tanpa akun.
   Cara kerja: tiap perangkat menyimpan "presence" miliknya (peran, jawaban, atau state game
   untuk guru) di topik MQTT bertanda retain, dan semua perangkat membaca presence yang lain.
   API-nya sengaja dibuat sama dengan room Claude: join(name) -> presence(), onPeers(), onConnection(), leave(). */
(function(){
'use strict';
var BROKERS=['wss://broker.hivemq.com:8884/mqtt','wss://test.mosquitto.org:8081'];
var NS='battle-tense-smp/v1/';

function rid(){return Math.random().toString(36).slice(2,10)}

function connect(opts){
  return new Promise(function(resolve,reject){
    var i=0;
    (function tryNext(){
      if(i>=BROKERS.length){reject(new Error('no broker'));return}
      var c=mqtt.connect(BROKERS[i++],opts),done=false;
      var t=setTimeout(function(){if(done)return;done=true;c.end(true);tryNext()},8000);
      c.once('connect',function(){if(done)return;done=true;clearTimeout(t);resolve(c)});
      c.once('error',function(){if(done)return;done=true;clearTimeout(t);c.end(true);tryNext()});
    })();
  });
}

window.BTNet={
  join:async function(name){
    if(typeof mqtt==='undefined')throw new Error('mqtt library missing');
    var id=rid(),base=NS+name+'/p/',me={},peers={};
    var c=await connect({clientId:'bt_'+id,clean:true,keepalive:20,reconnectPeriod:2000,connectTimeout:8000,
      will:{topic:base+id,payload:'',retain:true,qos:0}});
    var peerH=[],connH=[],fireT=null,pubT=null;

    function list(){return Object.keys(peers).map(function(k){return {peer:k,isMe:k===id,presence:peers[k]}})}
    function fire(){
      if(fireT)return;
      fireT=setTimeout(function(){fireT=null;var l=list();peerH.forEach(function(h){h({peers:l,joined:[],left:[],updated:[]})})},0);
    }
    function publishMe(){
      if(pubT)return;
      pubT=setTimeout(function(){pubT=null;if(c.connected)c.publish(base+id,JSON.stringify(me),{retain:true,qos:0})},60);
    }
    c.subscribe(base+'+',{qos:0});
    c.on('message',function(topic,payload){
      var pid=topic.slice(base.length);
      if(!payload||!payload.length){delete peers[pid]}
      else{try{peers[pid]=JSON.parse(payload.toString())}catch(e){return}}
      fire();
    });
    c.on('connect',function(){connH.forEach(function(h){h(true)});publishMe()});
    c.on('close',function(){connH.forEach(function(h){h(false)})});
    c.on('offline',function(){connH.forEach(function(h){h(false)})});

    return {
      presence:function(patch){
        Object.keys(patch).forEach(function(k){if(patch[k]===null)delete me[k];else me[k]=patch[k]});
        peers[id]=me;fire();publishMe();return Promise.resolve();
      },
      onPeers:function(h){peerH.push(h);fire();return function(){peerH=peerH.filter(function(x){return x!==h})}},
      onConnection:function(h){connH.push(h);setTimeout(function(){h(c.connected)},0);return function(){connH=connH.filter(function(x){return x!==h})}},
      leave:function(){
        try{c.publish(base+id,'',{retain:true,qos:0})}catch(e){}
        return new Promise(function(r){setTimeout(function(){try{c.end(true)}catch(e){}r()},150)});
      }
    };
  }
};
})();
