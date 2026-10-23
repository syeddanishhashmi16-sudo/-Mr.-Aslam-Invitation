import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronDown, ExternalLink, Heart, MapPin, Music2, Pause, Phone, Play, Sparkles, Volume2, VolumeX, Gift, CalendarDays, Clock3, MailOpen } from 'lucide-react';
import './index.css';

// Drop your MP3 in /public and keep this path, or replace it with another URL.
const BG_MUSIC_URL = "/music.mp3";
// Since the invitation says “After Maghrib” rather than an exact clock time, this is an easy-to-edit timer target.
const EVENT_DATE = "2026-11-03T18:00:00+05:30";
const MAP_URL = "https://maps.app.goo.gl/7L2bLhVxkpWxm3Gx5";

const fadeUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.22,1,.36,1]}} };

function GoldSeal({small=false}) {
  return <div className={`seal rounded-full ${small?'w-16 h-16':'w-44 h-44'} flex items-center justify-center relative`}>
    <div className="seal-inner rounded-full absolute inset-[10%] flex items-center justify-center text-center">
      <div>
        <div className={`${small?'text-[7px]':'text-[10px]'} font-cinzel tracking-[.28em] text-[#65450e]`}>INVITATION</div>
        <div className={`${small?'text-sm':'text-3xl'} text-[#714b0b] mt-1`}>❦</div>
        {!small && <div className="text-[8px] font-cinzel tracking-[.2em] text-[#65450e]">VALIMA • 2026</div>}
      </div>
    </div>
    <div className="absolute inset-0 rounded-full pointer-events-none text-[#6f4b10] text-[9px] flex items-center justify-center tracking-[.4em]">✦ ❧ ✦ ❧ ✦</div>
  </div>
}

function Curtains({open,onOpen}) {
  return <AnimatePresence>
    {!open && <motion.div className="fixed inset-0 z-50 overflow-hidden bg-[#450812]" initial={{opacity:1}} exit={{opacity:0,transition:{duration:1.2,delay:.9}}}>
      <motion.div className="curtain absolute left-0 top-0 bottom-0 w-1/2 origin-left" initial={{x:0}} exit={{x:'-96%',transition:{duration:1.45,ease:[.16,1,.3,1]}}}/>
      <motion.div className="curtain absolute right-0 top-0 bottom-0 w-1/2 origin-right" initial={{x:0}} exit={{x:'96%',transition:{duration:1.45,ease:[.16,1,.3,1]}}}/>
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <motion.div initial={{scale:.86,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.25,duration:.8}} className="flex flex-col items-center text-center">
          <GoldSeal/>
          <p className="mt-8 text-[#f6dda0] font-cinzel tracking-[.3em] text-[10px] uppercase">A Royal Invitation</p>
          <button onClick={onOpen} className="mt-5 reveal-shimmer rounded-full px-7 py-3 text-[#4b2d0b] font-semibold shadow-2xl flex items-center gap-2">Open Invitation <ChevronDown size={17}/></button>
        </motion.div>
      </div>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 tassel text-[#e0b95d] text-4xl">❧</div><div className="absolute right-3 top-1/2 -translate-y-1/2 tassel text-[#e0b95d] text-4xl rotate-180">❧</div>
    </motion.div>}
  </AnimatePresence>
}

function AudioWidget({playing,setPlaying,volume,setVolume}) {
  const audioRef = useRef(null);
  useEffect(()=>{ if(audioRef.current) audioRef.current.volume=volume; },[volume]);
  useEffect(()=>{ if(playing) audioRef.current?.play().catch(()=>setPlaying(false)); else audioRef.current?.pause(); },[playing,setPlaying]);
  return <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
    <audio ref={audioRef} src={BG_MUSIC_URL} loop preload="auto"/>
    <div className="bg-white/90 backdrop-blur border border-[#d6bd88] shadow-gold rounded-full px-3 py-2 flex items-center gap-2">
      <button aria-label={playing?'Pause music':'Play music'} onClick={()=>setPlaying(v=>!v)} className="w-10 h-10 rounded-full bg-[#6e3b29] text-[#f7df9a] flex items-center justify-center">{playing?<Pause size={16}/>:<Play size={16}/>}</button>
      <div className="hidden sm:flex items-center gap-2 pr-1"><div className={playing?'spin':''}><Music2 size={17} className="text-[#a4762d]"/></div><div className="wave h-5 flex items-center gap-[3px]">{[1,2,3,4,5].map(i=><span key={i}/>)}</div></div>
      <button onClick={()=>setVolume(v=>v>0?.35:1)} aria-label="Toggle volume" className="text-[#8c6325]">{volume===0?<VolumeX size={17}/>:<Volume2 size={17}/>}</button>
    </div>
  </div>
}

function Countdown() {
  const calc=()=>{ const diff=Math.max(0,new Date(EVENT_DATE)-new Date()); return {d:Math.floor(diff/864e5),h:Math.floor(diff/36e5)%24,m:Math.floor(diff/6e4)%60,s:Math.floor(diff/1e3)%60}; };
  const [t,setT]=useState(calc);
  useEffect(()=>{const id=setInterval(()=>setT(calc()),1000);return()=>clearInterval(id)},[]);
  return <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto">
    {Object.entries(t).map(([k,v])=><div key={k} className="rounded-2xl border border-[#d6bb7b] bg-white/70 p-3 sm:p-4 shadow-sm"><div className="font-cinzel text-2xl sm:text-3xl gold-text">{String(v).padStart(2,'0')}</div><div className="uppercase tracking-[.2em] text-[8px] sm:text-[9px] text-[#80694c] mt-1">{k}</div></div>)}
  </div>
}

function DateReveal() {
  const [revealed,setRevealed]=useState(false);
  return <div className="text-center">
    <AnimatePresence mode="wait">
      {!revealed ? <motion.button key="seal" initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:1.4,opacity:0,rotate:8}} onClick={()=>setRevealed(true)} className="mx-auto w-32 h-32 rounded-full seal flex items-center justify-center text-center font-cinzel text-[10px] tracking-[.15em] text-[#65450e]">TAP TO<br/>DISCOVER<br/><span className="text-base">❦</span></motion.button>
      : <motion.div key="date" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="rounded-3xl border border-[#d4b66f] bg-white/75 p-6 shadow-gold max-w-lg mx-auto"><CalendarDays className="mx-auto text-[#a57729]"/><p className="font-cinzel tracking-[.15em] text-xs text-[#8d6c35] mt-2">THE REVEALED DATE</p><h3 className="font-display text-3xl sm:text-4xl gold-text mt-2">Tuesday, 3rd November 2026</h3><p className="mt-2 text-sm text-[#756451]">22nd Jamadil Awwal 1448 Hijri</p><Countdown/></motion.div>}
    </AnimatePresence>
  </div>
}

function App(){
 const [open,setOpen]=useState(false); const [playing,setPlaying]=useState(false); const [volume,setVolume]=useState(.55); const [rsvp,setRsvp]=useState('');
 const openInvitation=()=>{setOpen(true);setPlaying(true);setTimeout(()=>document.getElementById('invitation')?.scrollIntoView({behavior:'smooth'}),900)};
 const celebrate=()=>{setRsvp('yes'); confetti({particleCount:180,spread:95,startVelocity:35,origin:{y:.68},colors:['#b8862c','#f0d783','#e9b6a5','#6e3b29','#fff7df']});};
 return <div className="paper-texture luxe-bg min-h-screen">
   <Curtains open={open} onOpen={openInvitation}/>
   <AudioWidget playing={playing} setPlaying={setPlaying} volume={volume} setVolume={setVolume}/>
   <main id="invitation" className="overflow-hidden">
    <section className="min-h-screen flex items-center justify-center px-5 py-20 relative">
      <div className="absolute top-10 left-5 flower text-4xl">❧</div><div className="absolute top-24 right-5 flower text-4xl rotate-180">❧</div>
      <motion.div initial="hidden" animate={open?'show':'hidden'} variants={fadeUp} className="max-w-3xl text-center">
       <div className="text-4xl sm:text-5xl font-serif text-[#4b2c20]">﷽</div>
       <p className="mt-4 text-[11px] sm:text-xs tracking-[.13em] uppercase text-[#806d55]">In the name of Allah, The Most Gracious, The Most Merciful</p>
       <div className="w-28 h-px gold-line mx-auto my-7"/>
       <p className="font-display italic text-xl sm:text-2xl text-[#624536] leading-relaxed">Solicit your gracious presence on the auspicious occasion of the Valima Reception of their Son</p>
       <div className="mt-10"><GoldSeal small/></div>
       <p className="mt-5 font-cinzel tracking-[.25em] text-[10px] text-[#987333]">WITH LOVE • WITH DUA • WITH GRATITUDE</p>
      </motion.div>
    </section>

    <section className="px-5 py-16 sm:py-24 max-w-5xl mx-auto">
      <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.2}} variants={fadeUp} className="text-center"><p className="font-cinzel text-[10px] tracking-[.3em] text-[#9a7537]">THE GROOM</p><h2 className="font-display text-4xl sm:text-5xl mt-2 gold-text">Mohammed Aslam</h2><div className="w-16 h-px bg-[#c39a4b] mx-auto my-5"/></motion.div>
      <div className="mt-8 grid md:grid-cols-2 gap-5">
       <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp} className="rounded-3xl bg-white/65 border border-[#e0ceb0] p-7 shadow-luxe"><div className="text-3xl text-[#ba8b36] mb-5">❦</div><p><b>Son of:</b> Mr. & Mrs. Mohammed Gaus Sahab</p><p className="mt-3"><b>Grandson of:</b> (Late) Abdul Raheem Sahab</p><p className="mt-3"><b>Residence:</b> Laxmi Nagar, Degloor Naka, Nanded</p></motion.div>
       <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp} className="rounded-3xl bg-[#ead1c8]/50 border border-[#d9b6aa] p-7 shadow-luxe"><div className="text-3xl text-[#a87366] mb-5">♡</div><p className="font-display text-2xl text-[#6b4136]">The Bride</p><p className="mt-5"><b>Daughter of:</b> Mohammed Lateef Sahab</p><p className="mt-3"><b>Residence:</b> Aisf Nagar, Degloor Naka, Nanded</p><p className="mt-5 text-xs text-[#806b62] italic">Her name is respectfully kept private in this invitation.</p></motion.div>
      </div>
    </section>

    <section className="px-5 py-16 bg-[#f1e5d7]/70">
      <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp} className="max-w-3xl mx-auto text-center rounded-[2rem] border border-[#d7b970] p-8 sm:p-12 bg-white/45 shadow-gold floral-border"><Sparkles className="mx-auto text-[#b98a32]" size={24}/><p className="font-cinzel text-[10px] tracking-[.25em] text-[#987333] mt-3">A BLESSING FOR THE COUPLE</p><blockquote className="font-display text-xl sm:text-2xl leading-relaxed text-[#584238] mt-5">“And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy.”</blockquote><p className="text-xs text-[#8a745d] mt-5">— Qur’an 30:21</p></motion.div>
    </section>

    <section className="px-5 py-20 max-w-4xl mx-auto text-center">
      <p className="font-cinzel text-[10px] tracking-[.3em] text-[#9a7537]">A LITTLE MOMENT OF DISCOVERY</p><h2 className="font-display text-4xl sm:text-5xl mt-2 text-[#57392d]">When is the celebration?</h2><p className="text-sm text-[#7b6a59] mt-3 mb-9">Break the golden seal to reveal the date.</p><DateReveal/>
    </section>

    <section className="px-5 py-16 bg-[#6e3b29] text-[#f9e9c1]">
      <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp} className="max-w-3xl mx-auto text-center"><p className="font-cinzel text-[10px] tracking-[.3em] text-[#e6c875]">THE EVENING</p><h2 className="font-display text-4xl sm:text-5xl mt-2">Valima Reception</h2><div className="grid sm:grid-cols-2 gap-4 mt-9 text-left"><div className="rounded-2xl border border-[#cda85e]/50 bg-white/5 p-5 flex gap-4"><CalendarDays className="text-[#e3c36e] shrink-0"/><div><p className="text-xs uppercase tracking-widest text-[#d9bd79]">Date</p><p className="mt-1">Tuesday, 3rd November 2026</p></div></div><div className="rounded-2xl border border-[#cda85e]/50 bg-white/5 p-5 flex gap-4"><Clock3 className="text-[#e3c36e] shrink-0"/><div><p className="text-xs uppercase tracking-widest text-[#d9bd79]">Time</p><p className="mt-1">After Namaz-e-Maghrib</p></div></div><div className="sm:col-span-2 rounded-2xl border border-[#cda85e]/50 bg-white/5 p-5 flex gap-4"><MapPin className="text-[#e3c36e] shrink-0"/><div><p className="text-xs uppercase tracking-widest text-[#d9bd79]">Venue</p><p className="mt-1">Royal Garden Function Hall, Maltekdi Road, Degloor Naka, Nanded</p><a href={MAP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 rounded-full bg-[#f1d27b] text-[#55311e] px-5 py-2.5 text-sm font-semibold">View Location on Google Maps <ExternalLink size={15}/></a></div></div></div></motion.div>
    </section>

    <section className="px-5 py-20 max-w-3xl mx-auto text-center"><Heart className="mx-auto text-[#b57d38]"/><h2 className="font-display text-4xl sm:text-5xl mt-3 text-[#57392d]">Will You Join Our Big Day?</h2><p className="text-sm text-[#806d5a] mt-3">Your presence and duas will make the evening even more special.</p><div className="flex flex-col sm:flex-row justify-center gap-3 mt-8"><button onClick={celebrate} className={`rounded-full px-7 py-3 font-semibold ${rsvp==='yes'?'bg-[#6e3b29] text-[#f8dfa0]':'bg-[#b88a38] text-white'}`}>I'll Be There ✨</button><button onClick={()=>setRsvp('no')} className="rounded-full px-7 py-3 border border-[#c7aa72] text-[#6e5545] bg-white/60">Will Miss It</button></div>{rsvp&&<p className="mt-5 text-sm text-[#8b6a3c]">{rsvp==='yes'?'Alhamdulillah — we look forward to welcoming you!':'You will be missed, with love and duas.'}</p>}</section>

    <section className="px-5 py-16 border-t border-[#decda9] bg-white/35"><div className="max-w-3xl mx-auto text-center"><p className="font-cinzel text-[10px] tracking-[.28em] text-[#9a7537]">WITH BEST COMPLIMENTS FROM</p><h2 className="font-display text-3xl sm:text-4xl mt-3 text-[#5d3f32]">All Relatives & Friends</h2><div className="w-24 h-px gold-line mx-auto my-7"/><p className="font-display text-xl text-[#6b493b]">Haji Abdul Gani Abdul Rahim</p><p className="text-xs text-[#816c5a]">(Rtd. Upgrad Headmaster)</p><p className="font-display text-xl text-[#6b493b] mt-3">Mohammed Gaus</p><div className="flex flex-wrap justify-center gap-3 mt-7">{['9421760803','9921507482','9421630016'].map(n=><a key={n} href={`tel:${n}`} className="rounded-full bg-white border border-[#d7bd88] px-4 py-2 text-sm text-[#76562c] inline-flex items-center gap-2"><Phone size={14}/>{n}</a>)}</div></div></section>

    <footer className="px-5 py-20 text-center"><motion.div animate={{y:[0,-5,0]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}} className="mx-auto w-20 h-14 rounded-t-md rounded-b-xl border border-[#c9a35b] bg-[#f0dca9] shadow-gold flex items-center justify-center"><MailOpen className="text-[#79521b]"/></motion.div><h3 className="font-display text-2xl mt-6 text-[#624536]">Thank You for your blessings & love</h3><p className="text-xs text-[#8a7561] mt-2">May Allah bless the couple with love, mercy, happiness and barakah.</p><div className="mt-8 text-[#bb8a37]">❧ ✦ ❧</div></footer>
   </main>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
