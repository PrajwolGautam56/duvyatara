export default function SocialQR({url,version=""}:{url?:string;version?:string}) {
  return <div className="social-qr"><img src={"/api/social/qr?v="+version} width={184} height={184} alt="QR code to open Divya Tara's social links"/><div><strong>Scan to connect</strong>{url&&<p className="social-destination">{url}</p>}<p>One QR for all our social links.</p><a href="/api/social/qr?download=1">Download PNG</a><a href="/api/social/qr?format=svg&download=1">Download print SVG</a></div></div>;
}
