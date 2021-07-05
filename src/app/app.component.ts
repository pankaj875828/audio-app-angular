import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  audioObj = new Audio()
  audioEvents =[
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ]
  files = [
    {
      url:'./assets/song1.mp3',
      name:'My Song1'
    },
    {
      url:'./assets/song2.mp3',
      name:'My Song2'
    },
    {
      url:'./assets/song3.mp3',
      name:'My Song3'
    }
  ]

  currentTime = '00:00:00'
  duration='00:00:00'
  seek=0

  streamObserver(url:any){
    return new Observable(observer=>{
        this.audioObj.src = url
        this.audioObj.load()
        this.audioObj.play()

      const handler = (event:Event) =>{
        // console.log(event);
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
        
      }

      this.addEvent(this.audioObj,this.audioEvents,handler)

      return ()=>{
        this.audioObj.pause();
        this.audioObj.currentTime = 0

        this.removeEvent(this.audioObj,this.audioEvents,handler)
      }
    })
  }

  addEvent(obj:any,events:any,handler:any){
    events.forEach((event:any) => {
      obj.addEventListener(event,handler)
    });
  }

  removeEvent(obj:any,events:any,handler:any){
    events.forEach((event:any) => {
      obj.removeEventListener(event,handler)
    });
  }

  setValue(event:any){
    this.audioObj.volume = event.target.value
    // console.log(event.target.value)
  }

  onClick(url:any){
    this.streamObserver(url).subscribe(event=>{})
    // console.log(url);
  }

  setSeekTo(event:any){
    this.audioObj.currentTime = event.target.value
    // console.log(event.target.value)
  }


  play(){
    this.audioObj.play()
    // console.log('play button');
  }

  pause(){
    this.audioObj.pause()
    // console.log('pause button');
  }

  stop(){
    this.audioObj.pause()
    this.audioObj.currentTime=0
    // console.log('stop button')
  }

  timeFormat(time:any,format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format)
  }

}
