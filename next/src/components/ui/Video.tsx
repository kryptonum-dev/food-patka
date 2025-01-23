import MuxPlayer from '@mux/mux-player-react/lazy';
import { createBlurUp } from '@mux/blurup';

type Props = {
  playbackId: string
  aspectRatio: string
  hideControls?: boolean
}

export type VideoDataProps = Props;

export const VideoDataQuery = (name: string) => `
  ${name} {
    "playbackId": asset -> playbackId,
    "aspectRatio": asset -> data.aspect_ratio,
  },
`;

const getPlaceholder = async (playbackId: string) => {
  const { blurDataURL } = await createBlurUp(playbackId);
  return blurDataURL;
};

export default async function Video({ playbackId, aspectRatio, hideControls, ...props }: Props) {
  const aspect_ratio = aspectRatio.replace(':', ' / ');
  const placeholder = await getPlaceholder(playbackId);

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      disableCookies
      disableTracking
      primaryColor="#fffdfd"
      accentColor="#f489a9"
      placeholder={placeholder}
      style={{
        aspectRatio: aspect_ratio,
        display: 'block',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        objectFit: 'cover',
        ['--media-object-fit' as string]: 'cover',
        ['--seek-backward-button' as string]: 'none',
        ['--seek-forward-button' as string]: 'none',
        ['--captions-button' as string]: 'none',
        ['--playback-rate-button' as string]: 'none',
        ['--pip-button' as string]: 'none',
        ...(hideControls ? {
          '--controls': 'none',
          '--controls-backdrop-color': 'transparent'
        } : {}),
      }}
      {...hideControls && { muted: true, autoPlay: true, loop: true }}
      {...props}
    />
  );
}
