import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {
  VideoBrickEvents,
  VideoLoadEvent,
} from './video-brick.events';

@Element('silicate-video-brick')
export class VideoBrickElement extends BridgeElement {
  private readonly $player = this.$<HTMLDivElement>('.player');

  constructor() {
    super();

    this.bridge.emit<VideoLoadEvent>(VideoBrickEvents.load, {
      type: 'youtube',
      id: this.$player.dataset.id,
      placement: {
        top: this.$player.offsetTop,
        right: this.$player.offsetLeft + this.$player.offsetWidth,
        bottom: this.$player.offsetTop + this.$player.offsetHeight,
        left: this.$player.offsetLeft,
        width: this.$player.offsetWidth,
        height: this.$player.offsetHeight,
      },
    });
  }
}