import { Star, PlayCircle } from "lucide-react";
import type { Story } from "@/lib/data";

export default function TestimonialsGrid({stories}:{stories:Story[]}){
  return <div className="testimonial-grid">{stories.map((story,index)=>{
    const media=story.media_url||story.video_url;
    const video=story.media_type==="video"||Boolean(story.video_url);
    return <article className={media?"testimonial-card has-media":"testimonial-card"} key={story._id||`${story.farmer_name}-${index}`}>
      {media&&<div className="testimonial-media">{video?<video src={media} controls preload="metadata" playsInline aria-label={`${story.farmer_name} video testimonial`}/>:<img src={media} alt={`${story.farmer_name} testimonial`}/>} {video&&<span><PlayCircle/> Video story</span>}</div>}
      <div className="testimonial-copy"><div className="stars">{Array.from({length:Number(story.rating)||5}).map((_,i)=><Star key={i} size={17} fill="currentColor"/>)}</div><blockquote>“{story.caption}”</blockquote>{story.description&&<p>{story.description}</p>}<strong>{story.farmer_name}</strong>{story.tractor_model&&<small>{story.tractor_model}</small>}</div>
    </article>})}</div>
}
