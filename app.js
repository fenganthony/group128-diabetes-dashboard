const modal=document.querySelector('#evidence');
for(const id of ['openEvidence','openEvidence2']) document.querySelector('#'+id).addEventListener('click',()=>modal.showModal());
document.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal) modal.close()});
const steps=[
  ['Patient overview','The dashboard begins with patient context and four priority diabetes measures.','.metrics'],
  ['Longitudinal trend','HbA1c values are shown with dates, units and a non-color trend indicator.','.chart-panel'],
  ['Transparent review cue','The rule describes a change without making a diagnosis or treatment recommendation.','.cue'],
  ['FHIR source evidence','Each generated statement exposes the supporting observations, LOINC code and resource identifiers.','#evidence'],
  ['Medication and encounter context','The clinician can review explicit medication status and recent activity.','.meds']
];
let step=-1,focus=null;const card=document.querySelector('#tourCard');
function showStep(){if(focus)focus.classList.remove('tour-focus');step++;if(step>=steps.length){stopTour();return}const [title,copy,selector]=steps[step];document.querySelector('#tourTitle').textContent=`${step+1} of ${steps.length} · ${title}`;document.querySelector('#tourText').textContent=copy;focus=document.querySelector(selector);if(selector==='#evidence'&&!modal.open)modal.showModal();if(selector!== '#evidence'&&modal.open)modal.close();focus.classList.add('tour-focus');focus.scrollIntoView({behavior:'smooth',block:'center'});document.querySelector('#tourNext').textContent=step===steps.length-1?'Finish':'Next →'}
function stopTour(){if(focus)focus.classList.remove('tour-focus');if(modal.open)modal.close();card.hidden=true;step=-1}
document.querySelector('#startTour').addEventListener('click',()=>{card.hidden=false;step=-1;showStep()});
document.querySelector('#tourNext').addEventListener('click',showStep);document.querySelector('#tourStop').addEventListener('click',stopTour);
