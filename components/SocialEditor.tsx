"use client";
import { useEffect, useState } from "react";
import { socialIcons, type SocialSettings, type SocialLink } from "@/lib/social-data";
import SocialIcon from "./SocialIcon";
import SocialQR from "./SocialQR";
export default function SocialEditor() {
  const [data,setData]=useState<SocialSettings|null>(null);
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  const [version,setVersion]=useState("");
  const [savedUrl,setSavedUrl]=useState("");
  async function load() {
    try { const r=await fetch("/api/social",{cache:"no-store"});const d=await r.json();if(!r.ok)throw new Error(d.error);setData(d);setSavedUrl(d.publicUrl);setMessage(""); }
    catch {setMessage("Unable to load settings. Sign in as an administrator and retry.");}
  }
  useEffect(()=>{load()},[]);
  function update(id:string,patch:Partial<SocialLink>) {
    setData(d=>d&&({...d,links:d.links.map(l=>l.id===id?{...l,...patch}:l)}));
  }
  function move(index:number,direction:number) {
    setData(d=>{if(!d)return d;const links=[...d.links];const target=index+direction;if(target<0||target>=links.length)return d;[links[index],links[target]]=[links[target],links[index]];return {...d,links};});
  }
  async function save(event:React.FormEvent) {
    event.preventDefault();setBusy(true);setMessage("");
    try {const r=await fetch("/api/social",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Save failed.");setData(d);setSavedUrl(d.publicUrl);setVersion(String(Date.now()));setMessage("Saved. Your social page and QR are up to date.");}
    catch(e){setMessage(e instanceof Error?e.message:"Unable to save. Please retry.");}
    finally{setBusy(false);}
  }
  if(!data)return <div><p role="status">{message||"Loading social settings…"}</p>{message&&<button onClick={load}>Retry</button>}</div>;
  return <div className="social-editor"><a href="/admin">← Back to dashboard</a><h1>Social links & QR</h1><p>Manage the page heading, link names, icons, destinations and display order.</p><form onSubmit={save}><fieldset disabled={busy}><div className="social-settings"><label>Page title<input value={data.title} required maxLength={100} onChange={e=>setData({...data,title:e.target.value})}/></label><label>Description<textarea value={data.description} maxLength={500} onChange={e=>setData({...data,description:e.target.value})}/></label><label>Public page URL for the QR<input type="url" value={data.publicUrl} required onChange={e=>setData({...data,publicUrl:e.target.value})}/></label><p>Use your published domain followed by /social. Changing this address requires downloading and reprinting your QR.</p></div>
  <h2>Your links</h2>{!data.links.length&&<p>Add your first social or contact link below.</p>}{data.links.map((link,index)=><div className="social-edit-row" key={link.id}><div className="social-row-heading"><SocialIcon name={link.icon}/><strong>{link.name||"New link"}</strong><button type="button" disabled={index===0} onClick={()=>move(index,-1)} aria-label={"Move "+link.name+" up"}>↑</button><button type="button" disabled={index===data.links.length-1} onClick={()=>move(index,1)} aria-label={"Move "+link.name+" down"}>↓</button></div><div className="social-settings"><label>Display name<input required maxLength={80} value={link.name} onChange={e=>update(link.id,{name:e.target.value})}/></label><label>Icon<select value={link.icon} onChange={e=>update(link.id,{icon:e.target.value as SocialLink["icon"]})}>{socialIcons.map(icon=><option key={icon} value={icon}>{icon}</option>)}</select></label><label>Link URL<input required placeholder="https://..." value={link.url} onChange={e=>update(link.id,{url:e.target.value})}/></label></div><div className="social-row-heading"><label><input type="checkbox" checked={link.visible} onChange={e=>update(link.id,{visible:e.target.checked})}/> Show on public page</label><button type="button" onClick={()=>{if(confirm("Remove this link? Save to apply the removal."))setData({...data,links:data.links.filter(l=>l.id!==link.id)})}}>Remove</button></div></div>)}<div className="social-editor-actions"><button type="button" disabled={data.links.length>=50} onClick={()=>setData({...data,links:[...data.links,{id:crypto.randomUUID(),name:"",url:"",icon:"website",visible:true}]})}>+ Add link</button><button className="button primary" type="submit">{busy?"Saving…":"Save changes"}</button><a href="/social" target="_blank" rel="noopener noreferrer">View social page ↗</a></div></fieldset><p role="status">{message}</p></form><SocialQR url={savedUrl} version={version}/></div>;
}
