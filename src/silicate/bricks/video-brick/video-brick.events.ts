export enum VideoBrickEvents {
  load = 'video.load',
}

export interface VideoLoadEvent {
  type: 'youtube' | 'vimeo';
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
