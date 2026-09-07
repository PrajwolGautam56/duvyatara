"use client";
import { useEffect, useState } from "react";
import { Tractor, MessageSquareText, UsersRound, UserPlus, Upload, LogIn, LogOut, Trash2 } from "lucide-react";
type Tab="tractors"|"enquiries"|"stories"|"users";

export default function AdminPage(){
  const [authenticated,setAuthenticated]=useState<boolean|null>(null);
  const [tab,setTab]=useState<Tab>("tractors");
  const [items,setItems]=useState<Record<string,unknown>[]>([]);
  const [status,setStatus]=useState("");
  const load=async(kind=tab)=>{const r=await fetch(`/api/${kind}`);const d=await r.json();setItems(Array.isArray(d)?d:d.items||[])};
  useEffect(()=>{fetch("/api/tractors",{method:"HEAD"}).then(r=>setAuthenticated(r.headers.get("x-admin")==="true"))},[]);
  useEffect(()=>{if(authenticated)load()},[tab,authenticated]);
  async function login(fd:FormData){const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(fd))});if(r.ok){setAuthenticated(true);setStatus("")}else setStatus("Invalid email or password.")}
  async function logout(){await fetch("/api/auth/logout",{method:"POST"});setAuthenticated(false)}
  async function addStory(fd:FormData){const r=await fetch("/api/stories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(fd))});setStatus(r.ok?"Story saved.":"Add MongoDB details to enable saving.");if(r.ok)load("stories")}
  async function addUser(fd:FormData){const r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(fd))});const d=await r.json();setStatus(r.ok?"Admin user created.":String(d.error||"Could not create user."));if(r.ok)load("users")}
  async function addTractor(fd:FormData){
    let image=String(fd.get("image")||"");const file=fd.get("file");
    if(file instanceof File&&file.size){const media=new FormData();media.set("file",file);const up=await fetch("/api/upload",{method:"POST",body:media});if(up.ok)image=(await up.json()).url}
    const specs=String(fd.get("specs")||"").split(",").map(s=>s.trim()).filter(Boolean);
    const payload={...Object.fromEntries(fd),image,specs,featured:true};delete (payload as Record<string,unknown>).file;
    const r=await fetch("/api/tractors",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    setStatus(r.ok?"Tractor saved.":"Add MongoDB/Cloudinary details to enable saving and uploads.");if(r.ok)load("tractors")
  }
  async function remove(item:Record<string,unknown>){if(!item._id)return;const r=await fetch(`/api/${tab}/${item._id}`,{method:"DELETE"});if(r.ok)load()}
  if(authenticated===null)return <div className="admin-loading">Loading…</div>;
  if(!authenticated)return <section className="admin-login"><form action={login}><div className="lock"><LogIn/></div><p className="eyebrow green">SECURE ACCESS</p><h1>Website management</h1><p>Sign in to manage tractors, enquiries and farmer stories.</p><label>Email<input name="email" type="email" required/></label><label>Password<input name="password" type="password" required/></label><button className="button primary">Sign In</button>{status&&<p className="form-error">{status}</p>}</form></section>;
  return <section className="admin-shell"><aside><h2>Divya Tara</h2><p>Content dashboard</p><button className={tab==="tractors"?"active":""} onClick={()=>setTab("tractors")}><Tractor/>Tractors</button><button className={tab==="enquiries"?"active":""} onClick={()=>setTab("enquiries")}><MessageSquareText/>Enquiries</button><button className={tab==="stories"?"active":""} onClick={()=>setTab("stories")}><UsersRound/>Farmer stories</button><button className={tab==="users"?"active":""} onClick={()=>setTab("users")}><UserPlus/>Admin users</button><button onClick={logout}><LogOut/>Sign out</button></aside><div className="admin-main"><div className="admin-title"><div><p className="eyebrow green">ADMIN DASHBOARD</p><h1>{tab[0].toUpperCase()+tab.slice(1)}</h1></div><span>{items.length} records</span></div>
    {tab==="tractors"&&<form className="admin-form" action={addTractor}><select name="brand" required><option>Powertrac</option><option>Farmtrac</option></select><input name="name" placeholder="Model name" required/><input name="slug" placeholder="URL slug, e.g. pt-euro-50" required/><input name="hp" placeholder="Horsepower" required/><input name="drive" placeholder="2WD / 4WD"/><input name="engine" placeholder="Engine"/><input name="lift" placeholder="Lift capacity"/><input name="gearbox" placeholder="Gearbox"/><input name="image" placeholder="Existing image URL"/><input name="file" type="file" accept="image/*,video/*"/><input name="description" placeholder="Short description"/><input name="specs" placeholder="Highlights, separated by commas"/><button className="button primary"><Upload size={17}/> Add tractor</button></form>}
    {tab==="stories"&&<form className="admin-form" action={addStory}><input name="farmer_name" placeholder="Farmer name" required/><input name="tractor_model" placeholder="Tractor model"/><input name="caption" placeholder="Short story headline" required/><textarea name="description" placeholder="Full story"/><input name="video_url" placeholder="Cloudinary video URL (optional)"/><button className="button primary"><Upload size={17}/> Add story</button></form>}
    {tab==="users"&&<form className="admin-form" action={addUser}><input name="email" type="email" placeholder="New admin email" required/><input name="password" type="password" minLength={8} placeholder="Temporary password (8+ characters)" required/><select name="role"><option value="admin">Admin</option><option value="editor">Editor</option></select><button className="button primary"><UserPlus size={17}/> Add user</button></form>}
    {status&&<p>{status}</p>}<div className="admin-table"><div className="table-row head"><span>Name / Customer</span><span>Details</span><span>Status / Action</span></div>{items.map((item,i)=><div className="table-row" key={String(item._id||item.slug||i)}><span>{String(item.email||item.name||item.farmer_name||"Website enquiry")}</span><span>{String(item.role||item.model||item.tractor_model||item.hp||item.phone||"—")}</span><span>{String(item.active===false?"Disabled":item.status||"Active")}{Boolean(item._id)&&tab!=="enquiries"&&<button className="icon-delete" onClick={()=>remove(item)} aria-label="Delete"><Trash2 size={16}/></button>}</span></div>)}</div><div className="admin-note"><strong>Cloudinary media ready</strong><p>With credentials added, tractor images and farmer photos/videos upload to Cloudinary and their URLs are saved with the content.</p></div></div></section>
}
