(function(){
function picker(){const input=document.querySelector('.season-clue-upload input[type="file"]');if(input)input.click()}
function stopFallback(){const stream=window.__yjCameraStream;if(stream){stream.getTracks().forEach(track=>track.stop());window.__yjCameraStream=null}}
const previousStoryCapture=window.captureStoryHunt;
const previousSeasonCapture=window.captureSeasonClue;
window.startStoryHuntCamera=async function(){
  const button=document.querySelector('button[onclick="startStoryHuntCamera()"]');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){picker();return}
  try{
    stopFallback();window.__yjCameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
    const video=document.getElementById('storyHuntVideo');
    if(!video){picker();return}
    video.srcObject=window.__yjCameraStream;
    await video.play();
    const capture=document.getElementById('storyHuntCapture');
    if(capture)capture.disabled=false;
    if(button)button.textContent='카메라 켜짐';
  }catch(error){
    if(button)button.textContent='카메라 대신 사진 촬영/선택';
    alert('이 브라우저에서는 카메라 미리보기를 열 수 없어 사진 촬영/선택 창으로 전환합니다. 휴대폰에서는 카메라 촬영을 선택할 수 있습니다.');
    picker();
  }
};
window.startSeasonClueCamera=async function(){
  const input=document.querySelector('.season-clue-upload input[type="file"]');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){if(input)input.click();return}
  try{
    stopFallback();window.__yjCameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
    const video=document.getElementById('seasonClueVideo');
    if(!video){if(input)input.click();return}
    video.srcObject=window.__yjCameraStream;await video.play();
    const capture=document.getElementById('seasonCaptureBtn');if(capture)capture.disabled=false;
  }catch(error){if(input)input.click()}
};
window.captureStoryHunt=function(){if(previousStoryCapture)previousStoryCapture();stopFallback()};
window.captureSeasonClue=function(){if(previousSeasonCapture)previousSeasonCapture();stopFallback()};
const modal=document.getElementById('modal');if(modal)modal.addEventListener('close',stopFallback);
})();
