<script>
// attach footer year / buy links if used
document.addEventListener("DOMContentLoaded",()=>{
  const y=document.getElementById("y"); if(y) y.textContent=new Date().getFullYear();
  const C=window.APP_CONFIG||{};
  const s=document.getElementById("buyStripe"), w=document.getElementById("buyWP");
  if(s&&C.stripePaymentLink) s.href=C.stripePaymentLink; if(w&&C.warriorPlusLink) w.href=C.warriorPlusLink;
});

// AI call via Edge Function
async function aiCall(url, prompt){
  const r=await fetch(url,{method:"POST",headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+window.APP_CONFIG.supabaseAnonKey
  },body:JSON.stringify({prompt})});
  return r.json();
}

// Supabase REST (no SDK)
const sbBase=()=>window.APP_CONFIG.supabaseUrl+"/rest/v1";
const sbHdr=()=>({"Content-Type":"application/json","apikey":window.APP_CONFIG.supabaseAnonKey,"Authorization":"Bearer "+window.APP_CONFIG.supabaseAnonKey,"Prefer":"return=representation"});
async function sbInsert(table,row){const r=await fetch(`${sbBase()}/${table}`,{method:"POST",headers:sbHdr(),body:JSON.stringify(row)}); if(!r.ok) throw new Error(await r.text()); return r.json();}
async function sbSelect(table,q="?select=*"){const r=await fetch(`${sbBase()}/${table}${q}`,{headers:sbHdr()}); if(!r.ok) throw new Error(await r.text()); return r.json();}
</script>
