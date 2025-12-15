import { useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactPlayer from "react-player";

interface UniversalVideoPlayerProps {
  url: string;
  videoSource?: string | null;
}

const UniversalVideoPlayer = ({ url, videoSource }: UniversalVideoPlayerProps) => {
  const [playbackRate, setPlaybackRate] = useState(1);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Check if it's a social media embed that needs special handling
  const isTikTok = url.includes("tiktok.com");
  const isInstagram = url.includes("instagram.com");
  const isTwitter = url.includes("twitter.com") || url.includes("x.com");
  const isTelegram = url.includes("t.me") || url.includes("telegram");

  // TikTok/Instagram/Twitter embeds
  if (isTikTok || isInstagram || isTwitter) {
    return (
      <div className="w-full flex justify-center">
        <Suspense fallback={<Skeleton className="w-[325px] h-[600px]" />}>
          <SocialEmbed url={url} platform={isTikTok ? "tiktok" : isInstagram ? "instagram" : "twitter"} />
        </Suspense>
      </div>
    );
  }

  // Telegram widget
  if (isTelegram) {
    const telegramPostId = url.split("/").slice(-2).join("/");
    return (
      <div className="w-full flex justify-center">
        <iframe
          src={`https://t.me/${telegramPostId}?embed=1`}
          width="100%"
          height="500"
          frameBorder="0"
          scrolling="no"
          className="rounded-lg max-w-lg"
        />
      </div>
    );
  }

  // ReactPlayer for YouTube, Vimeo, Facebook, Direct videos
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls
        playbackRate={playbackRate}
      />
      <div className="absolute bottom-16 left-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" className="bg-black/70 text-white hover:bg-black/90">
              <Settings className="w-4 h-4 ml-1" />
              {playbackRate}x
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {playbackRates.map((rate) => (
              <DropdownMenuItem
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={playbackRate === rate ? "bg-accent" : ""}
              >
                {rate}x
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Lazy loaded social embed component
const SocialEmbed = ({ url, platform }: { url: string; platform: string }) => {
  const { TikTokEmbed, InstagramEmbed, TwitterEmbed } = require("react-social-media-embed");
  
  if (platform === "tiktok") {
    return <TikTokEmbed url={url} width={325} />;
  }
  if (platform === "instagram") {
    return <InstagramEmbed url={url} width={328} />;
  }
  if (platform === "twitter") {
    return <TwitterEmbed url={url} width={325} />;
  }
  return null;
};

export default UniversalVideoPlayer;
