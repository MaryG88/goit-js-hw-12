import{a as L,S as O,i}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const S="46865368-ded5de9c0791206e82b93b274",q="https://pixabay.com/api/",m=async(o,t=1,n=15)=>{try{return(await L.get(q,{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:t}})).data}catch(s){throw console.log("Error fetching images:",s),s}},v=document.querySelector(".gallery"),k=new O(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlay:!0,overlayOpacity:.5});function g(o){const t=o.map(({webformatURL:n,largeImageURL:s,tags:e,likes:r,views:c,comments:h,downloads:b})=>`<li class="gallery-item">
//     <a class="gallery-link" href="${s}">
//       <img class="gallery-img" src="${n}" alt="${e}"  />
//       <div class="gallery-img-info">
//          <p class="info-item-title"><strong>Likes</strong>${r}</p>
//           <p class="info-item-title"><strong>Views</strong>${c}</p>
//           <p class="info-item-title"><strong>Comments</strong>${h}</p>
//           <p class="info-item-title"><strong>Downloads</strong>${b}</p>
//         </div>
//     </a>
//   </li>`).join("");v.insertAdjacentHTML("beforeend",t),k.refresh()}const p=document.querySelector(".search-form");document.querySelector(".loader");const f=document.querySelector(".gallery"),d=document.querySelector(".loader-container"),a=document.querySelector(".load-more-btn");let u="",l=1,y=15;p.addEventListener("submit",w);a.addEventListener("click",C);async function w(o){if(o.preventDefault(),f.innerHTML="",u=o.currentTarget.elements.input.value,u.trim()===""){i.error({title:"Missing tags",message:"Please enter a search query!",closeOnClick:!0});return}l=1,a.style.display="none",d.style.display="block";try{const t=await m(u,l,y);t.hits.length===0?i.error({title:"No pictures found",message:"Sorry, there are no images matching your search query. Please try again.",timeout:2500,closeOnClick:!0}):(g(t.hits),t.totalHits>y*l?a.style.display="block":(a.style.display="none",i.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",timeout:2500,closeOnClick:!0})))}catch{i.error({title:"Error",message:"Failed to fetch images. Please try again later.",timeout:2500,closeOnClick:!0})}finally{d.style.display="none"}p.reset()}async function C(){d.style.display="block",l+=1;try{const o=await m(u,l,y);g(o.hits);const t=f.lastElementChild.getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"}),o.totalHits>y*l?a.style.display="block":(a.style.display="none",i.error({position:"topRight",message:"We are sorry, there are no more posts to load",timeout:2500,closeOnClick:!0}))}catch(o){console.log(o),i.error({title:"Error",message:"Failed to fetch images. Please try again later.",timeout:2500,closeOnClick:!0})}finally{d.style.display="none"}}
//# sourceMappingURL=index.js.map