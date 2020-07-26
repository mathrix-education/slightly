export enum VideoBrickEvents {
  load = 'video.load',
  cue = 'video.cue',
}

export interface VideoLoadEvent {
  type: 'youtube';
  id: string;
  placement: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface VideoFullScreenEvent {
  type: 'youtube' | 'vimeo';
  id: string;
  currentTime: number;
}
