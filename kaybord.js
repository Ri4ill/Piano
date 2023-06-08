import React, { useState ,useEffect} from 'react'
import * as Tone from 'tone';
import Slider from '@mui/material/Slider';
import kaybord from '../img/tone/kbordQWERTY.jpg'

const Kaybord = () => {
    const [synthAll,setSynthAll] = useState(0)
    const [valueTon, setValueTon] = useState(3);
    const [synth, setSynth] = useState( new Tone.FMSynth().toDestination());
    const noteDuration = '1n';
    const All = {
        0: new Tone.FMSynth({
            oscillator: {
              type: 'sine',
            },
            envelope: {
              attack: 0.02,
            },
            harmonicity: 3,
            modulationIndex: 10,
          }).toDestination(),
        1: new Tone.AMSynth({
            oscillator: {
              type: 'sine',
            },
            envelope: {
              attack: 0.02,
            },
            harmonicity: 3,
          }).toDestination(),
        2: new Tone.DuoSynth({
            vibratoAmount: 0.5,
            vibratoRate: 5,
            harmonicity: 1.5,
          }).toDestination(),
        3: new Tone.MembraneSynth({
            pitchDecay: 0.2,
            octaves: 2,
            oscillator:{
                type : 'sine',
            },
          }).toDestination(),
        4: new Tone.MetalSynth({
            frequency: {
                value: 440,
            },
            envelope: {
              attack: 0.02,
              decay : 0.2,
              sustain : 0.5,
              release : 0.3,
            },
            harmonicity: {
                value: 2,
            },
            modulationIndex: {
                value: 10,
            },
          }).toDestination(),
        5: new Tone.PluckSynth({
            dampening: 4000,
            attackNoise:  0.8,
            resonance: 0.7,
          }).toDestination(),
        6: new Tone.PolySynth({
            oscillator: {
                type: 'sine',
            },
            envelope: {
                attack: 0.1,
                decay: 0.2,
                sustain: 0.5,
                release: 0.3,
            },
          }).toDestination(),
    }
    useEffect(() => {
        stopSound();
        const newSynth = All[synthAll]
        console.log(newSynth)
        synth.dispose();
        console.log(newSynth);
        setSynth(newSynth);
        
        return () => {
            newSynth.dispose();
        };
    }, [valueTon, synthAll]);    
    function playSound(note) {
        synth.triggerRelease(); // Остановить предыдущую атаку
        synth.triggerAttackRelease(note + valueTon, noteDuration);
    }
    const keyNoteMap = {
        'A': `C`,
        'S': `D`,
        'D': `E`,
        'F': `F`,
        'G': `G`,
        'H': `A`,
        'J': `B`,
        'W': `C#`,
        'E': `D#`,
        'T': `F#`,
        'Y': `G#`,
        'U': `A#`
    };
    function stopSound(){
        synth.triggerRelease()
    }
    document.addEventListener('keyup' , ()=>{
        stopSound()
    })
    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase(); 
        
        if (keyNoteMap.hasOwnProperty(key)) {
            playSound(keyNoteMap[key]);
        }
    });
    const handleChange = (event, newValue) => {
        setValueTon(newValue);
      }
  return (
    <div className='piano'>
        <div className='piano_button'>
            <button  onClick={()=>{
                setSynthAll(0)
                }}>
                FM
            </button>
            <button onClick={()=>{
                setSynthAll(1)
                }}>
                AM
            </button>
            <button  onClick={()=>{
                setSynthAll(2)
                }}>
                Duo
            </button>
            <button onClick={()=>{
                setSynthAll(3)
                }}>
                Membrane
            </button>
            <button onClick={()=>{
                setSynthAll(4)
                }}>
                Metal
            </button>
            <button  onClick={()=>{
                setSynthAll(5)
                }}>
                Pluck
            </button>
            <button onClick={()=>{
                setSynthAll(6)
                }}>
                Poly
            </button>
        </div>
        <div className='piano_slider'>
            <Slider style={{ width:"60%", color: 'white' , height:"5%", margin: "auto"}} value={valueTon} onChange={handleChange} step={1} min={1} max={7} marks/>
        </div>
        <div className='piano_img'>
            <img src={kaybord} alt="" />
        </div>
    </div>
  )
}

export default Kaybord