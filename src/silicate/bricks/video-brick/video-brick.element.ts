import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {
  VideoBrickEvents,
  VideoFullScreenEvent,
} from './video-brick.events';

@Element('silicate-video-brick')
export class VideoBrickElement extends BridgeElement {
  private static readonly YOUTUBE_IFRAME_API = 'https://www.youtube.com/iframe_api';
  private $player = this.querySelector<HTMLIFrameElement>('.player');
  private youTubePlayer: YT.Player;

  constructor() {
    super();

    this.loadYouTubeAPI().then(() => {
      delete (window as any).onYouTubeIframeAPIReady;
      this.setupYouTubePlayer();
    });
  }

  get videoId() {
    return this.$player.dataset.id;
  }

  private loadYouTubeAPI(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${VideoBrickElement.YOUTUBE_IFRAME_API}"]`)) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = VideoBrickElement.YOUTUBE_IFRAME_API;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = resolve;
    });
  }

  private setupYouTubePlayer() {
    this.youTubePlayer = new YT.Player(`player-${this.videoId}`, {
      height: '360',
      width: '640',
      videoId: this.videoId,
    });

    this.$player = this.querySelector<HTMLIFrameElement>('.player');

    this.registerEvents();
  }

  private registerEvents() {
    const fullscreenInListener = async (event) => {
      if (document.fullscreenElement === this.$player) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();

        document.exitFullscreen().catch();

        this.youTubePlayer.pauseVideo();

        this.bridge.emit<VideoFullScreenEvent>(VideoBrickEvents.in, {
          type: 'youtube',
          id: this.videoId,
          currentTime: Math.round(this.youTubePlayer.getCurrentTime()),
        });
      }
    };

    document.addEventListener('webkitfullscreenchange', fullscreenInListener);
    document.addEventListener('mozfullscreenchange', fullscreenInListener);
    document.addEventListener('fullscreenchange', fullscreenInListener);

    this.bridge.on<VideoFullScreenEvent>(VideoBrickEvents.out, (data) => {
      if (data.id === this.videoId) {
        this.youTubePlayer.seekTo(data.currentTime, true);
        this.youTubePlayer.playVideo();
      }
    });
  }
}