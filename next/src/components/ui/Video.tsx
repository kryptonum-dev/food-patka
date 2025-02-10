import MuxPlayer from '@mux/mux-player-react/lazy';

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

export default function Video({ playbackId, aspectRatio, hideControls, ...props }: Props) {
  const aspect_ratio = aspectRatio.replace(':', ' / ');

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      disableCookies
      disableTracking
      primaryColor="#fffdfd"
      accentColor="#f489a9"
      placeholder="data:image/svg+xml;charset=utf-8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100%&quot; height=&quot;100%&quot;><filter id=&quot;b&quot; color-interpolation-filters=&quot;sRGB&quot;><feGaussianBlur stdDeviation=&quot;20&quot;/><feComponentTransfer><feFuncA type=&quot;discrete&quot; tableValues=&quot;1 1&quot;/></feComponentTransfer></filter><g filter=&quot;url(%23b)&quot;><image width=&quot;100%&quot; height=&quot;100%&quot; preserveAspectRatio=&quot;xMidYMid slice&quot; href=&quot;data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAABwAgCdASoJABAAAQAcJQBOhgqpEQl/xLKPOAVUAP0DIHz9POk6vFxxMoYdWIYvSoifPajB+tbpDKWmUNsS03iRFBs6Xs/RFs1sZfch6nlSlbEE2kVd+4A52mrbOZTeMbIY42od3creJ8vOdFCqCWHSKXHG5UQ79P6fT7xMX/NwUcnnT7DdAWswYhsOfz1Q4XgAAA==&quot;/></g></svg>"
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
