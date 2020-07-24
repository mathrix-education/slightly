export enum VideoBrickEvents {
  in = 'video.fullscreen.in',
  out = 'video.fullscreen.out',
}


export interface VideoFullScreenEvent {
  type: 'youtube' | 'vimeo';
  id: string;
  currentTime: number;
}