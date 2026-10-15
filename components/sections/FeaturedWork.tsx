import { WORK, isOngoing, type WorkProjectWithMedia } from "@/lib/work";
import { findMedia, IMAGE_EXTS, VIDEO_EXTS } from "@/lib/find-media";
import WorkStack from "./WorkStack";

// Server component: resolves each project's media from /public/work by slug,
// so dropping a file into that folder is all it takes to show it.
export default function FeaturedWork() {
  const projects: WorkProjectWithMedia[] = WORK.map((p) => ({
    ...p,
    image:      findMedia("work", p.slug, IMAGE_EXTS),
    hoverImage: findMedia("work", `${p.slug}-hover`, IMAGE_EXTS),
    video:      findMedia("work", p.slug, VIDEO_EXTS),
    ongoing:    isOngoing(p),
  }));

  return <WorkStack projects={projects} />;
}
