
'use strict';
const $=q=>document.querySelector(q), modal=$('#modal'),KEY='YJ_THREE_CASES_V4_REAL_WORLD_SEASON_'+window.YJ_SEASON+(window.YJ_SEASON===2?'_SMS_DEBT_V2':'');
const fresh=()=>({step:0,unlocked:0,read:[],decisions:{},laws:[],field:false,fieldRead:false,fallback:false,practice:false,done:false});
let S={mode:'screen',cases:[null,fresh(),fresh(),fresh()]},current=0;
try{let old=JSON.parse(localStorage.getItem(KEY));if(old?.cases?.length===4)S=old;S.mode='screen';S.cases.slice(1).forEach(a=>{if(a.completedMode)a.completedMode='screen'})}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('이 브라우저에서는 진행 기록을 저장할 수 없습니다. 현재 체험은 계속할 수 있습니다.')}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.remove('hidden');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.add('hidden'),4000)}
function show(t,b){$('#mt').textContent=t;$('#mb').innerHTML=b;if(!modal.open)modal.showModal()}
function closeModal(){modal.close()}
function home(){current=0;closeModal();renderHome();window.scrollTo(0,0)}
function enter(n){current=n;closeModal();render();window.scrollTo(0,0)}
function setMode(){S.mode='screen';save();renderHome()}
function resetSeason(n){show('시즌 '+n+' 다시 체험','<p>이 시즌의 진행 기록만 초기화합니다.</p><button class="primary" onclick="doReset('+n+')">다시 시작</button> <button onclick="closeModal()">취소</button>')}
function doReset(n){S.cases[n]=fresh();save();enter(n)}
const covers=[`<svg viewBox="0 0 400 190"><rect width="400" height="190" fill="#293d43"/><path d="M0 170L150 100H400V190H0" fill="#57625a"/><path d="M40 20H145V118H40Z" fill="#9eb6b0"/><path d="M92 20V118M40 68H145" stroke="#31444a" stroke-width="7"/><path d="M200 40H347V108H200Z" fill="#284a3f" stroke="#8a8169" stroke-width="7"/><path d="M75 126H235V153H75Z" fill="#b5946b"/><path d="M91 154V188M220 154V188" stroke="#1d2d33" stroke-width="10"/><rect x="124" y="117" width="36" height="22" rx="2" fill="#e6dfcc"/><circle cx="332" cy="142" r="24" fill="#e0b279" opacity=".35"/></svg>`,`<svg viewBox="0 0 400 190"><rect width="400" height="190" fill="#252d44"/><g fill="none" stroke="#76829f" opacity=".3"><path d="M0 45H400M0 95H400M0 145H400M50 0V190M150 0V190M250 0V190M350 0V190"/></g><g transform="rotate(-8 200 90)"><rect x="95" y="20" width="210" height="150" rx="12" fill="#172333" stroke="#7fa5c3"/><rect x="117" y="45" width="100" height="13" rx="3" fill="#8cc7e0"/><rect x="117" y="76" width="159" height="28" rx="4" fill="#8e584f"/><rect x="150" y="117" width="126" height="25" rx="4" fill="#486d67"/></g><circle cx="320" cy="45" r="20" fill="#f0b779"/><text x="320" y="53" text-anchor="middle" fill="#222" font-size="24">!</text></svg>`,`<svg viewBox="0 0 400 190"><rect width="400" height="190" fill="#263e3b"/><path d="M0 150Q120 85 400 152V190H0Z" fill="#5f7862"/><path d="M0 175Q160 110 400 177" stroke="#baa583" stroke-width="20" fill="none"/><g stroke="#9da88d"><path d="M45 38Q200 90 355 38" fill="none"/></g><g fill="#eab982"><path d="M66 49L80 79L92 55Z"/><path d="M127 63L142 94L157 67Z"/><path d="M192 70L207 99L220 69Z"/><path d="M260 64L275 92L290 59Z"/></g><path d="M67 130V102H141V130M230 140V102H310V140" fill="#b09874"/><path d="M52 104L104 69L156 104M214 104L270 67L325 104" fill="#324855" stroke="#879a91" stroke-width="3"/><circle cx="196" cy="128" r="14" fill="#b6dbb8"/></svg>`];

const authors=[
 ['정동훈','3D 현장 탐색','시즌1 · 자료 세 곳을 직접 열어 위험 신호 관찰'],
 ['박서현','사건 파일·증거 조사','시즌1 · 모집글·카드 인계·연락두절 기록 연결'],
 ['장준호','일상 선택과 결과','시즌1 · 구조 요청·단서 전달·경찰 협력 선택'],
 ['이준서','위험과 안전 구분','시즌2 · 무료 이벤트·손실 만회·도움 제안 구분'],
 ['김정탁','단계별 대응','시즌2 · 도움 요청·협박 확인·보호·회복 단계 구성'],
 ['정세영','여러 사람의 진술 대조','시즌3 · 제작자·전달자·목격자의 기록 비교'],
 ['이준호','위험을 막는 보호망','시즌3 · 재유포 중단·피해자 지지·전문지원 연결']
];
const lawUrls={bank:'https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025193689',bank6:'https://www.law.go.kr/법령/전자금융거래법/제6조',gamble:'https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032430261',fake:'https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1024887659',youth:'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=4&cciNo=3&cnpClsNo=2&csmSeq=1408',force:'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1027547997',child:'https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1032964419'};
const youthNote='행위 당시 14세 미만은 형사처벌 대상이 아닙니다. 10세 이상 14세 미만은 소년보호처분 대상이 될 수 있고, 14세 이상 19세 미만은 사안에 따라 보호처분 또는 형사처벌을 받을 수 있습니다. 아래 법정형은 법에 정해진 범위이며, 이 인물에게 자동으로 선고되는 형량이 아닙니다.';
const C=[
  null,
  {
    "title": "가람의 구조 요청",
    "sub": "위험한 알바 · 마지막 문자 · 경찰과 구조",
    "authors": "정동훈 · 박서현 · 장준호",
    "desc": "“구해줘… 알바에 갔다가 갇혔어.” 가람의 문자를 경찰에게 보여주고 함께 도와주세요.",
    "intro": "친구 가람에게 “어딘지 모르겠어. 도와줘.”라는 문자가 왔습니다. 당신은 곧바로 경찰에게 알렸습니다. 경찰: “친구가 보낸 기록을 함께 확인해 봅시다. 현장에는 우리가 갑니다.”",
    "source": "창의융합 축전 영주경찰서 활동의 친구 구조 이야기를 참고한 가상 사건입니다. 고액 아르바이트로 유인된 가람이 도움을 요청하고, 친구인 참가자가 경찰과 기록을 확인해 구조를 돕습니다. 등장인물·장소·대사는 가상입니다.",
    "sourceUrl": "https://www.counterscam112.go.kr/",
    "sourceName": "경찰청 · 피싱안심SOS",
    "evidence": [
      {
        "title": "가람의 마지막 문자",
        "tag": "오후 4:18",
        "text": "“구해줘… 카페 알바에 갔다가 갇혔어. 창밖에 서쪽 문 표지판이 보여.” 이후 답장이 끊겼습니다.",
        "point": "경찰에게 마지막 연락 시간과 문자를 전달합니다. 친구에게 무리한 탈출이나 추가 촬영을 요구하지 않습니다."
      },
      {
        "title": "가람이 받은 모집 문자",
        "tag": "유인 경로",
        "text": "“하루 3시간, 최대 20만 원.” 카페 이름과 주소는 제대로 적혀 있지 않습니다. 경찰이 가람의 문자와 같은 연락처인지 확인합니다.",
        "point": "참가자는 경찰 옆에서 이미 받은 자료만 확인합니다. 모집자에게 실제로 지원하거나 개인정보를 보내지 않습니다."
      },
      {
        "title": "가방에 남은 장소 단서",
        "tag": "경찰과 현장 확인",
        "text": "경찰이 안전을 확인한 곳에서 가람의 가방을 찾았습니다. 꼬리표에는 “16:20 · 카페 뒤편 · 서쪽 문”이 적혀 있습니다.",
        "point": "직접 건물에 들어가지 않고 위치 단서를 경찰에게 전달합니다. 경찰이 구조 위치를 좁힙니다."
      }
    ],
    "decisions": [
      {
        "title": "구조 요청 문자를 받았다면",
        "scene": "가람의 답장이 끊겼습니다. 경찰에게 무엇부터 알려줄까요?",
        "opts": [
          "혼자 카페에 찾아가 문을 열어 달라고 한다",
          "안전한 곳에서 경찰에게 문자·마지막 연락 시간·장소 단서를 보여준다"
        ],
        "safe": 1,
        "results": [
          "혼자 찾아가면 당신도 위험할 수 있습니다. 경찰과 함께 도움을 연결하세요.",
          "경찰이 연락 시간과 위치를 확인합니다. 당신은 안전한 곳에서 친구의 특징과 알고 있는 사실을 설명합니다."
        ]
      },
      {
        "title": "같은 모집 문자가 왔다면",
        "scene": "경찰이 가람에게 온 문자와 비교해 달라고 합니다.",
        "opts": [
          "경찰 옆에서 연락처와 문구를 대조하고 이미 받은 화면만 보여준다",
          "친구를 찾으려고 혼자 지원하고 면접에 간다"
        ],
        "safe": 0,
        "results": [
          "경찰이 같은 유인 경로를 확인했습니다. 실제 연락과 현장 확인은 경찰이 맡습니다.",
          "혼자 지원하거나 만나러 가지 않습니다. 문자를 경찰에게 보여주고 안내를 따릅니다."
        ]
      },
      {
        "title": "가람이 위치 단서를 보냈다면",
        "scene": "“서쪽 문 근처야. 무서워.”라는 문자가 도착했습니다.",
        "opts": [
          "문을 부수고 나오라고 재촉한다",
          "경찰에게 즉시 보여주고 가람에게 구조 중이며 안전을 우선하라고 전한다"
        ],
        "safe": 1,
        "results": [
          "친구에게 위험한 탈출을 요구하지 않습니다. 경찰이 현장 상황에 맞춰 구조합니다.",
          "경찰이 서쪽 문 주변을 확인합니다. 당신은 안전한 곳에서 기다리며 가람을 안심시킵니다."
        ]
      }
    ],
    "timeline": [
      [
        "도착한 구조 요청",
        "당신은 가람의 문자를 경찰에게 보여주었습니다."
      ],
      [
        "경찰과 문자 대조",
        "모집 연락처·시간·가람의 마지막 말을 경찰과 함께 정리했습니다."
      ],
      [
        "가방과 장소 확인",
        "경찰이 안전을 확보한 곳에서 가방 단서를 확인하고 위치를 좁혔습니다."
      ],
      [
        "구조 계획 전달",
        "당신은 친구의 옷차림과 마지막 연락을 설명했습니다. 경찰이 현장 진입과 구조를 맡았습니다."
      ],
      [
        "가람과 다시 만나다",
        "경찰이 가람을 안전하게 데려왔습니다. 당신은 “도움 요청해 줘서 고마워. 이제 혼자가 아니야.”라고 말했습니다."
      ]
    ],
    "legal": [
      {
        "title": "경찰에게 보여줄 기록",
        "fact": "가람의 구조 요청과 모집 문자가 남아 있습니다.",
        "rule": "문자·연락처·마지막 연락 시간 등 이미 알고 있는 사실을 경찰에게 보여줍니다. 모르는 내용은 추측해서 채우지 않습니다.",
        "url": "force"
      },
      {
        "title": "현장에서는 누가 움직일까요?",
        "fact": "가람이 있는 것으로 보이는 건물이 확인됐습니다.",
        "rule": "참가자는 경찰이 안내한 안전한 곳에서 기다립니다. 현장 접근·수색·구조는 경찰이 맡습니다.",
        "url": "force"
      },
      {
        "title": "구조 후 친구에게 할 말",
        "fact": "가람이 무서웠던 일을 말하기 어려워합니다.",
        "rule": "친구를 탓하거나 같은 질문을 반복하지 않습니다. 쉬고 싶다는 뜻을 존중하며 보호자와 경찰의 지원을 연결합니다.",
        "url": "youth"
      }
    ],
    "lawQuestion": "가람을 찾을 단서가 모였을 때 당신의 역할은?",
    "lawOptions": [
      "자료를 경찰에게 전달하고 안전한 곳에서 구조를 돕는다",
      "경찰보다 먼저 건물에 들어가 가람을 찾는다"
    ],
    "lawAnswer": 0,
    "fieldTitle": "가람 구조 협력 카드",
    "fieldText": "체험용 · 친구 구조 기록\n마지막 문자: 오후 4:18 / 카페 알바 / 서쪽 문\n확인 자료: 모집 연락처 / 가방 꼬리표 / 친구의 옷차림\n내 역할: 경찰에게 사실 전달 / 안전한 곳에서 대기 / 친구 안심시키기",
    "fieldQuestion": "서쪽 문 단서를 확인한 뒤 무엇을 할까요?",
    "fieldOptions": [
      "경찰에게 위치를 전달하고 안내한 곳에서 기다린다",
      "혼자 문을 열고 들어간다"
    ],
    "fieldAnswer": 0,
    "phrase": "“제 친구 가람이 알바 장소에 갇혔다고 연락했어요. 마지막 문자는 오후 4시 18분이고 서쪽 문 표지판이 보인대요. 이 문자를 함께 확인하고 친구를 도와주세요.”",
    "plans": [
      [
        "구조 요청",
        "문자 확인 → 경찰에게 알리기 → 마지막 연락 전달"
      ],
      [
        "경찰과 협력",
        "이미 받은 단서 대조 → 위치 설명 → 안전한 곳에서 기다리기"
      ],
      [
        "구조 후",
        "친구 탓하지 않기 → 안심시키기 → 보호자와 지원 연결"
      ]
    ],
    "end": "당신이 전한 마지막 문자와 가방 단서를 바탕으로 경찰이 가람을 구조했습니다. 가람은 “내 말을 믿고 도와줘서 고마워.”라고 말합니다. 당신은 친구 곁에서 기다리고, 보호자와 경찰이 회복을 도울 수 있도록 함께합니다."
  },
  {
    "title": "딱 10만원만 해본다",
    "sub": "친구의 문자 · 첫 승리 · 빚 50만 원 · 도움 요청",
    "authors": "이준서 · 김정탁",
    "desc": "친구가 보낸 문자로 시작한 민우. 첫 승리 뒤 반복한 게임은 빚 50만 원으로 이어졌습니다.",
    "intro": "“야, 너도 한 번 해봐.” 친구의 문자가 왔습니다. 민우는 딱 10만 원만 해보려 합니다. 게임과 손실, 아버지와의 대화를 거쳐 위험 신호를 확인하고 상담 도움을 연결하세요.",
    "source": "사용자가 지정한 youth112의 호기심, 초기 이익, 반복 참여, 손실 만회 심리와 중단 선택이라는 흐름을 참고해 민우의 가상 이야기로 재구성했습니다. 금액과 선택 결과는 교육용 고정 연출입니다.",
    "sourceUrl": "https://makav121.github.io/youth112/",
    "sourceName": "사용자 제공 · 영주 청소년 수사대 참고 체험",
    "evidence": [
      {
        "title": "궁금해서 열어본 링크",
        "tag": "참여 전의 대화",
        "text": "친구가 게임 링크를 보내자 민우는 어떤 곳인지 궁금해졌습니다. 작은 금액이면 괜찮을 거라고 생각했습니다.",
        "point": "호기심과 실제 송금은 다른 선택입니다. 링크를 받았다고 참여할 필요는 없습니다."
      },
      {
        "title": "잔액이 늘어난 첫 경험",
        "tag": "초기 이익",
        "text": "민우가 넣은 가상 금액 10만 원이 첫 결과 뒤 14만 원이 됐습니다. 민우는 다음에도 돈을 벌 수 있을 것 같았습니다.",
        "point": "한 번의 이익으로 다음 결과를 예측할 수 없습니다. 이 체험의 결과는 고정되어 있습니다."
      },
      {
        "title": "손실 뒤 남긴 메시지",
        "tag": "만회하려는 마음",
        "text": "민우는 20만 원을 더 넣고 반복하다 잔액을 모두 잃었습니다. 지금까지 넣은 돈은 30만 원. “조금 더 하면 되찾을 수 있을까?”라고 묻습니다.",
        "point": "이미 잃은 돈 때문에 추가로 돈을 넣으려는 변화에 주목하세요. 더 보내기 전에 중단과 도움 요청을 선택할 수 있습니다."
      }
    ],
    "decisions": [
      {
        "title": "친구가 링크를 보냈을 때",
        "scene": "민우가 “어떤 게임인지 궁금한데, 적은 돈만 해볼까?”라고 합니다.",
        "opts": [
          "링크를 함께 열고 돈을 조금 넣어본다",
          "참여와 송금을 하지 않고 다른 활동을 제안한다"
        ],
        "safe": 1,
        "results": [
          "작은 금액이라는 생각이 참여의 부담을 낮췄습니다. 아직 송금 전이라면 중단할 수 있습니다.",
          "민우와 돈을 걸지 않는 활동을 골랐습니다. 호기심을 꼭 송금으로 이어갈 필요는 없습니다."
        ]
      },
      {
        "title": "첫 결과로 돈을 땄을 때",
        "scene": "민우가 늘어난 잔액을 보며 “이 정도면 더 해도 되겠다.”라고 말합니다.",
        "opts": [
          "우연한 이익이 다음 결과를 보장하지 않는다고 말하고 멈춘다",
          "방금 땄으니 더 큰 금액으로 계속해 본다"
        ],
        "safe": 0,
        "results": [
          "첫 이익을 근거로 금액을 키우지 않았습니다. 접속을 멈추고 다음 송금을 하지 않습니다.",
          "민우는 처음의 성공을 믿고 금액을 늘렸습니다. 다음에도 이긴다는 근거는 없습니다."
        ]
      },
      {
        "title": "돈을 잃고 되찾고 싶을 때",
        "scene": "민우가 “30만 원만 되찾으면 끝낼게. 한 번만 더 넣을까?”라고 묻습니다.",
        "opts": [
          "되찾을 때까지 더 넣도록 돈을 빌려준다",
          "추가 송금을 멈추고 믿을 만한 어른과 도움을 의논한다"
        ],
        "safe": 1,
        "results": [
          "빌린 돈까지 잃을 수 있고 손실이 커질 수 있습니다. 중단은 돈을 되찾은 뒤로 미룰 필요가 없습니다.",
          "민우를 탓하지 않고 함께 접속을 멈췄습니다. 보호자나 교사에게 상황을 말하고 상담 도움을 찾습니다."
        ]
      }
    ],
    "timeline": [
      [
        "호기심",
        "친구가 보낸 링크를 보고 작은 금액으로 시작할 생각을 했습니다."
      ],
      [
        "첫 이익",
        "10만 원이 14만 원으로 늘자 더 벌 수 있을 것 같았습니다."
      ],
      [
        "반복과 손실",
        "20만 원을 추가한 뒤 반복하다 잔액을 모두 잃었습니다. 총 투입액은 30만 원입니다."
      ],
      [
        "다음 선택",
        "돈을 더 넣어 만회하려는 마음을 알아차리고 중단을 선택할 수 있습니다."
      ],
      [
        "도움과 회복",
        "실수를 숨기거나 혼자 해결하기보다 보호자·교사에게 알리고 상담 도움을 의논합니다."
      ]
    ],
    "legal": [
      {
        "title": "처음의 이익과 다음 결과",
        "fact": "처음 돈을 땄다는 이유로 금액을 늘리고 싶어졌습니다.",
        "rule": "첫 결과는 다음 이익을 보장하지 않습니다. 추가 참여를 멈추고 상황을 차분히 살펴봅니다.",
        "url": "gamble"
      },
      {
        "title": "손실 뒤 달라진 행동",
        "fact": "호기심이었던 이유가 잃은 돈을 되찾으려는 마음으로 바뀌었습니다.",
        "rule": "만회를 위해 금액과 횟수를 늘리는 변화를 위험 신호로 봅니다. 추가 송금이나 돈 빌리기를 멈춥니다.",
        "url": "gamble"
      },
      {
        "title": "혼자 감당하지 않기",
        "fact": "민우가 창피해서 어른에게 말하기 어렵다고 합니다.",
        "rule": "비난 대신 이야기를 듣고 보호자·교사와 도움을 의논합니다. 기록은 추가 참여 없이 이미 남은 것만 확인합니다.",
        "url": "youth"
      }
    ],
    "lawQuestion": "민우에게서 가장 주의 깊게 볼 변화는?",
    "lawOptions": [
      "게임 이야기를 했다는 사실",
      "잃은 돈을 되찾으려고 송금액을 늘리려는 행동"
    ],
    "lawAnswer": 1,
    "fieldTitle": "민우의 잔액 변화 카드",
    "fieldText": "체험용 · 고정된 가상 기록\n첫 투입 100,000원 → 첫 이익 40,000원 → 잔액 140,000원\n추가 투입 200,000원 → 잔액 340,000원 → 반복 손실 뒤 0원\n총 투입액 300,000원 / 누적 손실 300,000원\n다음 행동: 추가 송금 중단 / 돈 빌리지 않기 / 믿을 만한 어른과 의논",
    "fieldQuestion": "잔액이 0원인 민우가 더 넣겠다고 하면?",
    "fieldOptions": [
      "접속과 송금을 멈추고 보호자나 교사에게 함께 이야기한다",
      "손실을 되찾을 때까지 빌린 돈으로 계속한다"
    ],
    "fieldAnswer": 0,
    "phrase": "“호기심에 돈을 걸었다가 처음엔 땄고 나중에 잃었어요. 잃은 돈을 되찾고 싶어서 계속 접속하고 싶어요. 더 보내기 전에 멈출 수 있도록 도와주세요.”",
    "plans": [
      [
        "참여 전",
        "호기심 알아차리기 → 링크와 송금 중단"
      ],
      [
        "이익·손실 뒤",
        "첫 이익 과신하지 않기 → 만회를 위한 추가 참여 멈추기"
      ],
      [
        "도움 요청",
        "비난 없이 듣기 → 보호자·교사와 상담 의논"
      ]
    ],
    "end": "민우는 돈을 되찾을 때까지 계속해야 한다는 생각에서 벗어나 추가 송금을 멈췄습니다. 당신은 민우를 탓하지 않고 보호자와 이야기할 수 있게 곁에 있었습니다. 돈을 잃은 사실을 숨기지 않고 도움을 받는 것이 회복의 시작입니다."
  },
  {
    "title": "하린의 일상을 지켜라",
    "sub": "합성물 협박 · 확산 중단 · 경찰과 친구 지원",
    "authors": "정세영 · 이준호",
    "desc": "“사진을 퍼뜨린대. 무서워.” 하린의 말을 믿고 경찰과 함께 도와주세요.",
    "intro": "친구 하린에게 “내 사진으로 이상한 걸 만들었대. 더 보내지 않으면 퍼뜨린대.”라는 연락이 왔습니다. 당신은 하린을 안심시키고 경찰과 함께 피해물을 열지 않는 단서 확인을 시작합니다.",
    "source": "동의 없는 성적 합성과 유포 협박을 소재로 구성한 친구 지원 가상 이야기입니다. 참가자는 하린의 의사를 존중하며 경찰에게 목격 정보를 전달하고 추가 확산을 막는 데 협력합니다.",
    "sourceUrl": "https://theyouthacademy.police.go.kr/bbs/view.do?bbsId=cardnews&pageNum=9&wr_id=54",
    "sourceName": "경찰청 유스폴넷 · 딥페이크 예방자료",
    "evidence": [
      {
        "title": "하린의 도움 요청",
        "tag": "친구에게 온 문자",
        "text": "“더 보내지 않으면 퍼뜨린대. 누구한테 말해야 할지 모르겠어.” 하린이 도움을 요청했습니다.",
        "point": "“네 잘못이 아니야. 함께 도움을 받자.”라고 말합니다. 추가 사진이나 돈을 보내라고 하지 않습니다."
      },
      {
        "title": "대화방의 위치 정보",
        "tag": "피해물 대신 단서",
        "text": "목격자가 대화방 이름·계정·게시 시간을 알려줬습니다. 피해 사진과 영상은 열거나 전달하지 않습니다.",
        "point": "경찰이 안내한 방법으로 이미 알고 있는 위치 정보를 설명합니다. 친구들에게 파일을 보내 확인받지 않습니다."
      },
      {
        "title": "확산을 막는 협력",
        "tag": "경찰과 지원 연결",
        "text": "경찰이 협박 내용을 확인하고 전문 지원기관과 연결할 방법을 안내합니다. 당신은 하린이 믿는 어른에게 함께 말하자고 제안합니다.",
        "point": "신고와 지원 과정에서도 친구의 뜻을 존중합니다. 피해 설명을 여러 사람 앞에서 반복하게 하지 않습니다."
      }
    ],
    "decisions": [
      {
        "title": "하린이 자신을 탓한다면",
        "scene": "“내가 사진을 올린 게 잘못인가 봐.” 하린이 고개를 숙입니다.",
        "opts": [
          "사진을 왜 올렸냐고 따진다",
          "하린의 잘못이 아니라고 말하고 경찰과 함께 도움을 받자고 한다"
        ],
        "safe": 1,
        "results": [
          "비난은 친구를 더 고립시킵니다. 합성·유포·협박을 한 사람의 행동이 문제입니다.",
          "하린은 안심하고 도움을 요청합니다. 당신은 친구가 믿는 어른과 경찰을 연결합니다."
        ]
      },
      {
        "title": "확인용으로 파일을 보내 달라면",
        "scene": "다른 친구가 “나도 봐야 도울 수 있어.”라고 합니다.",
        "opts": [
          "재전송하지 않고 위치·계정·시간을 경찰에게 설명한다",
          "확인용이니 친구들에게 전달한다"
        ],
        "safe": 0,
        "results": [
          "추가 확산을 막았습니다. 실제 자료의 보존 방법은 경찰의 안내를 받습니다.",
          "파일 전달은 피해를 더 퍼뜨릴 수 있습니다. 피해물 대신 목격 정보로 도움을 요청하세요."
        ]
      },
      {
        "title": "추가 사진을 요구받았다면",
        "scene": "하린은 “보내면 그만하겠지?”라고 말합니다.",
        "opts": [
          "요구대로 한 장만 보내라고 한다",
          "추가 요구에 응하지 않도록 곁에 있고 경찰과 지원기관을 연결한다"
        ],
        "safe": 1,
        "results": [
          "더 보내도 협박이 끝난다는 보장이 없습니다. 혼자 대응하지 않도록 도와주세요.",
          "당신과 하린은 경찰에게 협박 문자를 보여주고 안전과 지원 방법을 함께 확인합니다."
        ]
      }
    ],
    "timeline": [
      [
        "하린의 연락",
        "당신은 하린의 말을 믿고 친구 잘못이 아니라고 말했습니다."
      ],
      [
        "추가 확산 멈추기",
        "피해물을 열거나 재전송하지 않고 목격한 위치 정보를 정리했습니다."
      ],
      [
        "경찰에게 단서 전달",
        "하린이 동의한 도움 요청에 동행해 협박과 대화방 정보를 설명했습니다."
      ],
      [
        "신고와 삭제지원 연결",
        "경찰과 전문기관이 각자의 역할에 따라 확인과 지원을 진행했습니다."
      ],
      [
        "일상으로 돌아갈 준비",
        "모든 문제가 한 번에 끝났다고 단정하지 않고 하린의 뜻에 맞춰 지속적인 보호와 상담을 연결했습니다."
      ]
    ],
    "legal": [
      {
        "title": "친구의 말을 믿어주기",
        "fact": "하린이 자신을 탓하고 있습니다.",
        "rule": "동의 없는 합성과 협박은 하린의 잘못이 아닙니다. 친구의 말을 듣고 도움을 받을 사람을 함께 찾습니다.",
        "url": "fake"
      },
      {
        "title": "피해물 없이 도움 요청하기",
        "fact": "대화방 이름과 게시 시간이 남아 있습니다.",
        "rule": "피해물을 새로 내려받거나 전달하지 않고 이미 알고 있는 위치 정보를 경찰에게 알립니다.",
        "url": "fake"
      },
      {
        "title": "친구 뜻을 존중하기",
        "fact": "하린은 여러 사람에게 알려지는 것이 두렵습니다.",
        "rule": "누구에게 어떤 도움을 요청할지 함께 의논합니다. 신고와 지원 과정에서는 경찰과 전문기관의 안내를 받습니다.",
        "url": "child"
      }
    ],
    "lawQuestion": "하린을 돕기 위해 꼭 피해물을 친구들에게 보여줘야 할까요?",
    "lawOptions": [
      "아니다. 피해물을 퍼뜨리지 않고 목격 정보로 경찰과 지원기관에 도움을 요청한다",
      "그렇다. 모두에게 보내 확인부터 받아야 한다"
    ],
    "lawAnswer": 0,
    "fieldTitle": "하린 보호 협력 카드",
    "fieldText": "체험용 · 친구 지원 기록\n알릴 정보: 협박 내용 / 대화방 이름 / 계정 / 게시 시간\n하지 않을 일: 피해물 재전송 / 확인용 다운로드 / 친구 비난\n함께 할 일: 경찰에게 도움 요청 / 전문지원 연결 / 친구 뜻 존중",
    "fieldQuestion": "친구의 일상을 지키는 행동은?",
    "fieldOptions": [
      "피해물을 다른 친구에게 보내 도움을 구한다",
      "추가 확산을 막고 하린과 함께 경찰에게 도움을 요청한다"
    ],
    "fieldAnswer": 1,
    "phrase": "“친구 하린이 사진 합성과 유포 협박을 받고 있어요. 피해물을 다시 보내지 않고 대화방 위치와 협박 내용을 설명하고 싶어요. 친구의 안전과 삭제지원 방법을 함께 알려주세요.”",
    "plans": [
      [
        "곁에 있기",
        "친구 잘못이 아니라고 말하기 → 원하는 도움 듣기"
      ],
      [
        "경찰과 협력",
        "재전송 중단 → 목격 정보·협박 내용 전달"
      ],
      [
        "일상 지키기",
        "전문지원 연결 → 설명 강요하지 않기 → 지속적으로 안부 묻기"
      ]
    ],
    "end": "당신은 하린의 말을 믿고 경찰과 지원기관에 도움을 연결했습니다. 피해물을 재전송하지 않아 추가 확산도 막았습니다. 하린이 원하는 속도로 일상을 되찾도록 곁에 머무는 것, 그것도 친구를 지키는 중요한 행동입니다."
  }
];
const stageNames=['사건 자료','선택과 결과','친구 구조 과정','보호 방법 확인','현장 연결','도움 행동'];
function origin(n){let a=authors.filter(x=>C[n].authors.includes(x[0]));return `<div class="source"><b>이 장면에 가져온 아이디어</b><br>${a.map(x=>`${x[0]} · ${x[1]} → ${x[2].split(' · ')[1]}`).join('<br>')}<span>원작 게임의 규칙·전투를 재현하지 않고 관찰·판단·대응 아이디어를 사용했습니다.</span></div>`}
function renderHome(){let done=S.cases.slice(1).filter(x=>x.done).length;$('#app').innerHTML=`<section class="hero"><div><div class="label">YOUNGJU / THREE CASES · RECONSTRUCTED</div><h1>위험에 빠진 친구를,<br>경찰과 함께 도와주세요.</h1><p>고액 알바 · 무료 이벤트 · AI 성적 합성<br>세 친구의 도움 요청을 듣고 경찰과 단서를 확인해 구조와 회복을 돕습니다.</p><span class="badge">체험 완료 ${done}/3</span><span class="badge">시즌별 약 12~18분</span><span class="badge">오프라인 실행</span></div><div class="hero-art">${covers[1]}</div></section><div class="card"><b>1인 체험</b><div class="small">친구의 구조 요청을 받은 주인공이 되어 경찰 옆에서 단서를 확인하세요.</div></div><section class="seasons">${[1,2,3].map(n=>`<article class="season"><div class="art">${covers[n-1]}</div><div class="body"><div class="label">SEASON 0${n}</div><h2>${C[n].title}</h2><span class="badge">${C[n].sub}</span><p>${C[n].desc}</p><p class="small">아이디어 출처 · ${C[n].authors}</p><div class="row"><button class="primary" onclick="enter(${n})">${S.cases[n].done?'체험 기록 보기':S.cases[n].unlocked?'체험 이어하기':'사건 열기'} →</button>${S.cases[n].unlocked||S.cases[n].done?`<button onclick="resetSeason(${n})">다시</button>`:''}</div></div></article>`).join('')}</section><div class="notice"><b>실제 범죄 유형을 참고한 교육용 가상 재구성</b><br>등장인물·대사·금액·결말은 가상입니다. 법률은 2026-09-28 확인 기준이며 기관 감수 전 시안입니다. 실제 신고·결제·개인정보 입력은 실행하지 않습니다. 불편한 장면은 언제든 나가거나 도움 행동부터 볼 수 있습니다.</div><div class="row"><button onclick="credits()">7개 원작 아이디어 연결표</button><button onclick="references()">재구성 근거 · 법령 출처</button><button onclick="guide()">체험 안내</button></div>`}
function render(){if(!current)return renderHome();let a=S.cases[current],c=C[current];if(a.done)return ending();let step=a.step;$('#app').innerHTML=`<div class="mission"><div><div class="label">SEASON 0${current} / ${step+1} OF 6</div><h2>${c.title}</h2><p>${c.sub}</p></div><button class="quiet skip" onclick="safeExit()">잠시 쉬기 · 도움 행동</button></div><nav class="chapter-nav" aria-label="체험 단계">${stageNames.map((v,i)=>`<button class="${i===step?'active':''}" ${i>a.unlocked?'disabled':''} onclick="gotoStep(${i})">${i+1}. ${v}</button>`).join('')}</nav><div class="layout"><section>${[renderEvidence,renderDecisions,renderTimeline,renderLaw,renderField,renderPractice][step]()}</section><aside class="side"><span class="label">CASE NOTE</span><h3 style="margin-top:12px">경찰과 함께, 친구를 안전하게</h3><p class="small">당신은 단서를 전달하고 경찰은 현장 확인과 구조를 맡습니다.</p><button onclick="sourceInfo(${current})">이 사건의 재구성 근거</button><button onclick="showYouth()">나이에 따른 법적 절차</button><button onclick="supportInfo()">실제 도움기관</button><button onclick="hint()">현재 단계 안내</button><button onclick="home()">시즌 선택으로</button><p class="small">1인 체험 · 진행 자동 저장</p></aside></div>`}
function controls(ready,label='다음 단계'){return `<div class="controls row">${S.cases[current].step>0?'<button onclick="gotoStep(S.cases[current].step-1)">← 이전</button>':''}<button id="nextStep" class="primary" ${ready?'':'disabled'} onclick="nextStep()">${label} →</button></div>`}
function gotoStep(i){let a=S.cases[current];if(i<0||i>a.unlocked)return;a.step=i;save();render();window.scrollTo(0,0)}
function ready(){let a=S.cases[current];return [a.read.length===3,Object.keys(a.decisions).length===3,!!a.chronicle,a.laws.length===3&&a.lawOk,!!a.field,!!a.practice][a.step]}
function nextStep(){if(!ready())return;let a=S.cases[current];if(a.step===5){a.done=true;a.completedMode=S.mode;save();render();return}a.step++;a.unlocked=Math.max(a.step,a.unlocked);save();render();window.scrollTo(0,0)}
function renderEvidence(){let c=C[current],a=S.cases[current];return `<div class="card reading"><span class="label">CASE BRIEF</span><h2 style="margin-top:12px">남겨진 세 가지 자료</h2><p>${c.intro}</p></div><div class="record-grid">${c.evidence.map((e,i)=>`<button onclick="readEvidence(${i})"><span class="label">RECORD 0${i+1}</span><strong>${e.title}</strong><small>${e.tag}<br>${a.read.includes(i)?'✓ 확인함':'열어서 확인'}</small></button>`).join('')}</div><p class="small" style="margin-top:15px">기록 ${a.read.length}/3 확인 · 자료 내용은 수사상 사실 확정을 대신하지 않습니다.</p>${controls(a.read.length===3,'선택의 순간으로')}`}
function readEvidence(i){let a=S.cases[current],e=C[current].evidence[i];if(!a.read.includes(i))a.read.push(i);save();render();show(e.title,`<div class="label">가상 사건 기록 · ${e.tag}</div><div class="paper reading">${e.text}</div><details class="notice"><summary>단서 해설</summary><p>${e.point}</p></details><button class="primary" onclick="closeModal()">단서 기록 ✓</button>`)}
function renderDecisions(){let a=S.cases[current],c=C[current];return `<div class="card"><h2>그 순간에 무엇을 할까요?</h2><p>친구 곁에서 어떤 도움을 줄까요? 경찰과 협력하는 행동을 선택해 보세요.</p></div>${c.decisions.map((d,i)=>`<article class="card decision"><div class="label">DECISION 0${i+1}</div><h3 style="margin-top:10px">${d.title}</h3><p>${d.scene}</p>${d.opts.map((x,j)=>`<button class="choice ${a.decisions[i]===j?'selected':''}" onclick="decide(${i},${j})">${x}</button>`).join('')}${a.decisions[i]!==undefined?`<div class="result-box" role="status"><b>${a.decisions[i]===d.safe?'도움으로 이어지는 선택':'이 선택 뒤의 위험'}</b><p style="margin:10px 0 0">${d.results[a.decisions[i]]}</p><details><summary>다른 선택의 결과도 보기</summary><p>${d.results[1-a.decisions[i]]}</p></details></div>`:''}</article>`).join('')}${controls(Object.keys(a.decisions).length===3,'후일담')}`}
function decide(i,j){S.cases[current].decisions[i]=j;let y=window.scrollY;save();render();window.scrollTo(0,y)}
function renderTimeline(){let c=C[current],a=S.cases[current];return `<div class="card"><span class="label">RECONSTRUCTION / 가상 기록</span><h2 style="margin-top:12px">친구를 돕기 위해 함께한 일</h2><p>당신의 도움과 경찰의 대응으로 친구를 보호하는 가상 기록입니다.</p>${c.timeline.map((x,i)=>`<div class="timeline-entry"><div class="label">${String(i+1).padStart(2,'0')}</div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}<label class="checkbox-label"><input type="checkbox" ${a.chronicle?'checked':''} onchange="setFlag('chronicle',this.checked)"><span>친구 보호 과정 확인</span></label></div>${controls(!!a.chronicle,'보호 방법 확인')}`}
function setFlag(key,v){S.cases[current][key]=v;save();let b=$('#nextStep');if(b)b.disabled=!ready()}
function renderLaw(){let a=S.cases[current],c=C[current];return `<div class="card"><span class="label">SAFETY CHECK / 친구 보호</span><h2 style="margin-top:12px">경찰과 함께 친구를 지키는 방법</h2><details class="notice warning"><summary>나이에 따른 법적 절차</summary><p>${youthNote}</p></details><p>친구를 돕는 세 가지 방법을 각각 열어 확인하세요.</p>${c.legal.map((l,i)=>`<button class="choice" onclick="openLaw(${i})">${a.laws.includes(i)?'✓':'＋'} ${l.title}</button>`).join('')}<p class="small">확인 ${a.laws.length}/3 · 법률 적용과 처분은 증거·고의·나이·강요 등 구체적 사정에 따라 달라집니다.</p></div><div class="card"><h3>${c.lawQuestion}</h3>${c.lawOptions.map((x,i)=>`<button class="choice ${a.lawOk&&i===c.lawAnswer?'selected':''}" onclick="lawAnswer(${i})">${x}</button>`).join('')}${a.lawFeedback?`<div class="notice" role="status">${a.lawFeedback}</div>`:''}</div>${controls(a.laws.length===3&&a.lawOk,'현실의 자료와 대조')}`}
function openLaw(i){let a=S.cases[current],l=C[current].legal[i];if(!a.laws.includes(i))a.laws.push(i);save();render();show(l.title,`<p>${l.fact}</p><div class="notice reading">${l.rule}</div><details class="law-note"><summary>나이에 따른 절차</summary><p>${youthNote}</p></details><p><a href="${lawUrls[l.url]}" target="_blank" rel="noopener">관련 법령·공식 안내 원문 ↗</a></p><button class="primary" onclick="closeModal()">확인 ✓</button>`)}
function lawAnswer(i){let a=S.cases[current],c=C[current];a.lawOk=i===c.lawAnswer;a.lawFeedback=a.lawOk?'친구를 지키는 선택입니다. 경찰의 안내에 따라 함께 도와주세요.':'다시 생각해 보세요. 친구의 안전과 경찰에게 도움을 연결하는 행동을 먼저 살펴보세요.';save();render()}
function renderField(){let c=C[current],a=S.cases[current];return `<div class="card"><span class="label">OFFLINE CONNECTION</span><h2 style="margin-top:12px">${c.fieldTitle}</h2><p>${S.mode==='field'?'진행자에게 이 이름의 인쇄 카드를 요청하세요. 부스·교실 안에서 카드 내용과 사건 자료를 함께 비교합니다.':'아래 화면 카드를 열어 사건 자료와 비교하세요. 현장에서는 동일한 인쇄 카드를 사용합니다.'}</p><div class="row"><button onclick="fieldCard(false)">${S.mode==='field'?'인쇄 카드를 확인했어요':'화면 카드 열기'}</button>${S.mode==='field'?'<button onclick="fieldCard(true)">인쇄물이 없어요 · 화면으로 대체</button>':''}</div>${a.fieldRead?`<div class="paper">${c.fieldText.replaceAll('\n','<br>')}</div><h3>${c.fieldQuestion}</h3>${c.fieldOptions.map((x,i)=>`<button class="choice ${a.field&&i===c.fieldAnswer?'selected':''}" onclick="fieldAnswer(${i})">${x}</button>`).join('')}${a.fieldFeedback?`<div class="notice" role="status">${a.fieldFeedback}</div>`:''}`:'<p class="small" style="margin-top:20px">실제 계좌·신분증·사진·피해 경험을 가져오거나 제출하지 않습니다.</p>'}</div>${controls(!!a.field,'도움 요청')}`}
function fieldCard(fallback){let a=S.cases[current];a.fieldRead=true;a.fallback=fallback;save();render()}
function fieldAnswer(i){let a=S.cases[current],c=C[current];a.field=i===c.fieldAnswer;a.fieldFeedback=a.field?'단서 연결 완료.':'카드의 행동 지침을 다시 확인하세요.';save();render()}
function renderPractice(){let a=S.cases[current],c=C[current];return `<div class="card"><span class="label">ASK FOR HELP</span><h2 style="margin-top:12px">한 문장을 현실에서 말해보세요.</h2><p>도움을 청할 어른을 떠올리며 혼자 읽어보세요.</p><div class="bubble reading">${c.phrase}</div><p class="small">소리 내거나 마음속으로 읽어도 됩니다.</p>${c.plans.map(x=>`<div class="legal-item"><b>${x[0]}</b><p style="margin:8px 0">${x[1]}</p></div>`).join('')}<label class="checkbox-label"><input id="practiceCheck" type="checkbox" ${a.practice?'checked':''} onchange="setFlag('practice',this.checked)"><span>도움 요청 연습 완료</span></label></div>${controls(!!a.practice,'사건 완료')}`}
function ending(){let n=current,c=C[n],a=S.cases[n];$('#app').innerHTML=`<section class="end"><div class="label">SEASON 0${n} / EXPERIENCE COMPLETED</div><h1>${c.title}<br>이제 현실의 행동으로.</h1><p class="reading">${c.end}</p><div class="card"><h3>내가 비교한 선택</h3>${c.decisions.map((d,i)=>`<div class="legal-item"><b>${d.title}</b><p>${d.opts[a.decisions[i]]}</p><div class="small">${d.results[a.decisions[i]]}</div></div>`).join('')}</div><div class="card"><h3>기억할 세 가지 행동</h3>${c.plans.map(x=>`<p>✓ <b>${x[0]}</b> · ${x[1]}</p>`).join('')}</div><div class="notice"><b>친구를 혼자 두지 않고, 경찰과 함께</b><br>${youthNote}</div>${origin(n)}<div class="card"><h3>혼자 되짚기</h3><p>① 처음 알아차릴 수 있었던 위험 신호는?<br>② 친구를 보호하기 위해 경찰에게 전달할 단서는?<br>③ 같은 상황이라면 누구에게 어떤 문장으로 도움을 요청할까?</p><small class="small">1인 체험. 완료 기록은 학습 행동 확인이며 개인 위험도나 예방 효과를 판정한 결과가 아닙니다.</small></div><div class="row"><button class="primary" onclick="home()">시즌 선택으로</button><button onclick="supportInfo()">도움기관 보기</button><button onclick="resetSeason(${n})">다시 체험</button><button onclick="references()">근거 자료</button></div></section>`}
function safeExit(){let c=C[current];show('지금 도움 행동부터 보기',`<p>체험을 멈추거나 사건 설명을 건너뛰어도 됩니다. 완료 여부와 관계없이 도움을 받을 수 있습니다.</p><div class="bubble">${c.phrase}</div>${c.plans.map(x=>`<p><b>${x[0]}</b> · ${x[1]}</p>`).join('')}<div class="row"><button class="primary" onclick="supportInfo()">도움기관</button><button onclick="home()">시즌 선택으로 나가기</button><button onclick="closeModal()">체험 계속</button></div>`)}
function showYouth(){show('나이와 법적 절차',`<div class="notice">${youthNote}</div><p>보호관찰·수강명령 같은 소년보호처분은 형사처벌과 구별됩니다. 보호처분을 받았다는 사실만으로 “징역형을 선고받았다”고 표현하지 않습니다.</p><p>피해를 당한 상황과 다른 사람에게 가한 행위는 별도로 확인합니다. 강요·협박이 있었다면 그 사정을 알리고 법률 도움을 받으세요.</p><a href="${lawUrls.youth}" target="_blank" rel="noopener">찾기쉬운 생활법령 · 청소년의 형사 책임 ↗</a>`)}
function sourceInfo(n){show('시즌 '+n+' · 참고한 내용과 새로 만든 내용',`<p>${C[n].source}</p><p><a href="${C[n].sourceUrl}" target="_blank" rel="noopener">${C[n].sourceName} ↗</a>${C[n].officialUrl?`<br><a href="${C[n].officialUrl}" target="_blank" rel="noopener">MBC 공식 방송 소개 ↗</a>`:''}</p><div class="notice">특정 피해자·학교·업체·국민 전체를 지목하지 않습니다. 대사·금액·후일담은 이 예방체험을 위한 가상 설정입니다. 기관의 공식 승인·감수를 받은 자료는 아닙니다.</div>${origin(n)}`)}
function credits(){show('7개 학생 작품 · 아이디어 적용표',`<p>일곱 작품의 아이디어를 세 시즌에 모두 연결했습니다. 원작 게임을 그대로 이식한 것은 아닙니다.</p><div class="credits-wrap"><table class="credits-table"><thead><tr><th>학생 작품</th><th>가져온 아이디어</th><th>현재 적용</th></tr></thead><tbody>${authors.map(x=>`<tr>${x.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="small" style="margin-top:15px">각 시즌 화면에도 이름·원작 아이디어·재구성한 방식을 반복 표시합니다.</p>`)}
function hint(){const h=['사건 자료 세 개를 각각 열고 관찰할 점을 읽으세요.','세 상황에서 행동을 하나씩 선택하세요. 다른 선택의 결과도 펼쳐 비교할 수 있습니다.','가상 후일담을 읽고 아래 확인란을 체크하세요.','행위별 설명 세 개를 열고 마지막 질문을 판단하세요.','화면 카드를 열어 단서와 대조하고 답하세요.','도움 문장을 혼자 읽고 확인란을 체크하세요.'];show('현재 단계 안내',`<div class="notice">${h[S.cases[current].step]}</div><p>실제 신고·촬영·금융정보 입력·도박 참여는 하지 않습니다.</p>`)}
function guide(){show('1인 체험 안내','<p>시즌 선택 → 경찰과 단서 확인 → 도움 선택 → 친구 보호 → 회복 응원.</p><p>단서는 화면에서 확인하거나 본인 물건을 촬영하세요. 카메라와 인쇄물 없이도 완료할 수 있습니다.</p><p>도움 문장은 소리 내거나 마음속으로 읽고 완료를 체크하세요. 진행은 자동 저장됩니다.</p><div class="notice">교육용 가상 사건입니다. 실제 개인정보·금융수단·피해 사진은 사용하지 않습니다.</div>')}
function supportInfo(){show('실제 도움기관',`<p>체험 버튼은 실제 통화나 신고를 실행하지 않습니다. 현재 위험이 있다면 체험을 멈추고 안전한 곳에서 도움을 요청하세요.</p><div class="card"><h3>감금·협박 등 긴급 위험 · 112</h3><p>카페 면접 장소에 갇혔거나 보이스피싱 가담을 강요받는다는 연락을 받으면 경찰에 위치와 마지막 연락 내용을 알리세요.</p></div><div class="card"><h3>카드·통장 관련 피해</h3><p>거래 금융회사에 즉시 사용정지 등 필요한 조치를 문의하고 경찰에 경위를 알리세요. 피싱 신고·상담 <b>1394</b>.</p><a href="https://www.counterscam112.go.kr/" target="_blank" rel="noopener">경찰청 피싱안심SOS ↗</a></div><div class="card"><h3>도박문제 · 1336</h3><p>그만두기 어렵거나 빚·재참여가 걱정될 때 믿을 수 있는 어른과 전문상담을 연결하세요.</p><a href="https://www.kcgp.or.kr/portal/main/contents.do?menuNo=200062" target="_blank" rel="noopener">한국도박문제예방치유원 상담 안내 ↗</a></div><div class="card"><h3>디지털 성범죄 피해지원</h3><p>중앙디지털성범죄피해자지원센터 <b>02-735-8994</b><br>상담·삭제지원 등 도움을 요청할 수 있습니다. 새로 피해물을 내려받거나 친구에게 전달해 증명할 필요는 없습니다.</p><a href="https://d4u.stop.or.kr/ko/main" target="_blank" rel="noopener">피해지원센터 공식 안내 ↗</a></div><p class="small">확인 기준 2026-09-28. 운영 정보는 기관 홈페이지를 확인하세요. 외부 링크만 인터넷이 필요합니다.</p>`)}
function references(){show('재구성 근거 · 법령 출처',`<p>법률·지원 정보 확인 기준: 2026-09-28. 아래는 체험 내용의 근거이며 기관의 공식 감수나 추천을 뜻하지 않습니다.</p>${[1,2,3].map(n=>`<div class="legal-item"><h3>시즌 ${n} · ${C[n].title}</h3><p>${C[n].source}</p><a href="${C[n].sourceUrl}" target="_blank" rel="noopener">${C[n].sourceName} ↗</a>${C[n].officialUrl?`<br><a href="${C[n].officialUrl}" target="_blank" rel="noopener">MBC 공식 방송 소개 ↗</a>`:''}</div>`).join('')}<h3 style="margin-top:22px">행위별 법적 설명</h3>${[['bank6','전자금융거래법 제6조 · 접근매체'],['bank','전자금융거래법 제49조 제4항 · 벌칙'],['force','형법 제12조 · 강요된 행위'],['gamble','형법 제246조 · 도박·상습도박'],['fake','성폭력처벌법 제14조의2 · 성적 허위영상물'],['child','아동·청소년성보호법 제11조 · 성착취물'],['youth','생활법령 · 청소년의 형사 책임']].map(x=>`<p><a href="${lawUrls[x[0]]}" target="_blank" rel="noopener">${x[1]} ↗</a></p>`).join('')}<p class="law-note">국가법령정보센터의 현행 조문과 공식 안내를 요약했습니다. 특정 사건의 유죄·무죄나 선고 결과를 예측하는 도구는 아닙니다.</p>`)}
function printKit(){show('참고 카드','<p>카메라와 인쇄물 없이 화면으로 혼자 체험할 수 있습니다.</p>')}
function doPrint(){printKit()}
window.addEventListener('beforeunload',save);
renderHome();

