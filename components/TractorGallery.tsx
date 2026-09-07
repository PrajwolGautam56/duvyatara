"use client";
import { useState } from "react";
export default function TractorGallery({primary,images=[],name}:{primary:string;images?:string[];name:string}){
  const all=[primary,...images].filter((src,index,list)=>src&&list.indexOf(src)===index);
  const [active,setActive]=useState(all[0]);
  return <div className="product-gallery"><div className="detail-image"><img src={active} alt={name}/></div>{all.length>1&&<div className="product-thumbs">{all.map((src,i)=><button key={src} className={src===active?"active":""} onClick={()=>setActive(src)} aria-label={`View ${name} image ${i+1}`}><img src={src} alt=""/></button>)}</div>}</div>
}
